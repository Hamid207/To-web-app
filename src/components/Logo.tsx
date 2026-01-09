import { Box, Typography } from '@mui/material';

export const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4L36 12V28L20 36L4 28V12L20 4Z"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M20 12L28 16V24L20 28L12 24V16L20 12Z"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
        />
        <path d="M20 4V12M20 28V36M4 12L12 16M28 24L36 28M36 12L28 16M12 24L4 28" stroke="#2563EB" strokeWidth="2" />
      </svg>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: '#1F2937',
        }}
      >
        InsideBox
      </Typography>
    </Box>
  );
};
