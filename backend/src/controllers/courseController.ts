import { Request, Response } from "express";
import {
  getAllCourses,
  getCourseById,
  getFeaturedCourses,
  getPopularCourses,
} from "../queries/courseQuery";

export const fetchCourses = async (req: Request, res: Response) => {
  const data = await getAllCourses(req.query);
  res.json({ success: true, data });
};

export const fetchCourseDetails = async (req: Request, res: Response) => {
  const courseId = req.params.id as string;
  const data = await getCourseById(courseId);
  res.json({ success: true, data });
};

export const fetchFeatured = async (_: Request, res: Response) => {
  const data = await getFeaturedCourses();
  res.json({ success: true, data });
};

export const fetchPopular = async (_: Request, res: Response) => {
  const data = await getPopularCourses();
  res.json({ success: true, data });
};