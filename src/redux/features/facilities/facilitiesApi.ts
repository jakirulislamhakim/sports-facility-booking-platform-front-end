import { baseApi } from '../../api/baseApi';

type TApiQuery =
  | {
      name: string;
      value: string;
    }[]
  | undefined;

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: (queryArgArr: TApiQuery) => {
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
    }),
  }),
});

export const { useGetAllFacilitiesQuery } = facilityApi;
