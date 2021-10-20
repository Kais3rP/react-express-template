import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const retrieveToken = () => {
  return localStorage.getItem('token')
}

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'v1/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => {
        const bearer = 'Bearer ' + retrieveToken()
        return {
          url: `users/${id}`,
          method: 'GET',
          headers: {
            Authorization: bearer,
          },
        }
      },
    }),
    register: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ email, password, name }) => {
        console.log(email, password, name)
        return {
          url: `auth/register`,
          method: 'POST',
          body: { email, password, name },
          transform: (response) => {
            console.log(response)
            return response
          },
        }
      },
    }),
    login: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ email, password, name }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        console.log(response)
        if (response.tokens)
          localStorage.setItem('token', response.tokens.access.token)
        return response
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
} = testApi
