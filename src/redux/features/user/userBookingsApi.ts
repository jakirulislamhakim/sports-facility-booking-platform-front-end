import { baseApi } from '../../api/baseApi';

const userBookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUserBookingFacility: builder.mutation({
      query: (body) => ({
        url: `/bookings`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['bookings'],
    }),
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
    availableTimeSlot: builder.query({
      query: (arg: { date: string; facility: string }) => ({
        url: `/check-availability?date=${arg.date}&facility=${arg.facility} `,
        method: 'GET',
      }),
      providesTags: ['bookings']
    }),

    //!* this is for admin get all booking
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
  useCreateUserBookingFacilityMutation,
  useGetUserBookingsFacilitiesQuery,
  useGetUserSingleBookingFacilityQuery,
  useCancelUserBookingFacilityMutation,
  useAvailableTimeSlotQuery,
  useGetAdminBookingsAllFacilitiesQuery,
} = userBookingsApi;
