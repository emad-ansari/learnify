import { db } from "../config/db";
import { bookmarks, courses } from "../models/schema";
import { eq, and } from "drizzle-orm";

export const addBookmark = async (userId: string, courseId: string) => {
  // check if already bookmarked
  const existing = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.courseId, courseId)
      )
    );

  if (existing.length > 0) {
    throw new Error("Already bookmarked");
  }

  const [bookmark] = await db
    .insert(bookmarks)
    .values({ userId, courseId })
    .returning();

  return bookmark;
};

export const getBookmarks = async (userId: string) => {
  return db
    .select({
      id: courses.id,
      title: courses.title,
      thumbnail: courses.thumbnail,
      price: courses.price,
    })
    .from(bookmarks)
    .leftJoin(courses, eq(bookmarks.courseId, courses.id))
    .where(eq(bookmarks.userId, userId));
};

export const removeBookmark = async (
  userId: string,
  courseId: string
) => {
  await db
    .delete(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.courseId, courseId)
      )
    );

  return { success: true };
};