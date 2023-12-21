import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backend = process.env.NODE_ENV === "production"
  ? "http://localhost:6969"
  : "http://localhost:6969";
