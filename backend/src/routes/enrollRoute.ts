import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { enroll, myCourses, progress } from "../controllers/enrollController";
import { validate } from "../middleware/validate.middleware";
import { enrollSchema, progressSchema } from "../validators/enroll.validator";

const router = Router();

router.post("/", authMiddleware, validate(enrollSchema), enroll);
router.get("/my-courses", authMiddleware, myCourses);
router.patch("/progress", authMiddleware, validate(progressSchema), progress);

export default router;