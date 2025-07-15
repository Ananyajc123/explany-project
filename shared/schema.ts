import { pgTable, text, serial, integer, boolean, decimal, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  location: text("location"),
  points: integer("points").default(0),
  totalEarned: decimal("total_earned", { precision: 10, scale: 2 }).default("0"),
  co2Saved: decimal("co2_saved", { precision: 10, scale: 2 }).default("0"),
  isShopOwner: boolean("is_shop_owner").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  ownerId: integer("owner_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  pointsDistributed: integer("points_distributed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wasteCategories = pgTable("waste_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  pointsPerKg: integer("points_per_kg").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
});

export const wasteItems = pgTable("waste_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  categoryId: integer("category_id").references(() => wasteCategories.id),
  shopId: integer("shop_id").references(() => shops.id),
  weight: decimal("weight", { precision: 5, scale: 2 }).notNull(),
  pointsEarned: integer("points_earned").notNull(),
  status: text("status").default("pending"), // pending, verified, collected
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  originalPrice: decimal("original_price", { precision: 8, scale: 2 }).notNull(),
  pointsPrice: integer("points_price").notNull(),
  condition: text("condition").notNull(), // excellent, good, fair
  description: text("description"),
  imageUrl: text("image_url"),
  sellerId: integer("seller_id").references(() => users.id),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // earn, spend, redeem
  amount: integer("amount").notNull(),
  description: text("description"),
  relatedItemId: integer("related_item_id"),
  relatedItemType: text("related_item_type"), // waste, book, shop_purchase
  createdAt: timestamp("created_at").defaultNow(),
});

export const pointRedemptions = pgTable("point_redemptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  shopId: integer("shop_id").references(() => shops.id),
  pointsUsed: integer("points_used").notNull(),
  cashValue: decimal("cash_value", { precision: 8, scale: 2 }).notNull(),
  status: text("status").default("pending"), // pending, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertShopSchema = createInsertSchema(shops).omit({
  id: true,
  createdAt: true,
});

export const insertWasteCategorySchema = createInsertSchema(wasteCategories).omit({
  id: true,
});

export const insertWasteItemSchema = createInsertSchema(wasteItems).omit({
  id: true,
  createdAt: true,
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPointRedemptionSchema = createInsertSchema(pointRedemptions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Shop = typeof shops.$inferSelect;
export type InsertShop = z.infer<typeof insertShopSchema>;
export type WasteCategory = typeof wasteCategories.$inferSelect;
export type InsertWasteCategory = z.infer<typeof insertWasteCategorySchema>;
export type WasteItem = typeof wasteItems.$inferSelect;
export type InsertWasteItem = z.infer<typeof insertWasteItemSchema>;
export type Book = typeof books.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type PointRedemption = typeof pointRedemptions.$inferSelect;
export type InsertPointRedemption = z.infer<typeof insertPointRedemptionSchema>;
