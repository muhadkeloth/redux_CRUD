import { apiSlice } from './apiSlice';
import { setAdminCredentials, logoutAdmin  } from './authSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/api/admin/login',
        method: 'POST',
        body: credentials,
        headers:{'Is-Admin': 'true'},
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log('1')
          const { data } = await queryFulfilled;
          dispatch(setAdminCredentials(data));
        } catch (err) {
          console.error('Failed to log in:', err);
        }
      },
    }),
    getUsers: builder.query({
      query: () => '/api/admin/use',
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/admin/use/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUseradmin: builder.mutation({
      query: (user) => ({
        url:`/api/admin/use/${user._id}`,
        method:'PUT',
        body:user,
      }),
      invalidatesTags: ['User'], 
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: '/api/admin/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAdmin());
        } catch (err) {
          console.error('Failed to log out:', err);
        }
      },
    }),
  }),
});

export const { 
  useAdminLoginMutation, 
  useGetUsersQuery, 
  useDeleteUserMutation, 
  useUpdateUseradminMutation,
  useAdminLogoutMutation 
} = adminApiSlice;
