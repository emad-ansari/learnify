import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    req.user = decoded;

    next();
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};