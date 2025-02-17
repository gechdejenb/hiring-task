import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface SubmitFeedbackRequest {
  text: string;
}

interface FeedbackResponse {
  uuid: string;
  text: string;
  sentiment: string;
  createdAt: string;
  user: {
    name: string;
    role: string;
  };
}

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL + 'feedback',
  }),
  endpoints: (builder) => ({

    submitFeedback: builder.mutation<FeedbackResponse, SubmitFeedbackRequest>({
      query: (feedbackData) => ({
        url: '/text',
        method: 'POST',
        body: feedbackData,
      }),
    }),
    getAllFeedbacks: builder.query<FeedbackResponse[], void>({
      query: () => ({
        url: '/text',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSubmitFeedbackMutation,
  useGetAllFeedbacksQuery,
} = feedbackApi;