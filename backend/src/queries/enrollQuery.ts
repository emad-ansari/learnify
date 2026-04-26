import { db } from "../config/db";
import { enrollments, courses } from "../models/schema";
import { and, eq } from "drizzle-orm";


export const enrollCourse = async (userId: string, courseId: string) => {
  // check if already enrolled
  const existing = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId));

  const already = existing.find((e) => e.courseId === courseId);

  if (already) {
    throw new Error("Already enrolled");
  }

  // insert
  const [enrollment] = await db
    .insert(enrollments)
    .values({
      userId,
      courseId,
    })
    .returning();

  return enrollment;
};

export const updateProgress = async (
  userId: string,
  courseId: string,
  progress: number
) => {
  await db
    .update(enrollments)
    .set({ progress })
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId)
      )
    );

  return { success: true };
};


export const getMyCourses = async (userId: string) => {
  return db
    .select({
      id: courses.id,
      title: courses.title,
      thumbnail: courses.thumbnail,
      progress: enrollments.progress,
    })
    .from(enrollments)
    .leftJoin(courses, eq(enrollments.courseId, courses.id))
    .where(eq(enrollments.userId, userId));
};