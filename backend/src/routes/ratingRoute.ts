import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  rateCourse,
  fetchReviews,
} from "../controllers/ratingContoller";
import { validate } from "../middleware/validate.middleware";
import { rateCourseSchema } from "../validators/rating.validator";
import { courseIdParamSchema } from "../validators/common.validator";

const router = Router();

router.post("/", authMiddleware, validate(rateCourseSchema), rateCourse);
router.get("/:courseId", validate(courseIdParamSchema), fetchReviews);

export default router;