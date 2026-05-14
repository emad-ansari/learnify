import { Request, Response } from "express";
import {
  getAllCourses,
  getCourseById,
  getFeaturedCourses,
  getPopularCourses,
} from "../queries/courseQuery";

export const fetchCourses = async (req: Request, res: Response) => {
  try {
    console.log("request comes inside controller");
    const data = await getAllCourses(req.query);
    res.json({ success: true, data });
  } catch (e: any) {
    console.error("Error in fetchCourses:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

export const fetchCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getCourseById(id as string);
    res.json({ success: true, data });
  } catch (e: any) {
    console.error("Error in fetchCourseDetails:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

export const fetchFeatured = async (_: Request, res: Response) => {
  try {
    console.log("request comes inside controller");
    const data = await getFeaturedCourses();
    res.json({ success: true, data });
  } catch (e: any) {
    console.error("Error in fetchFeatured:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};

export const fetchPopular = async (_: Request, res: Response) => {
  try {
    console.log("request comes inside controller");
    const data = await getPopularCourses();
    res.json({ success: true, data });
  } catch (e: any) {
    console.error("Error in fetchPopular:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};
