import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop() || 'Page';
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
        {formattedName}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B7280' }}>
        Bu səhifə tezliklə hazır olacaq.
      </Typography>
    </Box>
  );
};
