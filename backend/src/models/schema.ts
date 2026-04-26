import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  instructor: text("instructor"),
  thumbnail: text("thumbnail"),

  price: integer("price").notNull().default(0), // in ₹
  averageRating: integer("average_rating").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),

  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const ratings = pgTable("ratings", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),

  rating: integer("rating").notNull(), // 1–5


  createdAt: timestamp("created_at").defaultNow(),
});
