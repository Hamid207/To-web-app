import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FC' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
