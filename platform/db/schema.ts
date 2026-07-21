import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const constructEnum = pgEnum("construct", [
  "numerical",
  "verbal",
  "logical",
  "diagrammatic",
]);
export const skinTierEnum = pgEnum("skin_tier", ["publisher", "employer"]);
// Only "linear" is valid for the MVP (D26). Extend the enum later for adaptive
// strategies (D10) — never rename this value, other code will reference it.
export const deliveryModeEnum = pgEnum("delivery_mode", ["linear"]);
export const attemptStatusEnum = pgEnum("attempt_status", [
  "in_progress",
  "completed",
  "abandoned",
]);
export const eventTypeEnum = pgEnum("event_type", [
  "page_view",
  "test_started",
  "test_completed",
]);

export interface ItemOption {
  id: string;
  // Text items use `text`; diagrammatic items use `svg` (self-contained SVG
  // markup). At least one is present — enforced in the Zod layer.
  text?: string;
  svg?: string;
}

export interface AttemptScore {
  total: { correct: number; total: number };
  byConstruct: Record<string, { correct: number; total: number }>;
}

// --- SHARED ITEM POOL ---
// Not per-skin content — one pool, many skins draw subsets from it (D3's shape).
export const items = pgTable("items", {
  id: text("id").primaryKey(), // stable authoring slug, e.g. "num-014" — not a serial
  construct: constructEnum("construct").notNull(),
  stem: text("stem").notNull(),
  // Optional self-contained SVG shown with the stem (the figure sequence for a
  // diagrammatic item). Null for text-based items.
  figureSvg: text("figure_svg"),
  options: jsonb("options").$type<ItemOption[]>().notNull(),
  correctOptionId: text("correct_option_id").notNull(),
  explanation: text("explanation"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// --- SKIN / TEST-PROFILE CONFIG ---
export const testProfiles = pgTable("test_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // permanent URL key: /practice/{slug}
  displayName: text("display_name").notNull(),
  tier: skinTierEnum("tier").notNull(),
  companyOrPublisherName: text("company_or_publisher_name").notNull(),
  // Required, no default — the one non-negotiable legal field (D26). Zod
  // enforces a real string, not just this NOT NULL constraint.
  disclaimer: text("disclaimer").notNull(),
  deliveryMode: deliveryModeEnum("delivery_mode").notNull().default("linear"),
  timeLimitMinutes: integer("time_limit_minutes").notNull(),
  seoDescription: text("seo_description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Real FK join, not a jsonb list — costs nothing now, answers "which skins use
// item X" directly later when item-bank evolution work (D14) begins.
export const testProfileItems = pgTable(
  "test_profile_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    testProfileId: uuid("test_profile_id")
      .notNull()
      .references(() => testProfiles.id, { onDelete: "cascade" }),
    itemId: text("item_id")
      .notNull()
      .references(() => items.id),
    section: constructEnum("section"),
    orderIndex: integer("order_index").notNull(),
  },
  (t) => ({
    uniqueOrder: uniqueIndex("profile_order_idx").on(t.testProfileId, t.orderIndex),
  })
);

// --- ANONYMOUS IDENTITY + RESULTS ---
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(), // this value IS the cookie value
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testAttempts = pgTable("test_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => sessions.id),
  testProfileId: uuid("test_profile_id")
    .notNull()
    .references(() => testProfiles.id),
  status: attemptStatusEnum("status").notNull().default("in_progress"),
  answers: jsonb("answers").$type<Record<string, string>>().notNull().default({}), // itemId -> optionId
  score: jsonb("score").$type<AttemptScore>(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => sessions.id),
  testProfileId: uuid("test_profile_id").references(() => testProfiles.id),
  eventType: eventTypeEnum("event_type").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testProfilesRelations = relations(testProfiles, ({ many }) => ({
  profileItems: many(testProfileItems),
}));

export const testProfileItemsRelations = relations(testProfileItems, ({ one }) => ({
  testProfile: one(testProfiles, {
    fields: [testProfileItems.testProfileId],
    references: [testProfiles.id],
  }),
  item: one(items, {
    fields: [testProfileItems.itemId],
    references: [items.id],
  }),
}));
