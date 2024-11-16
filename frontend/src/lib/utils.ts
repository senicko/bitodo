import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFullFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
});

export const dateShortFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
});
