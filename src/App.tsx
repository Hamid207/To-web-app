import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme/theme';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dashboard routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="mailbox" element={<PlaceholderPage />} />
              <Route path="analytics" element={<PlaceholderPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/overview" element={<ProjectsPage />} />
              <Route path="projects/create" element={<ProjectsPage />} />
              <Route path="report" element={<PlaceholderPage />} />
              <Route path="settings" element={<PlaceholderPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
