import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SubmitFeedbackRequest {
  text: string;
}

interface FeedbackResponse {
  uuid: string;
  text: string;
  email:string;
  sentiment: string;
  createdAt: string;
  image:string;
  user: {
    name: string;
    role: string;
  };
}


export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitFeedback: builder.mutation<FeedbackResponse, SubmitFeedbackRequest>({
      query: (feedbackData) => ({
        url: 'feedback/text',
        method: 'POST',
        body: feedbackData,
      }),
    }),
    getAllFeedbacks: builder.query<FeedbackResponse[], void>({
      query: () => ({
        url: 'feedback/text',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSubmitFeedbackMutation,
  useGetAllFeedbacksQuery,
} = feedbackApi;