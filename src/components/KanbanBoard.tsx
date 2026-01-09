import { useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { AddTaskDialog } from './AddTaskDialog';
import { EditTaskDialog } from './EditTaskDialog';
import { BoardSelector } from './BoardSelector';
import { useProjectsStore } from '../stores/projectsStore';
import { useBoardsStore } from '../stores/boardsStore';
import type { Project } from '../types/project';

const columns = [
  { id: 'todo', title: 'Todo', color: '#6B7280', bgColor: '#F3F4F6' },
  { id: 'in_progress', title: 'In Progress', color: '#F59E0B', bgColor: '#FEF3C7' },
  { id: 'completed', title: 'Completed', color: '#10B981', bgColor: '#D1FAE5' },
];

export const KanbanBoard = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const projects = useProjectsStore((state) => state.projects);
  const updateProjectStatus = useProjectsStore((state) => state.updateProjectStatus);
  const selectedBoardId = useBoardsStore((state) => state.selectedBoardId);

  // Filter projects by selected board (show all if 'all' is selected)
  const boardProjects = useMemo(() => {
    if (!selectedBoardId || selectedBoardId === 'all') {
      return projects;
    }
    return projects.filter((p) => p.boardId === selectedBoardId);
  }, [projects, selectedBoardId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getProjectsByStatus = useCallback((status: string) => {
    return boardProjects.filter((p) => p.status === status);
  }, [boardProjects]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const project = boardProjects.find((p) => p.id === active.id);
    if (project) {
      setActiveProject(project);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const draggedProject = boardProjects.find((p) => p.id === activeId);
    if (!draggedProject) return;

    // Check if dropped over a column
    const isOverColumn = columns.some((col) => col.id === overId);
    if (isOverColumn) {
      const newStatus = overId as Project['status'];
      if (draggedProject.status !== newStatus) {
        updateProjectStatus(activeId, newStatus);
      }
      return;
    }

    // Check if dropped over another card
    const overProject = boardProjects.find((p) => p.id === overId);
    if (overProject && draggedProject.status !== overProject.status) {
      updateProjectStatus(activeId, overProject.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProject(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dropped over a column
    const isOverColumn = columns.some((col) => col.id === overId);
    if (isOverColumn) {
      const newStatus = overId as Project['status'];
      updateProjectStatus(activeId, newStatus);
    }
  };

  return (
    <Box sx={{ height: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <BoardSelector />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#111827',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Kanban Board
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                mt: 0.5,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Task-ları sürükləyərək statusunu dəyişdirin
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{
            backgroundColor: '#2563EB',
            textTransform: 'none',
            borderRadius: 2,
            alignSelf: { xs: 'flex-start', sm: 'auto' },
            '&:hover': {
              backgroundColor: '#1D4ED8',
            },
          }}
        >
          Yeni Task
        </Button>
      </Box>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3 },
            overflowX: 'auto',
            pb: 2,
            minHeight: { xs: 'calc(100vh - 300px)', sm: 'calc(100vh - 250px)' },
            // Ensure columns don't shrink on mobile
            '& > *': {
              flex: { xs: '0 0 280px', sm: '1 1 0' },
              minWidth: { xs: 280, sm: 'auto' },
            },
          }}
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              projects={getProjectsByStatus(column.id)}
              color={column.color}
              bgColor={column.bgColor}
              onAddClick={column.id === 'todo' ? () => setAddDialogOpen(true) : undefined}
              onEdit={(project) => setEditingProject(project)}
            />
          ))}
        </Box>

        <DragOverlay>
          {activeProject ? <KanbanCard project={activeProject} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Add Task Dialog */}
      <AddTaskDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />

      {/* Edit Task Dialog */}
      <EditTaskDialog
        open={editingProject !== null}
        onClose={() => setEditingProject(null)}
        project={editingProject}
      />
    </Box>
  );
};
