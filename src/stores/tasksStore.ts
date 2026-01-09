/**
 * Tasks Store
 *
 * Bu store task-ları (tapşırıqları) idarə edir.
 *
 * Qeyd: Kodda "Project" tipi istifadə olunur, amma bu əslində "Task"dır.
 * "Project" adı legacy naming-dir və "Board" ilə qarışdırılmamalıdır.
 *
 * - Task (Project tipi): Tək bir tapşırıq (todo, in_progress, completed)
 * - Board: Layihə/lövhə, bir neçə task-ı qruplaşdırır
 */

// Re-export everything from projectsStore with alias
export {
  useProjectsStore as useTasksStore,
} from './projectsStore';

// Also export the original for backwards compatibility
export { useProjectsStore } from './projectsStore';

// Type alias for clarity
export type { Project as Task } from '../types/project';
