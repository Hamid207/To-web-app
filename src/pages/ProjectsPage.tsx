import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  AvatarGroup,
  Avatar,
  Breadcrumbs,
  Link,
  Grid,
  Badge,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Add as AddIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';
import { ProjectCard } from '../components/ProjectCard';
import { AddTaskDialog } from '../components/AddTaskDialog';
import { useProjectsStore } from '../stores/projectsStore';

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const projects = useProjectsStore((state) => state.projects);

  const todoProjects = projects.filter((p) => p.status === 'todo');
  const inProgressProjects = projects.filter((p) => p.status === 'in_progress');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  const getFilteredProjects = () => {
    switch (activeTab) {
      case 0:
        return todoProjects;
      case 1:
        return inProgressProjects;
      case 2:
        return completedProjects;
      default:
        return todoProjects;
    }
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="#" sx={{ fontSize: 13 }}>
          Projects
        </Link>
        <Link underline="hover" color="inherit" href="#" sx={{ fontSize: 13 }}>
          Columbus
        </Link>
        <Typography color="text.primary" sx={{ fontSize: 13 }}>
          Projects List
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
            Projects List
          </Typography>
          <Typography sx={{ fontSize: 20 }}>📌</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                fontSize: 12,
                border: '2px solid #fff',
              },
            }}
          >
            <Avatar sx={{ backgroundColor: '#3B82F6' }}>J</Avatar>
            <Avatar sx={{ backgroundColor: '#10B981' }}>M</Avatar>
            <Avatar sx={{ backgroundColor: '#F59E0B' }}>S</Avatar>
            <Avatar sx={{ backgroundColor: '#EF4444' }}>+4</Avatar>
          </AvatarGroup>

          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            sx={{
              backgroundColor: '#2563EB',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#1D4ED8',
              },
            }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Subtitle */}
      <Typography variant="body2" sx={{ color: '#6B7280', mb: 3 }}>
        Here is a list of projects that you have created
      </Typography>

      {/* Tabs & Actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              color: '#6B7280',
              minHeight: 48,
            },
            '& .Mui-selected': {
              color: '#2563EB',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2563EB',
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Todo
                <Badge
                  badgeContent={todoProjects.length}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#E5E7EB',
                      color: '#374151',
                      fontSize: 11,
                    },
                  }}
                />
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                In Progress
                <Badge
                  badgeContent={inProgressProjects.length}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#DBEAFE',
                      color: '#2563EB',
                      fontSize: 11,
                    },
                  }}
                />
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Completed
                <Badge
                  badgeContent={completedProjects.length}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#D1FAE5',
                      color: '#059669',
                      fontSize: 11,
                    },
                  }}
                />
              </Box>
            }
          />
        </Tabs>

        <Box sx={{ display: 'flex', gap: 1, pb: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#374151',
              borderRadius: 2,
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB',
              },
            }}
          >
            Filter & Sort
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            sx={{
              textTransform: 'none',
              borderColor: '#E5E7EB',
              color: '#374151',
              borderRadius: 2,
              '&:hover': {
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB',
              },
            }}
          >
            Add New
          </Button>
        </Box>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {getFilteredProjects().map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {getFilteredProjects().length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: '#6B7280',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Bu kateqoriyada task yoxdur
          </Typography>
          <Typography variant="body2">
            Yeni task əlavə etmək üçün "Add New" düyməsinə basın
          </Typography>
        </Box>
      )}

      {/* Add Task Dialog */}
      <AddTaskDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />
    </Box>
  );
};
