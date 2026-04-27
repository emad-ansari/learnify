import { Router } from "express";
import {
  fetchCourses,
  fetchCourseDetails,
  fetchFeatured,
  fetchPopular,
} from "../controllers/courseController";
import { validate } from "../middleware/validate.middleware";
import {
  courseQuerySchema,
  courseIdSchema,
} from "../validators/course.validator";

const router = Router();

router.get("/", validate(courseQuerySchema), fetchCourses);
router.get("/featured", fetchFeatured);
router.get("/popular", fetchPopular);
router.get("/:id", validate(courseIdSchema), fetchCourseDetails);

export default router;