import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth';

// Create the API
export const instructorsApi = createApi({
    reducerPath: 'instructorsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getInstructors: builder.query({
            query: ({currentPage, fullName}) => ({
                url: 'admin/instructors',
                params: {
                    page: currentPage,
                    limit: 20,
                    fullName: fullName
                },
            }),
            providesTags: ['Instructors'],
        }),
        deleteInstructor: builder.mutation({
            query: (id) => ({
                url: `admin/instructors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Instructors'],
        }),
        addInstructor: builder.mutation({
            query: (formData) => ({
                url: 'admin/instructors',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Instructors'],
        }),
        editInstructor: builder.mutation({
            query: ({ instructorId, formData }) => {
              return {
                url: `admin/instructors/${instructorId}`,
                method: 'PUT',
                body: formData,
              };
            },
            invalidatesTags: ['Instructors'],
          }),
          editInstructorPassword: builder.mutation({
            query: ({ instructorId, data }) => {
              return {
                url: `admin/instructors/${instructorId}/reset-password`,
                method: 'PATCH',
                body: data,
              };
            },
            invalidatesTags: ['Instructors'],
          }),
    }),
    keepUnusedDataFor: 60,
    refetchOnMountOrArgChange: 5
});

export const { useGetInstructorsQuery, useDeleteInstructorMutation, useAddInstructorMutation, useEditInstructorMutation, useEditInstructorPasswordMutation } = instructorsApi;
