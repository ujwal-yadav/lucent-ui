import { clsx, type ClassValue } from 'clsx';

/**
 * Utility to merge Tailwind CSS classes
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
