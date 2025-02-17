import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  isAdmin: boolean;
  username: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL + '/auth',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, SignUpRequest>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),


  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,

} = authApi;