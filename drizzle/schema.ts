import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/**
 * Core user table backing email/password auth flow.
 * Extend this file with additional tables as your product grows.
 */
export const users = mysqlTable("users", {
  /** UUID primary key */
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  
  /** Email address - unique and required for login */
  email: varchar("email", { length: 255 }).notNull().unique(),
  
  /** Username - unique and required */
  username: varchar("username", { length: 50 }).notNull().unique(),
  
  /** Hashed password using bcrypt */
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  
  /** Full name - optional */
  fullName: varchar("full_name", { length: 100 }),
  
  /** Avatar URL - optional */
  avatarUrl: text("avatar_url"),
  
  /** User bio - optional */
  bio: text("bio"),
  
  /** Follower count */
  followersCount: int("followers_count").default(0),
  
  /** Following count */
  followingCount: int("following_count").default(0),
  
  /** Trades count */
  tradesCount: int("trades_count").default(0),
  
  /** User role */
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  /** Timestamps */
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here (trades, follows, likes, comments, etc.)
