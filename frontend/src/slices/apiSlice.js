// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: process.env.API_BASE}),
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: () => '/plants',
    }),
    getPlant: builder.query({
      query: (plantId) => `/plants/${plantId}`,
    }),
    createPlant: builder.mutation({
      query: (plant) => ({
        url: `/plants`,
        method: 'POST',
        body: plant,
      }),
    }),
    editPlant: builder.mutation({
      query: (plant) => ({
        url: `/plants/${plant.id}`,
        method: 'PATCH',
        body: plant,
      }),
    }),
    deletePlant: builder.mutation({
      query: (plant) => ({
        url: `/plants/${plant.id}`,
        method: 'DELETE',
      }),
    }),
    getTasks: builder.query({
      query: () => '/tasks',
    }),
    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    editTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PATCH',
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'DELETE',
      }),
    }),
    getNotes: builder.query({
      query: () => '/notes',
    }),
    getNote: builder.query({
      query: (noteId) => `/notes/${noteId}`,
    }),
    createNote: builder.mutation({
      query: (note) => ({
        url: `/notes`,
        method: 'POST',
        body: note,
      }),
    }),
    editNote: builder.mutation({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'PATCH',
        body: note,
      }),
    }),
    deleteNote: builder.mutation({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'DELETE',
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPlantsQuery,
  useGetPlantQuery,
  useCreatePlantMutation,
  useEditPlantMutation,
  useDeletePlantMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = apiSlice;
