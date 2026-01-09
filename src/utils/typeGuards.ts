/**
 * Type Guards
 *
 * LocalStorage-dan oxunan data-nın type-safety-ni təmin etmək üçün
 * type guard funksiyaları.
 */

import type { Project } from '../types/project';
import type { Board } from '../types/board';

/**
 * Yoxlayır ki, verilən dəyər Project tipinə uyğundur
 */
export function isProject(value: unknown): value is Project {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.boardId === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.category === 'string' &&
    typeof obj.categoryColor === 'string' &&
    (obj.status === 'todo' || obj.status === 'in_progress' || obj.status === 'completed') &&
    typeof obj.author === 'object' &&
    obj.author !== null &&
    typeof (obj.author as Record<string, unknown>).name === 'string' &&
    typeof obj.date === 'string' &&
    Array.isArray(obj.assignees)
  );
}

/**
 * Yoxlayır ki, verilən dəyər Project array-dir
 */
export function isProjectArray(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every(isProject);
}

/**
 * Yoxlayır ki, verilən dəyər Board tipinə uyğundur
 */
export function isBoard(value: unknown): value is Board {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.createdAt === 'string' &&
    (obj.description === undefined || typeof obj.description === 'string')
  );
}

/**
 * Yoxlayır ki, verilən dəyər Board array-dir
 */
export function isBoardArray(value: unknown): value is Board[] {
  return Array.isArray(value) && value.every(isBoard);
}

/**
 * LocalStorage-dan təhlükəsiz JSON parse edir
 */
export function safeJsonParse<T>(
  json: string,
  validator: (value: unknown) => value is T
): T | null {
  try {
    const parsed = JSON.parse(json);
    if (validator(parsed)) {
      return parsed;
    }
    console.warn('Parsed data failed validation');
    return null;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
}
