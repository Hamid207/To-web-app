import { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Drawer,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Mail as MailIcon,
  BarChart as AnalyticsIcon,
  Folder as ProjectsIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
  Visibility as OverviewIcon,
  Add as CreateIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { id: 'mailbox', label: 'Mailbox', icon: MailIcon, path: '/mailbox' },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon, path: '/analytics' },
  {
    id: 'projects',
    label: 'Projects',
    icon: ProjectsIcon,
    children: [
      { id: 'project-list', label: 'Project List', icon: ListIcon, path: '/projects' },
      { id: 'overview', label: 'Overview', icon: OverviewIcon, path: '/projects/overview' },
      { id: 'create-project', label: 'Create Project', icon: CreateIcon, path: '/projects/create' },
    ],
  },
  { id: 'report', label: 'Report', icon: ReportIcon, path: '/report' },
  { id: 'setting', label: 'Setting', icon: SettingsIcon, path: '/settings' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  width?: number;
}

export const Sidebar = ({
  mobileOpen = false,
  onClose,
  isMobile = false,
  width = 240,
}: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>(['projects']);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleToggle = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <Box
      sx={{
        width,
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#2563EB',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>IB</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
          InsideBox
        </Typography>
      </Box>

      {/* Menu */}
      <List component="nav" aria-label="Əsas naviqasiya" sx={{ flex: 1, px: 2 }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <ListItemButton
              onClick={() =>
                item.children ? handleToggle(item.id) : handleNavigate(item.path!)
              }
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive(item.path || '') ? '#EEF2FF' : 'transparent',
                color: isActive(item.path || '') ? '#2563EB' : '#6B7280',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive(item.path || '') ? '#2563EB' : '#9CA3AF',
                }}
              >
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive(item.path || '') ? 600 : 400,
                }}
              />
              {item.children &&
                (openMenus.includes(item.id) ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {item.children && (
              <Collapse in={openMenus.includes(item.id)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.id}
                      onClick={() => handleNavigate(child.path)}
                      sx={{
                        pl: 4,
                        borderRadius: 2,
                        mb: 0.5,
                        backgroundColor: isActive(child.path) ? '#EEF2FF' : 'transparent',
                        color: isActive(child.path) ? '#2563EB' : '#6B7280',
                        '&:hover': {
                          backgroundColor: '#F3F4F6',
                        },
                      }}
                    >
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          fontSize: 13,
                          fontWeight: isActive(child.path) ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: '#6B7280',
            '&:hover': {
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 14 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        aria-label="Mobil naviqasiya menyusu"
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      aria-label="Əsas sidebar"
      sx={{
        width,
        flexShrink: 0,
        position: 'fixed',
        height: '100vh',
        zIndex: 1100,
      }}
    >
      {sidebarContent}
    </Box>
  );
};
