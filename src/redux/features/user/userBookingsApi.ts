import { baseApi } from '../../api/baseApi';

const userBookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBookingsFacilities: builder.query({
      query: () => ({
        url: '/bookings/user',
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),
    getUserSingleBookingFacilities: builder.query({
      query: (bookingId: string) => ({
        url: `/bookings/user/${bookingId}`,
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),
    cancelUserBookingFacility: builder.mutation({
      query: (bookingId: string) => ({
        url: `/bookings/${bookingId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
});

export const {
  useGetUserBookingsFacilitiesQuery,
  useGetUserSingleBookingFacilitiesQuery,
  useCancelUserBookingFacilityMutation,
} = userBookingsApi;
