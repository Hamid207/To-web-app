import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '../types/project';

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Twottir - Redesign Project',
    description: 'Here you will make a Twitter web redesign project',
    category: 'Web design',
    categoryColor: '#DBEAFE',
    status: 'todo',
    author: { name: 'Twottir Project' },
    link: { label: 'www.figma.com', url: '#' },
    date: '02 May 23',
    assignees: [{ id: 'a1', name: 'John' }, { id: 'a2', name: 'Jane' }],
  },
  {
    id: '2',
    title: 'Sudoku - Mobile App',
    description: 'Hello guys, here is the loom for this project. Keep it up!',
    category: 'Mobile Design',
    categoryColor: '#D1FAE5',
    status: 'todo',
    author: { name: 'Loom Video' },
    link: { label: 'www.loom.com', url: '#' },
    date: '20 May 23',
    assignees: [{ id: 'a3', name: 'Mike' }, { id: 'a4', name: 'Sarah' }, { id: 'a5', name: 'Tom' }],
  },
  {
    id: '3',
    title: 'Yalla Invoice',
    description: 'Please check the file below and put all results into that file',
    category: 'Invoice',
    categoryColor: '#FEF3C7',
    status: 'todo',
    author: { name: 'Invoice Check Up' },
    link: { label: 'drive.google.com', url: '#' },
    date: '26 Apr 23',
    assignees: [{ id: 'a6', name: 'Alice' }, { id: 'a7', name: 'Bob' }],
  },
  {
    id: '4',
    title: 'Ankara API',
    description: 'Here you will make a Twitter web redesign project. here',
    category: 'App Developer',
    categoryColor: '#EDE9FE',
    status: 'in_progress',
    author: { name: 'Ankara-project' },
    link: { label: 'www.github.com', url: '#' },
    date: '21 Jun 23',
    assignees: [{ id: 'a8', name: 'Dev1' }, { id: 'a9', name: 'Dev2' }],
  },
  {
    id: '5',
    title: 'Maddog - Dashboard UI',
    description: 'Do it carefully and in accordance with the wishes of the client',
    category: 'Dashboard',
    categoryColor: '#FCE7F3',
    status: 'in_progress',
    author: { name: 'Maddog Dashboard' },
    link: { label: 'www.figma.com', url: '#' },
    date: '12 May 23',
    assignees: [{ id: 'a10', name: 'UI1' }, { id: 'a11', name: 'UI2' }, { id: 'a12', name: 'UI3' }],
  },
  {
    id: '6',
    title: 'Shaka - Landing Page',
    description: 'Here I have provided the file for working on it. there is also a brief...',
    category: 'Web design',
    categoryColor: '#DBEAFE',
    status: 'completed',
    author: { name: 'Shaka Landing Page' },
    link: { label: 'figma.com', url: '#' },
    date: '02 Jun 23',
    assignees: [{ id: 'a15', name: 'Web1' }, { id: 'a16', name: 'Web2' }],
  },
];

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'date'>) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, 'id'>>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  deleteProject: (id: string) => void;
  getProjectsByStatus: (status: Project['status']) => Project[];
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: initialProjects,

      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: crypto.randomUUID(),
          date: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
          }),
        };
        set((state) => ({
          projects: [newProject, ...state.projects],
        }));
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          ),
        }));
      },

      updateProjectStatus: (id, status) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, status } : project
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },

      getProjectsByStatus: (status) => {
        return get().projects.filter((project) => project.status === status);
      },
    }),
    {
      name: 'projects-storage',
    }
  )
);
