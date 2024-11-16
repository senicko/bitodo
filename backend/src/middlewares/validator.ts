import { NextFunction, Request, Response } from "express";
import * as z from "zod";

/** validator is a middleware that validates request body with the given zod schema. */
export function validator(schema: z.AnyZodObject) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const result = await schema.safeParseAsync(req.body);

    if (result.error) {
      console.log(result.error);

      // TODO: Implement better error handling.
      res.status(400).json({
        type: "error",
        message: "Invalid request body",
      });

      return;
    }

    next();
  };
}
