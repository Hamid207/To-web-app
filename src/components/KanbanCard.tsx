import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import type { Project } from '../types/project';
import { useProjectsStore } from '../stores/projectsStore';

interface KanbanCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Web design': { bg: '#DBEAFE', text: '#1D4ED8' },
  'Mobile Design': { bg: '#D1FAE5', text: '#059669' },
  'Invoice': { bg: '#FEF3C7', text: '#D97706' },
  'App Developer': { bg: '#EDE9FE', text: '#7C3AED' },
  'Dashboard': { bg: '#FCE7F3', text: '#DB2777' },
};

export const KanbanCard = ({ project, onEdit }: KanbanCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const colorScheme = categoryColors[project.category] || { bg: '#F3F4F6', text: '#374151' };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit?.(project);
    handleMenuClose();
  };

  const handleDelete = () => {
    deleteProject(project.id);
    handleMenuClose();
  };

  const handleCardClick = (event: React.MouseEvent) => {
    // Menü açıqsa və ya drag edilirse click-i ignore et
    if (anchorEl || isDragging) return;

    // Əgər tıklanan element button və ya menu deyilsə, edit aç
    const target = event.target as HTMLElement;
    if (!target.closest('button') && !target.closest('[role="menu"]')) {
      onEdit?.(project);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleCardClick}
      sx={{
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid #E5E7EB',
        cursor: 'grab',
        touchAction: 'none', // Touch drag üçün vacib
        userSelect: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderColor: '#D1D5DB',
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
          <Chip
            label={project.category}
            size="small"
            sx={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
              fontWeight: 500,
              fontSize: 10,
              height: 20,
            }}
          />
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ color: '#9CA3AF', p: 0.25, ml: 1 }}
          >
            <MoreIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" sx={{ color: '#2563EB' }} />
              </ListItemIcon>
              <ListItemText>Redaktə et</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDelete} sx={{ color: '#EF4444' }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" sx={{ color: '#EF4444' }} />
              </ListItemIcon>
              <ListItemText>Sil</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 1,
            lineHeight: 1.4,
            fontSize: 13,
          }}
        >
          {project.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="caption"
          sx={{
            color: '#6B7280',
            mb: 1.5,
            fontSize: 11,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <AvatarGroup
            max={3}
            sx={{
              '& .MuiAvatar-root': {
                width: 24,
                height: 24,
                fontSize: 10,
                border: '2px solid #fff',
              },
            }}
          >
            {project.assignees.map((assignee, index) => (
              <Avatar
                key={assignee.id}
                sx={{
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4],
                }}
              >
                {assignee.name[0]}
              </Avatar>
            ))}
          </AvatarGroup>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarIcon sx={{ fontSize: 12, color: '#9CA3AF' }} />
            <Typography sx={{ color: '#6B7280', fontSize: 10 }}>
              {project.date}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
