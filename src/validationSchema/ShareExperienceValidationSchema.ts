import { z } from 'zod';

export const shareUserExperienceValidationSchema = z.object({
  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  feedback: z
    .string({
      required_error: 'Feedback is required',
    })
    .min(30, 'Feedback must be at least 30 characters long')
    .max(150, 'Feedback must not exceed 150 characters'),
});
