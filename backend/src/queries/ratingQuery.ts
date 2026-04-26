import { db } from "../config/db";
import { ratings, courses } from "../models/schema";
import { eq, and, sql } from "drizzle-orm";

export const addOrUpdateRating = async (
  userId: string,
  courseId: string,
  ratingValue: number,
  review?: string
) => {
  // check existing rating
  const existing = await db
    .select()
    .from(ratings)
    .where(
      and(
        eq(ratings.userId, userId),
        eq(ratings.courseId, courseId)
      )
    );

  if (existing.length > 0) {
    // update
    await db
      .update(ratings)
      .set({ rating: ratingValue, review })
      .where(
        and(
          eq(ratings.userId, userId),
          eq(ratings.courseId, courseId)
        )
      );
  } else {
    // insert
    await db.insert(ratings).values({
      userId,
      courseId,
      rating: ratingValue,
      review,
    });
  }

  // 🔥 recalculate average + total reviews
  const result = await db
    .select({
      avg: sql<number>`AVG(${ratings.rating})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(ratings)
    .where(eq(ratings.courseId, courseId));

  const avg = Math.round(Number(result[0].avg || 0));
  const count = result[0].count;

  // update course table
  await db
    .update(courses)
    .set({
      averageRating: avg,
      totalReviews: count,
    })
    .where(eq(courses.id, courseId));

  return { success: true };
};


export const getCourseReviews = async (courseId: string) => {
  return db
    .select()
    .from(ratings)
    .where(eq(ratings.courseId, courseId));
};