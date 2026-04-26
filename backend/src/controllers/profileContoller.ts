import { Response } from "express";
import { getProfileStats } from "../queries/profileQuery";
import { AuthRequest } from "../middleware/auth.middleware";

export const fetchProfileStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const data = await getProfileStats(userId);

    res.json({
      success: true,
      data,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};