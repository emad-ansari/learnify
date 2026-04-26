import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instructors = pgTable("instructors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),

  instructorId: uuid("instructor_id")
    .references(() => instructors.id),

  price: integer("price").notNull(),

  duration: integer("duration"), // in minutes
  totalLessons: integer("total_lessons"),

  averageRating: integer("average_rating").default(0),
  totalReviews: integer("total_reviews").default(0),

  studentsCount: integer("students_count").default(0),

  category: text("category"),

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

  userId: uuid("user_id").references(() => users.id),
  courseId: uuid("course_id").references(() => courses.id),

  progress: integer("progress").default(0), // %
  completedLessons: integer("completed_lessons").default(0),
  totalTimeSpent: integer("total_time_spent").default(0), // minutes

  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const ratings = pgTable("ratings", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),
  courseId: uuid("course_id").references(() => courses.id),

  rating: integer("rating").notNull(),
  review: text("review"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});