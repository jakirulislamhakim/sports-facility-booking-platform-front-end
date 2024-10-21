import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// base api
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: () => ({}),
});
