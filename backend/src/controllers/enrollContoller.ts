import { Request, Response } from "express";
import {
  enrollCourse,
  getMyCourses,
  updateProgress,
} from "../queries/enrollQuery";
import { AuthRequest } from "../middleware/auth.middleware";

export const enroll = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { courseId } = req.body;

    const data = await enrollCourse(userId, courseId);

    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const myCourses = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const data = await getMyCourses(userId);

  res.json({ success: true, data });
};

export const progress = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { courseId, progress } = req.body;

  const data = await updateProgress(userId, courseId, progress);

  res.json({ success: true, data });
};