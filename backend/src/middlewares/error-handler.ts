import { NextFunction, Request, Response } from "express";

/** Top level error handler. */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("unexpected error:", err);
  res.status(500).type("application/problem+json").json({
    type: "internal",
    message: "Internal Server Error",
  });
}
