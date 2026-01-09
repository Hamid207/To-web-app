import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { GoogleIcon } from '../components/GoogleIcon';
import { useLoginForm } from '../hooks/useLoginForm';
import { useAuthStore } from '../stores/authStore';
import type { LoginFormData } from '../types/auth';

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
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
            Welcome back
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        sx={{
                          color: '#D1D5DB',
                          '&.Mui-checked': {
                            color: '#2563EB',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#374151' }}>
                        Remember for 30 days
                      </Typography>
                    }
                  />
                )}
              />

              <MuiLink
                href="#"
                underline="none"
                sx={{
                  color: '#2563EB',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password
              </MuiLink>
            </Box>

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
              Sign in
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
              Sign in with Google
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: '#6B7280',
                mt: 1,
              }}
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#2563EB',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
