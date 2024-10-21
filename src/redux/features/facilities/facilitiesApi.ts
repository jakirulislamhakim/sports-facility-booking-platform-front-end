import { baseApi } from '../../api/baseApi';

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: '/facility',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllFacilitiesQuery } = facilityApi;
