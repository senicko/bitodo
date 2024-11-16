import { NextFunction, Request, Response } from "express";

/** Top level error handler. */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("unexpected error:", err);
  res.sendStatus(500);
}
