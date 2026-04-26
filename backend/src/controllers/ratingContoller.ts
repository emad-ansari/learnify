import { Request, Response } from "express";
import {
  addOrUpdateRating,
  getCourseReviews,
} from "../queries/ratingQuery";
import { AuthRequest } from "../middleware/auth.middleware";

export const rateCourse = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { courseId, rating, review } = req.body;

    const data = await addOrUpdateRating(
      userId,
      courseId,
      rating,
      review
    );

    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const fetchReviews = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const data = await getCourseReviews(courseId);

  res.json({ success: true, data });
};