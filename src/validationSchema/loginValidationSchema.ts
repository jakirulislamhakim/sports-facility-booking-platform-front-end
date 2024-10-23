import { z } from 'zod';

// Define Zod schema for login validation
export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
