import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/user' }),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }]
        }),
        loginUser: build.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id: 'LIST' }]
        })
    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;