import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  retrieveAccessToken,
  retrieveRefreshToken,
  saveTokens,
  wipeTokensFromStorage,
} from "../utils";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = retrieveAccessToken();
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => {
        return {
          url: "auth/check-auth",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    refreshTokens: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => {
        const refreshToken = retrieveRefreshToken();
        console.log("REFRESH TOKEN MUTATION", refreshToken);
        return {
          url: `auth/refresh-tokens`,
          method: "POST",
          body: { refreshToken },
        };
      },
      transformResponse: (response) => {
        console.log("NEW TOKENS AFTER REFRESH MUTATION", response);
        /* if (response.access && response.refresh) */ saveTokens(response);
        return response;
      },
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ email, password, name }) => {
        console.log(email, password, name);
        return {
          url: `auth/register`,
          method: "POST",
          body: { email, password, name },
        };
      },
      transformResponse: (response) => {
        if (response.tokens) saveTokens(response.tokens);
        return response;
      },
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ email, password, name }) => ({
        url: `auth/login`,
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response) => {
        if (response.tokens) saveTokens(response.tokens);
        return response;
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => {
        const refreshToken = retrieveRefreshToken();

        return {
          url: `auth/logout`,
          method: "POST",
          body: { refreshToken },
        };
      },
      transformResponse: (response) => {
        wipeTokensFromStorage();
        return response;
      },
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useCheckAuthQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokensMutation,
  useLogoutMutation,
} = authApi;
