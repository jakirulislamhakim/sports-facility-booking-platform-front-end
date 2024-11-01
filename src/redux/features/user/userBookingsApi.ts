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
    getUserSingleBookingFacility: builder.query({
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
    //! this is for admin get all booking
    getAdminBookingsAllFacilities: builder.query({
      query: () => ({
        url: '/bookings',
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),
  }),
});

export const {
  useGetUserBookingsFacilitiesQuery,
  useGetUserSingleBookingFacilityQuery,
  useCancelUserBookingFacilityMutation,
  useGetAdminBookingsAllFacilitiesQuery,
} = userBookingsApi;
