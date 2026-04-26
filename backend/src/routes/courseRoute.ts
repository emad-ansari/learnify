import { Router } from "express";
import {
  fetchCourses,
  fetchCourseDetails,
  fetchFeatured,
  fetchPopular,
} from "../controllers/courseController";

const router = Router();

router.get("/", fetchCourses);
router.get("/featured", fetchFeatured);
router.get("/popular", fetchPopular);
router.get("/:id", fetchCourseDetails);

export default router;