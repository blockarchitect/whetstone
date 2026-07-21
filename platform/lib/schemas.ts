import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { items, testProfiles } from "@/db/schema";

export const optionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

// Safe to ship to the client mid-attempt — no correctOptionId. This is the
// ONLY shape the test-taking UI ever fetches for an active attempt.
export const itemContentSchema = z.object({
  id: z.string(),
  construct: z.enum(["numerical", "verbal", "logical"]),
  stem: z.string(),
  options: z.array(optionSchema).min(2),
});
export type ItemContent = z.infer<typeof itemContentSchema>;

// Full item, server-side / seed-time only. Cross-checks correctOptionId is
// actually among options — catches a bad key at seed time, not in production.
export const itemSchema = createInsertSchema(items, {
  options: () => z.array(optionSchema).min(2),
  tags: () => z.array(z.string()).default([]),
}).superRefine((val, ctx) => {
  if (!val.options.some((o) => o.id === val.correctOptionId)) {
    ctx.addIssue({
      code: "custom",
      message: `correctOptionId "${val.correctOptionId}" is not among options for item "${val.id}"`,
      path: ["correctOptionId"],
    });
  }
});
export type Item = z.infer<typeof itemSchema>;

// disclaimer.min(20) is a structural enforcement of the D26 legal requirement —
// it can't silently regress to an empty/default value in a future edit.
export const testProfileSchema = createInsertSchema(testProfiles, {
  slug: () => z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  disclaimer: () => z.string().min(20, "disclaimer must be a real sentence, not a placeholder"),
  timeLimitMinutes: () => z.number().int().positive(),
});
export type TestProfile = z.infer<typeof testProfileSchema>;

export const scoreSchema = z.object({
  total: z.object({ correct: z.number().int(), total: z.number().int() }),
  byConstruct: z.record(
    z.string(),
    z.object({ correct: z.number().int(), total: z.number().int() })
  ),
});
export type Score = z.infer<typeof scoreSchema>;

// --- Seed-file shapes (content/items.yaml, content/skins.yaml) ---
export const seedItemSchema = itemSchema;

export const seedSkinItemRefSchema = z.object({
  itemId: z.string(),
  section: z.enum(["numerical", "verbal", "logical"]).optional(),
});

export const seedSkinSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  displayName: z.string().min(1),
  tier: z.enum(["publisher", "employer"]),
  companyOrPublisherName: z.string().min(1),
  disclaimer: z.string().min(20),
  timeLimitMinutes: z.number().int().positive(),
  seoDescription: z.string().min(1),
  items: z.array(seedSkinItemRefSchema).min(1),
});
export type SeedSkin = z.infer<typeof seedSkinSchema>;
