/**
 * Task Type
 *
 * Task bir Kanban board-dakı tapşırığı təmsil edir.
 *
 * Qeyd: Bu tip Project tipinin alias-ıdır.
 * Legacy kodda "Project" adı istifadə olunur, amma
 * bu əslində bir task/tapşırıqdır (Board/Layihə deyil).
 */

import type { Project } from './project';

// Task tipi - Project ilə eynidir
export type Task = Project;

// Status tipləri
export type TaskStatus = Task['status'];

// Helper tip: Task yaratmaq üçün
export type CreateTaskInput = Omit<Task, 'id' | 'date'>;

// Helper tip: Task yeniləmək üçün
export type UpdateTaskInput = Partial<Omit<Task, 'id'>>;
