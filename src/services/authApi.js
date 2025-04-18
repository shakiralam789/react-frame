// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: '/api/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.user?.token;
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getUserProfile: builder.query({
//       query: () => 'auth/profile',
//       transformResponse: (response) => response.data,
//       keepUnusedDataFor: 30,
//     })
//   }),
// });

// export const { 
//   useGetUserProfileQuery,
//   useLazyGetUserProfileQuery,
// } = authApi;