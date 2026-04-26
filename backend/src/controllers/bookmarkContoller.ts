import { Request, Response } from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "../queries/bookmarkQuery";
import { AuthRequest } from "../middleware/auth.middleware";

export const createBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { courseId } = req.body;

    const data = await addBookmark(userId, courseId);

    res.json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const fetchBookmarks = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const data = await getBookmarks(userId);

  res.json({ success: true, data });
};

export const deleteBookmark = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const courseId = req.params.courseId as string;

  const data = await removeBookmark(userId, courseId);

  res.json({ success: true, data });
};