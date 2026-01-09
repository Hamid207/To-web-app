import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { RegisterFormData } from '../types/auth';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Düzgün email daxil edin')
    .required('Email tələb olunur'),
  password: yup
    .string()
    .min(6, 'Şifrə minimum 6 simvol olmalıdır')
    .required('Şifrə tələb olunur'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifrələr uyğun gəlmir')
    .required('Şifrəni təsdiqləyin'),
});

export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
};
