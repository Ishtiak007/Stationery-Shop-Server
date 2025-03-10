import { z } from 'zod';

// Login
const loginValidationSchema = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
  password: z.string({ required_error: 'password is required' }),
});

// Change Password
const ChangePassValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'Old password is required' }),
  newPassword: z.string({ required_error: 'password is required' }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidations = {
  refreshTokenValidationSchema,
  loginValidationSchema,
  ChangePassValidationSchema,
};
