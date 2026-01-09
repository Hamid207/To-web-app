import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { KanbanCard } from './KanbanCard';
import type { Project } from '../types/project';

interface KanbanColumnProps {
  id: string;
  title: string;
  projects: Project[];
  color: string;
  bgColor: string;
  onAddClick?: () => void;
}

export const KanbanColumn = ({
  id,
  title,
  projects,
  color,
  bgColor,
  onAddClick,
}: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 280,
        maxWidth: 350,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          px: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: '#374151' }}
          >
            {title}
          </Typography>
          <Badge
            badgeContent={projects.length}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: bgColor,
                color: color,
                fontSize: 11,
                fontWeight: 600,
                minWidth: 20,
                height: 20,
              },
            }}
          />
        </Box>
        {onAddClick && (
          <IconButton
            size="small"
            onClick={onAddClick}
            sx={{
              color: '#9CA3AF',
              '&:hover': { color: color, backgroundColor: bgColor },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Column Content */}
      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          backgroundColor: isOver ? bgColor : '#F9FAFB',
          borderRadius: 2,
          p: 1.5,
          minHeight: 400,
          transition: 'background-color 0.2s ease',
          border: isOver ? `2px dashed ${color}` : '2px dashed transparent',
        }}
      >
        <SortableContext
          items={projects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {projects.map((project) => (
              <KanbanCard key={project.id} project={project} />
            ))}
          </Box>
        </SortableContext>

        {projects.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              color: '#9CA3AF',
              fontSize: 13,
            }}
          >
            Boş
          </Box>
        )}
      </Box>
    </Box>
  );
};
