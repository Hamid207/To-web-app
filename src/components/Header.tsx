import {
  Box,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

export const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
      }}
    >
      {/* Search */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F3F4F6',
          borderRadius: 2,
          px: 2,
          py: 0.5,
          width: 300,
        }}
      >
        <SearchIcon sx={{ color: '#9CA3AF', mr: 1 }} />
        <InputBase
          placeholder="Search products..."
          sx={{ flex: 1, fontSize: 14 }}
        />
      </Box>

      {/* Right section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="small">
          <Badge badgeContent={3} color="error">
            <ChatIcon sx={{ color: '#6B7280' }} />
          </Badge>
        </IconButton>

        <IconButton size="small">
          <Badge badgeContent={5} color="error">
            <NotificationsIcon sx={{ color: '#6B7280' }} />
          </Badge>
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
            {user?.email?.split('@')[0] || 'Columbus'}
          </Typography>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: '#2563EB',
              fontSize: 14,
            }}
          >
            {user?.email?.[0]?.toUpperCase() || 'C'}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
};
