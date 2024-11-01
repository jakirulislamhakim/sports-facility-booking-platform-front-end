import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    registrationUser: builder.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    registrationAdmin: builder.mutation({
      query: (body) => ({
        url: '/auth/create-admin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegistrationUserMutation,
  useRegistrationAdminMutation,
} = authApi;
