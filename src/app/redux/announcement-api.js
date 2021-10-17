import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const announcementApi = createApi({
    reducerPath: 'announcementApi',
    tagTypes: ['Announcements'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/announcement' }),
    endpoints: (build) => ({
        getAnnouncement: build.query({
            query: (limit = '') => `?${limit && `limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Announcements', id: _id })),
                        { type: 'Announcements', id: 'LIST' },
                    ]
                    : [{ type: 'Announcements', id: 'LIST' }]
        }),
        addAnnouncement: build.mutation({
            query: (data) => ({
                url: '/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Announcements', id: 'LIST' }]
        })
    })
});

export const { useGetAnnouncementQuery, useAddAnnouncementMutation } = announcementApi;