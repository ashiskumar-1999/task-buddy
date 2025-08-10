import {
  pgTable,
  serial,
  boolean,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// User table for profile info
export const userTable = pgTable('user_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  profile_photo: text('profile_photo'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Auth table for login credentials
export const authTable = pgTable('auth_table', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id')
    .references(() => userTable.id)
    .notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  is_active: boolean('is_active').default(true),
  is_verified: boolean('is_verified').default(false),
  refresh_token: text('refresh_token').notNull(),
  refresh_token_expires_at: timestamp('refresh_token_expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Task table for managing tasks
export const taskTable = pgTable('task_table', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id')
    .references(() => userTable.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  due_date: timestamp('due_date').notNull(),
  status: text('status').notNull(),
  attachment: text('attachment'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
