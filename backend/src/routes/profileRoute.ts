import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { fetchProfileStats } from "../controllers/profileContoller";

const router = Router();

router.get("/stats", authMiddleware, fetchProfileStats);

export default router;