import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { fetchProfileStats, updateAvatar } from "../controllers/profileContoller";

const router = Router();

router.get("/stats", authMiddleware, fetchProfileStats);
router.patch("/avatar", authMiddleware, updateAvatar);

export default router;