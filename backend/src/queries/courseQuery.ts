import { db } from "../config/db";
import { courses, instructors } from "../models/schema";
import { eq, ilike, and, desc } from "drizzle-orm";

export const getAllCourses = async (query: any) => {
  const { category, search } = query;
  console.log("getAllCourses - RAW query params:", query);

  const conditions = [];

  if (category && category !== "All") {
    console.log("Applying category filter:", category);
    conditions.push(eq(courses.category, category));
  }

  if (search && search.trim() !== "") {
    console.log("Applying search filter:", search);
    conditions.push(ilike(courses.title, `%${search}%`));
  }

  let queryBuilder = db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      thumbnail: courses.thumbnail,
      price: courses.price,
      rating: courses.averageRating,
      reviews_count: courses.totalReviews,
      lessons_count: courses.totalLessons,
      duration: courses.duration,
      category: courses.category,
      instructor: instructors.name,
      instructor_image: instructors.avatar,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .$dynamic();

  if (conditions.length > 0) {
    queryBuilder = queryBuilder.where(and(...conditions));
  }

  const results = await queryBuilder;
  console.log(`getAllCourses - Found ${results.length} courses`);
  return results;
};

export const getCourseById = async (id: string) => {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      thumbnail: courses.thumbnail,
      price: courses.price,
      rating: courses.averageRating,
      reviews_count: courses.totalReviews,
      lessons_count: courses.totalLessons,
      duration: courses.duration,
      category: courses.category,
      instructor: instructors.name,
      instructor_image: instructors.avatar,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .where(eq(courses.id, id));

  return result[0];
};

export const getFeaturedCourses = async () => {
  return db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      thumbnail: courses.thumbnail,
      price: courses.price,
      rating: courses.averageRating,
      reviews_count: courses.totalReviews,
      lessons_count: courses.totalLessons,
      duration: courses.duration,
      category: courses.category,
      instructor: instructors.name,
      instructor_image: instructors.avatar,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .orderBy(desc(courses.averageRating))
    .limit(5);
};

export const getPopularCourses = async () => {
  return db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      thumbnail: courses.thumbnail,
      price: courses.price,
      rating: courses.averageRating,
      reviews_count: courses.totalReviews,
      lessons_count: courses.totalLessons,
      duration: courses.duration,
      category: courses.category,
      instructor: instructors.name,
      instructor_image: instructors.avatar,
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .orderBy(desc(courses.studentsCount))
    .limit(5);
};
