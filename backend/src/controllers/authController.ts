import { Request, Response } from "express";
import { registerUser, loginUser } from "../queries/authQuery";

export const register = async (req: Request, res: Response) => {
  try {
    const data = await registerUser(req.body);

    // never send password
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
