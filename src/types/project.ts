export interface Project {
  id: string;
  boardId: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  status: 'todo' | 'in_progress' | 'completed';
  author: {
    name: string;
    avatar?: string;
  };
  link?: {
    label: string;
    url: string;
  };
  date: string;
  assignees: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}
