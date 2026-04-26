import { db } from "../config/db";
import { courses, instructors } from "../models/schema";
import { eq, ilike, and, desc } from "drizzle-orm";

export const getAllCourses = async (query: any) => {
  const { category, search } = query;

  const conditions = [];

  if (category) {
    conditions.push(eq(courses.category, category));
  }

  if (search) {
    conditions.push(ilike(courses.title, `%${search}%`));
  }


  let queryBuilder = db
    .select({
      id: courses.id,
      title: courses.title,
      thumbnail: courses.thumbnail,
      price: courses.price,
      averageRating: courses.averageRating,
      instructor: instructors.name,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .$dynamic();

  if (conditions.length > 0) {
    queryBuilder = queryBuilder.where(and(...conditions));
  }

  return queryBuilder;
};

export const getCourseById = async (id: string) => {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      price: courses.price,
      duration: courses.duration,
      totalLessons: courses.totalLessons,
      averageRating: courses.averageRating,
      totalReviews: courses.totalReviews,
      studentsCount: courses.studentsCount,
      instructor: instructors.name,
      instructorAvatar: instructors.avatar,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .where(eq(courses.id, id));

  return result[0];
};

export const getFeaturedCourses = async () => {
  return db
    .select()
    .from(courses)
    .orderBy(desc(courses.averageRating))
    .limit(5);
};

export const getPopularCourses = async () => {
  return db
    .select()
    .from(courses)
    .orderBy(desc(courses.studentsCount))
    .limit(5);
};