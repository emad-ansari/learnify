import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createBookmark,
  fetchBookmarks,
  deleteBookmark,
} from "../controllers/bookmarkContoller";

const router = Router();

router.post("/", authMiddleware, createBookmark);
router.get("/", authMiddleware, fetchBookmarks);
router.delete("/:courseId", authMiddleware, deleteBookmark);

export default router;