import { z } from 'zod';

export const registrationValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, { message: 'Name must have at least 1 character' })
    .max(100, { message: "Name can't exceed 100 characters" }),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Please enter a valid email address' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email address',
    }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: "Password can't exceed 100 characters" })
    .regex(/[A-Za-z]/, { message: 'Password must contain both letters' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),

  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .min(10, { message: 'Phone number must be at least 11 digits' })
    .max(15, { message: "Phone number can't exceed 15 digits" })
    .regex(/^01[3-9]\d{8}$/, { message: 'Please enter a valid phone number' }),

  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(3, { message: 'Address must have at least 1 character' })
    .max(60, { message: "Address can't exceed 60 characters" }),
});
