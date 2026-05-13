import { db } from "../config/db";
import { enrollments, courses, instructors } from "../models/schema";
import { and, eq, sql } from "drizzle-orm";


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
      id: enrollments.id,
      course_id: courses.id,
      course_title: courses.title,
      course_thumbnail: courses.thumbnail,
      course_author: instructors.name,
      progress: sql<number>`${enrollments.progress}::float / 100`,
    })
    .from(enrollments)
    .leftJoin(courses, eq(enrollments.courseId, courses.id))
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .where(eq(enrollments.userId, userId));
};