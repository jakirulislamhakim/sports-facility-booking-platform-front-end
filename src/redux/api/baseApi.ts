import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logoutUser, setUser } from '../features/auth/authSlice';

const baseUrl = 'http://localhost:5000/api';

// base query
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', `bearer ${token}`);
    return headers;
  },
});

// custom for get another access toke using refresh token

const baseQueryWithReAuth: typeof baseQuery = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result.error?.status === 401) {
    console.warn('sending refresh token');
    const response = await fetch(`http://localhost:5000/api/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    const { token } = await response.json();

    const user = (api.getState() as RootState).auth.user;

    if (token) {
      api.dispatch(setUser({ token, user }));
      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};

// base api
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ['bookings', 'facility'],
});
