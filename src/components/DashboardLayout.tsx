import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const SIDEBAR_WIDTH = 240;

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FC' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
        width={SIDEBAR_WIDTH}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header onMenuClick={handleDrawerToggle} isMobile={isMobile} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
