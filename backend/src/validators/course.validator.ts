import { z } from "zod";

export const courseQuerySchema = z.object({
  query: z.object({
    category: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const courseIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid course ID format"),
  }),
});
