import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() - conditional class names with Tailwind conflict resolution.
 * Used by every component in components/ui. Do not remove: shadcn CLI expects it.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
