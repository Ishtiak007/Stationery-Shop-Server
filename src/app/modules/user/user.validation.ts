import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be text',
    })
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(20, { message: 'Password can not be more than 16 characters' })
    .optional(),
});
