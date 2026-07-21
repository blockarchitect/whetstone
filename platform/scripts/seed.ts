/**
 * Seed the item pool + test-profile skins from content/*.yaml into Postgres.
 *
 *   pnpm seed --dry-run    validate content only, no DB connection needed
 *   pnpm seed              validate, then idempotent upsert into DATABASE_URL
 *
 * Validation (always runs, offline-safe): every item/skin passes its Zod schema,
 * every skin references a real item, no duplicate ids or slugs. On any failure
 * the script exits non-zero and writes nothing (fail loud, never silently skip).
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { seedItemSchema, seedSkinSchema, type SeedSkin } from "../lib/schemas";
import type { Item } from "../lib/schemas";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "..", "content");

const dryRun = process.argv.includes("--dry-run");

function loadYaml<T>(file: string, key: string): T[] {
  const raw = yaml.load(readFileSync(join(CONTENT_DIR, file), "utf8")) as Record<
    string,
    unknown
  >;
  const list = raw?.[key];
  if (!Array.isArray(list)) {
    throw new Error(`${file}: expected a top-level "${key}:" list`);
  }
  return list as T[];
}

function fail(msg: string): never {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

async function main() {
  // ---- parse + per-row Zod validation ----
  const rawItems = loadYaml<unknown>("items.yaml", "items");
  const rawSkins = loadYaml<unknown>("skins.yaml", "skins");

  const items: Item[] = [];
  for (const [i, r] of rawItems.entries()) {
    const parsed = seedItemSchema.safeParse(r);
    if (!parsed.success) {
      fail(`items.yaml item #${i + 1}: ${JSON.stringify(parsed.error.issues, null, 2)}`);
    }
    items.push(parsed.data);
  }

  const skins: SeedSkin[] = [];
  for (const [i, r] of rawSkins.entries()) {
    const parsed = seedSkinSchema.safeParse(r);
    if (!parsed.success) {
      fail(`skins.yaml skin #${i + 1}: ${JSON.stringify(parsed.error.issues, null, 2)}`);
    }
    skins.push(parsed.data);
  }

  // ---- cross-checks ----
  const itemIds = new Set<string>();
  for (const it of items) {
    if (itemIds.has(it.id)) fail(`duplicate item id: ${it.id}`);
    itemIds.add(it.id);
  }

  const slugs = new Set<string>();
  for (const sk of skins) {
    if (slugs.has(sk.slug)) fail(`duplicate skin slug: ${sk.slug}`);
    slugs.add(sk.slug);
    for (const ref of sk.items) {
      if (!itemIds.has(ref.itemId)) {
        fail(`skin "${sk.slug}" references unknown item "${ref.itemId}"`);
      }
    }
  }

  console.log(
    `  ✓ validation passed — ${items.length} items, ${skins.length} skins, ` +
      `${skins.reduce((n, s) => n + s.items.length, 0)} profile-item links`
  );

  if (dryRun) {
    console.log("  (dry run — no database writes)\n");
    return;
  }

  // ---- DB upsert (only reached with a live DATABASE_URL) ----
  const { db } = await import("../db/client");
  const schema = await import("../db/schema");
  const { eq } = await import("drizzle-orm");

  for (const it of items) {
    await db
      .insert(schema.items)
      .values({
        id: it.id,
        construct: it.construct,
        stem: it.stem,
        options: it.options,
        correctOptionId: it.correctOptionId,
        explanation: it.explanation ?? null,
        tags: it.tags ?? [],
      })
      .onConflictDoUpdate({
        target: schema.items.id,
        set: {
          construct: it.construct,
          stem: it.stem,
          options: it.options,
          correctOptionId: it.correctOptionId,
          explanation: it.explanation ?? null,
          tags: it.tags ?? [],
        },
      });
  }
  console.log(`  ✓ upserted ${items.length} items`);

  for (const sk of skins) {
    const existing = await db.query.testProfiles.findFirst({
      where: eq(schema.testProfiles.slug, sk.slug),
    });

    const profileId = await db.transaction ? undefined : undefined; // neon-http: no tx; sequential writes below

    let id: string;
    if (existing) {
      // slug is the immutable public URL key — nothing here changes it (we
      // matched on it), but guard the invariant explicitly.
      if (existing.slug !== sk.slug) {
        fail(`refusing to change the slug of an existing profile (${existing.slug})`);
      }
      await db
        .update(schema.testProfiles)
        .set({
          displayName: sk.displayName,
          tier: sk.tier,
          companyOrPublisherName: sk.companyOrPublisherName,
          disclaimer: sk.disclaimer,
          timeLimitMinutes: sk.timeLimitMinutes,
          seoDescription: sk.seoDescription,
        })
        .where(eq(schema.testProfiles.id, existing.id));
      id = existing.id;
      // replace join rows for a clean re-seed
      await db
        .delete(schema.testProfileItems)
        .where(eq(schema.testProfileItems.testProfileId, id));
    } else {
      const inserted = await db
        .insert(schema.testProfiles)
        .values({
          slug: sk.slug,
          displayName: sk.displayName,
          tier: sk.tier,
          companyOrPublisherName: sk.companyOrPublisherName,
          disclaimer: sk.disclaimer,
          timeLimitMinutes: sk.timeLimitMinutes,
          seoDescription: sk.seoDescription,
        })
        .returning({ id: schema.testProfiles.id });
      id = inserted[0]!.id;
    }
    void profileId;

    const itemById = new Map(items.map((it) => [it.id, it]));
    await db.insert(schema.testProfileItems).values(
      sk.items.map((ref, idx) => ({
        testProfileId: id,
        itemId: ref.itemId,
        section: ref.section ?? itemById.get(ref.itemId)!.construct,
        orderIndex: idx,
      }))
    );
  }
  console.log(`  ✓ upserted ${skins.length} skins\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
