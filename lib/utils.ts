import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function matchRoute(
  pathname: string,
  pattern: string
): Record<string, string | number> | null {
  const keys: string[] = [];
  const regex = new RegExp(
    "^" +
      pattern
        .replace(/:[^/]+/g, (k) => {
          keys.push(k.slice(1));
          return "([^/]+)";
        })
        .replace(/\//g, "\\/") +
      "$"
  );
  const m = new RegExp(regex).exec(pathname);
  if (!m) return null;
  const params: Record<string, string | number> = {};
  keys.forEach((k, i) => (params[k] = m[i + 1]));
  return params;
}
