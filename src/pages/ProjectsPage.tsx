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
import type { Project } from '../types/project';

const mockProjects: Project[] = [
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
    status: 'todo',
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
    title: 'Notnot - Mobile App',
    description: 'Hello guys, here is a brief file from the client. Good luck!',
    category: 'Mobile Design',
    categoryColor: '#D1FAE5',
    status: 'in_progress',
    author: { name: 'Loom Video' },
    link: { label: 'www.loom.com', url: '#' },
    date: '03 Jul 23',
    assignees: [{ id: 'a13', name: 'App1' }, { id: 'a14', name: 'App2' }],
  },
  {
    id: '7',
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
  {
    id: '8',
    title: 'Gonial Landing Page',
    description: 'Here you will make a Landing Page. Good luck!',
    category: 'Web design',
    categoryColor: '#DBEAFE',
    status: 'completed',
    author: { name: 'Gonial Landing Page' },
    link: { label: 'figma.com', url: '#' },
    date: '11 Aug 23',
    assignees: [{ id: 'a17', name: 'Land1' }],
  },
];

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const todoProjects = mockProjects.filter((p) => p.status === 'todo');
  const inProgressProjects = mockProjects.filter((p) => p.status === 'in_progress');
  const completedProjects = mockProjects.filter((p) => p.status === 'completed');

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
    </Box>
  );
};
