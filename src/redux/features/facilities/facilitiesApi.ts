import { TApiArgQuery } from '../../../types';
import { baseApi } from '../../api/baseApi';

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (queryArgArr: TApiArgQuery) => {
        const params = new URLSearchParams();

        if (queryArgArr?.length) {
          queryArgArr.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/facility',
          method: 'GET',
          params,
        };
      },
      providesTags: ['facility'],
    }),
    addAFacility: builder.mutation({
      query: (body) => ({
        url: '/facility',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['facility'],
    }),
    removeAFacility: builder.mutation({
      query: (facilityId: string) => ({
        url: `/facility/${facilityId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['facility'],
    }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useAddAFacilityMutation,
  useRemoveAFacilityMutation,
} = facilityApi;
