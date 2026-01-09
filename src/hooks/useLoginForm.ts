import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { LoginFormData } from '../types/auth';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Düzgün email daxil edin')
    .required('Email tələb olunur'),
  password: yup
    .string()
    .min(6, 'Şifrə minimum 6 simvol olmalıdır')
    .required('Şifrə tələb olunur'),
  rememberMe: yup.boolean().default(false),
});

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
};
