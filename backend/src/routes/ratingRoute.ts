import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  rateCourse,
  fetchReviews,
} from "../controllers/ratingContoller";

const router = Router();

router.post("/", authMiddleware, rateCourse);
router.get("/:courseId", fetchReviews);

export default router;