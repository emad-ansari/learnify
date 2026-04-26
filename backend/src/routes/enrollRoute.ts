import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { enroll, myCourses, progress } from "../controllers/enrollContoller";

const router = Router();

router.post("/", authMiddleware, enroll);
router.get("/my-courses", authMiddleware, myCourses);
router.patch("/progress", authMiddleware, progress);

export default router;