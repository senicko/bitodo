import { NextFunction, Request, Response } from "express";
import * as z from "zod";

/** validateRequestBody is a middleware that validates request body with the given zod schema. */
export function valdiateRequestBody(schema: z.AnyZodObject) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      res
        .status(400)
        .type("application/problem+json")
        .json({
          type: "validation",
          message: "Invalid request body",
          validationErrors: result.error.issues.map(({ message, path }) => ({
            message,
            path,
          })),
        });

      return;
    }

    next();
  };
}
