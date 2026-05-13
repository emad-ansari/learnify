import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate =
  (schema: ZodType<any, any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("request comes inside validate");
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log("request comes inside validate 2");

      req.body = parsed.body;
      Object.assign(req.query, parsed.query);
      Object.assign(req.params, parsed.params);
      console.log("request comes inside validate 3");

      return next();
    } catch (error) {
      console.log("error: ", error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
