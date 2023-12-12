import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backend = process.env.NODE_ENV === "production"
  ? "studystack.com"
  : "http://localhost:6969";
