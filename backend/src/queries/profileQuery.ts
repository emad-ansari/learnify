import { db } from "../config/db";
import { enrollments } from "../models/schema";
import { eq, sql } from "drizzle-orm";

export const getProfileStats = async (userId: string) => {
  const result = await db
    .select({
      totalEnrolled: sql<number>`COUNT(*)`,
      completedCourses: sql<number>`COUNT(CASE WHEN ${enrollments.progress} = 100 THEN 1 END)`,
      totalTimeSpent: sql<number>`COALESCE(SUM(${enrollments.totalTimeSpent}), 0)`,
    })
    .from(enrollments)
    .where(eq(enrollments.userId, userId));

  return result[0];
};