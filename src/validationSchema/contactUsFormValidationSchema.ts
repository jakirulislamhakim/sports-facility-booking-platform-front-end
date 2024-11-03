import { z } from 'zod';

export const contactUsFormValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must have at least 3 characters' })
    .max(60, { message: "Name can't exceed 60 characters" }),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Please enter a valid email address' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email address',
    }),

  subject: z
    .string({
      required_error: 'Subject is required',
    })
    .min(8, { message: 'Subject must have at least 8 characters' })
    .max(100, { message: "Subject can't exceed 100 characters" }),

  message: z
    .string({
      required_error: 'Message is required',
    })
    .min(20, { message: 'Message must have at least 20 characters' })
    .max(800, { message: "Message can't exceed 800 characters" }),
});
