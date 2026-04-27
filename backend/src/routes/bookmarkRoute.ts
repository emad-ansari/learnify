import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createBookmark,
  fetchBookmarks,
  deleteBookmark,
} from "../controllers/bookmarkContoller";
import { validate } from "../middleware/validate.middleware";
import { createBookmarkSchema } from "../validators/bookmark.validator";
import { courseIdParamSchema } from "../validators/common.validator";

const router = Router();

router.post("/", authMiddleware, validate(createBookmarkSchema), createBookmark);
router.get("/", authMiddleware, fetchBookmarks);
router.delete(
  "/:courseId",
  authMiddleware,
  validate(courseIdParamSchema),
  deleteBookmark
);

export default router;