import { Response } from "express";
import { getProfileStats } from "../queries/profileQuery";
import { updateUserAvatar } from "../queries/userQuery";
import { AuthRequest } from "../middleware/auth.middleware";

export const fetchProfileStats = async (req: AuthRequest, res: Response) => {
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

export const updateAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Avatar URL is required" });
    }

    const updatedUser = await updateUserAvatar(userId, avatarUrl);

    res.json({
      success: true,
      message: "Profile picture updated",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update avatar",
    });
  }
};
