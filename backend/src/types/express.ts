import { Request } from "express";

/** Typed express Reqyest type. */
export interface TypedRequest<TBody> extends Request {
  body: TBody;
}
