import { z } from "zod";

export const createBookmarkSchema = z.object({
  body: z.object({
    courseId: z.string().uuid("Invalid course ID format"),
  }),
});
