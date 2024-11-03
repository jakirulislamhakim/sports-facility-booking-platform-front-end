import { z } from 'zod';

export const addFacilityFormValidationSchema = z.object({
  name: z
    .string({ required_error: 'Facility name is required' })
    .min(2, 'Facility name must be at least 2 characters long.')
    .max(40, "Facility name can't exceed 40 characters."),

  description: z
    .string({ required_error: 'Description name is required' })
    .min(10, 'Description must be at least 10 characters long.')
    .max(400, "Description can't exceed 400 characters."),

  pricePerHour: z
    .number({
      required_error: 'Price per hour is required.',
      invalid_type_error: 'Price per hour must be a number.',
    })
    .min(1, 'Price per hour must be at least $1.')
    .max(1000, "Price per hour can't exceed $1000."),

  location: z
    .string({ required_error: 'Location name is required' })
    .min(5, 'Location must be at least 5 characters long.')
    .max(60, "Location can't exceed 60 characters."),

  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),

  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Please upload a file.',
    })
    .refine((file) => file?.type.startsWith('image/'), {
      message: 'Uploaded file must be an image.',
    })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: 'Image size must be 5 MB or less.',
    }),
});

export const updateFacilityFormValidationSchema = z.object({
  name: z
    .string({ required_error: 'Facility name is required' })
    .min(2, 'Facility name must be at least 2 characters long.')
    .max(40, "Facility name can't exceed 40 characters."),

  description: z
    .string({ required_error: 'Description name is required' })
    .min(10, 'Description must be at least 10 characters long.')
    .max(400, "Description can't exceed 400 characters."),

  pricePerHour: z
    .number({
      required_error: 'Price per hour is required.',
      invalid_type_error: 'Price per hour must be a number.',
    })
    .min(1, 'Price per hour must be at least $1.')
    .max(1000, "Price per hour can't exceed $1000."),

  location: z
    .string({ required_error: 'Location name is required' })
    .min(5, 'Location must be at least 5 characters long.')
    .max(60, "Location can't exceed 60 characters."),

  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Please upload a file.',
    })
    .refine((file) => file?.type.startsWith('image/'), {
      message: 'Uploaded file must be an image.',
    })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: 'Image size must be 5 MB or less.',
    })
    .optional(),
});
