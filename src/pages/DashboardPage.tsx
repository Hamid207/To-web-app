import { Box, Typography, Paper, Grid } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const stats = [
  {
    title: 'Total Projects',
    value: '24',
    change: '+12%',
    icon: AssignmentIcon,
    color: '#2563EB',
    bgColor: '#EEF2FF',
  },
  {
    title: 'In Progress',
    value: '8',
    change: '+5%',
    icon: TrendingUpIcon,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    title: 'Completed',
    value: '16',
    change: '+18%',
    icon: CheckCircleIcon,
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
  {
    title: 'Team Members',
    value: '12',
    change: '+2',
    icon: PeopleIcon,
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
];

export const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #E5E7EB',
                boxShadow: 'none',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon sx={{ color: stat.color }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#10B981',
                    backgroundColor: '#D1FAE5',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 500,
                    height: 'fit-content',
                  }}
                >
                  {stat.change}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 3,
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2 }}>
          Recent Activity
        </Typography>
        <Typography variant="body2" sx={{ color: '#6B7280' }}>
          No recent activity to show.
        </Typography>
      </Paper>
    </Box>
  );
};
