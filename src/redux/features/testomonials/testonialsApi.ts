import { TTestimonial } from '../../../types';
import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: () => ({
        url: '/user-feedback',
        method: 'GET',
      }),
    }),
    addATestimonials: builder.mutation({
      query: (body: Pick<TTestimonial, 'rating' | 'feedback'>) => ({
        url: '/user-feedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetAllTestimonialsQuery, useAddATestimonialsMutation } = authApi;
