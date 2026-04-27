import { z } from "zod";

export const enrollSchema = z.object({
  body: z.object({
    courseId: z.string().uuid("Invalid course ID format"),
  }),
});

export const progressSchema = z.object({
  body: z.object({
    courseId: z.string().uuid("Invalid course ID format"),
    progress: z.number().min(0).max(100, "Progress must be between 0 and 100"),
  }),
});
