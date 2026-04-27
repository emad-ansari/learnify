import { z } from "zod";

export const rateCourseSchema = z.object({
  body: z.object({
    courseId: z.string().uuid("Invalid course ID format"),
    rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
    review: z.string().optional(),
  }),
});
