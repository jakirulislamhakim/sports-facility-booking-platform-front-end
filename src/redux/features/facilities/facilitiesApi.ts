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
    getSingleFacility: builder.query({
      query: (facilityId: string) => ({
        url: `/facility/${facilityId}`,
        method: 'GET',
      }),
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
    updateAFacility: builder.mutation({
      query: (arg) => {
        const { _id, formData } = arg;

        return {
          url: `/facility/${_id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['facility'],
    }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useGetSingleFacilityQuery,
  useAddAFacilityMutation,
  useRemoveAFacilityMutation,
  useUpdateAFacilityMutation,
} = facilityApi;
