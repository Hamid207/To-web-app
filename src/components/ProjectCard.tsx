import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  Link,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  MoreVert as MoreIcon,
  PlayArrow as StartIcon,
  CheckCircle as CompleteIcon,
  Replay as TodoIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Project } from '../types/project';
import { useProjectsStore } from '../stores/projectsStore';

interface ProjectCardProps {
  project: Project;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Web design': { bg: '#DBEAFE', text: '#1D4ED8' },
  'Mobile Design': { bg: '#D1FAE5', text: '#059669' },
  'Invoice': { bg: '#FEF3C7', text: '#D97706' },
  'App Developer': { bg: '#EDE9FE', text: '#7C3AED' },
  'Dashboard': { bg: '#FCE7F3', text: '#DB2777' },
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const updateProjectStatus = useProjectsStore((state) => state.updateProjectStatus);
  const deleteProject = useProjectsStore((state) => state.deleteProject);

  const colorScheme = categoryColors[project.category] || { bg: '#F3F4F6', text: '#374151' };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: Project['status']) => {
    updateProjectStatus(project.id, status);
    handleMenuClose();
  };

  const handleDelete = () => {
    deleteProject(project.id);
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 'none',
        border: '1px solid #E5E7EB',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Category & Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Chip
            label={project.category}
            size="small"
            sx={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
              fontWeight: 500,
              fontSize: 11,
              height: 24,
            }}
          />
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ color: '#9CA3AF', p: 0.5 }}
          >
            <MoreIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {project.status !== 'todo' && (
              <MenuItem onClick={() => handleStatusChange('todo')}>
                <ListItemIcon>
                  <TodoIcon fontSize="small" sx={{ color: '#6B7280' }} />
                </ListItemIcon>
                <ListItemText>Todo-ya köçür</ListItemText>
              </MenuItem>
            )}
            {project.status !== 'in_progress' && (
              <MenuItem onClick={() => handleStatusChange('in_progress')}>
                <ListItemIcon>
                  <StartIcon fontSize="small" sx={{ color: '#F59E0B' }} />
                </ListItemIcon>
                <ListItemText>In Progress-ə köçür</ListItemText>
              </MenuItem>
            )}
            {project.status !== 'completed' && (
              <MenuItem onClick={() => handleStatusChange('completed')}>
                <ListItemIcon>
                  <CompleteIcon fontSize="small" sx={{ color: '#10B981' }} />
                </ListItemIcon>
                <ListItemText>Completed-ə köçür</ListItemText>
              </MenuItem>
            )}
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
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            mb: 2,
            fontSize: 13,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>

        {/* Author & Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: 10,
              backgroundColor: '#E5E7EB',
              color: '#374151',
            }}
          >
            {project.author.name[0]}
          </Avatar>
          <Typography variant="caption" sx={{ color: '#374151' }}>
            {project.author.name}
          </Typography>
        </Box>

        {project.link && (
          <Link
            href={project.link.url}
            underline="hover"
            sx={{
              fontSize: 12,
              color: '#2563EB',
              display: 'block',
              mb: 2,
            }}
          >
            {project.link.label}
          </Link>
        )}

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 2,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <AvatarGroup
            max={3}
            sx={{
              '& .MuiAvatar-root': {
                width: 28,
                height: 28,
                fontSize: 11,
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
            <CalendarIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              {project.date}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
