import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { GoogleIcon } from '../components/GoogleIcon';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { useAuthStore } from '../stores/authStore';
import type { RegisterFormData } from '../types/auth';

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    login(data.email);
    navigate('/dashboard');
  };

  const handleGoogleSignIn = () => {
    // TODO: Google OAuth integration
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4 }}>
          <Logo />
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 3,
            border: '1px solid #E5E7EB',
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: '#6B7280', mb: 1 }}
          >
            Please enter your details
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#111827',
              mb: 4,
            }}
          >
            Create account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Email adress"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  placeholder="Confirm password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  variant="outlined"
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                mt: 1,
                backgroundColor: '#2563EB',
                '&:hover': {
                  backgroundColor: '#1D4ED8',
                },
              }}
            >
              Sign up
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                py: 1.5,
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  backgroundColor: '#F9FAFB',
                },
              }}
            >
              Sign up with Google
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: '#6B7280',
                mt: 1,
              }}
            >
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#2563EB',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
