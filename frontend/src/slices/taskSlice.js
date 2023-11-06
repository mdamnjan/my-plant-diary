// import { apiSlice } from "./apiSlice";

// export const taskSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTasks: builder.query({
//       query: () => "/tasks",
//     }),
//     getTask: builder.query({
//       query: (taskId) => `/tasks/${taskId}`,
//     }),
//     createTask: builder.mutation({
//       query: (task) => ({
//         url: `/tasks`,
//         method: "POST",
//         body: task,
//       }),
//     }),
//     editTask: builder.mutation({
//       query: (task) => ({
//         url: `/tasks/${task.id}`,
//         method: "PATCH",
//         body: task,
//       }),
//     }),
//     deleteTask: builder.mutation({
//       query: (task) => ({
//         url: `/tasks/${task.id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetTasksQuery,
//   useGetTaskQuery,
//   useCreateTaskMutation,
//   useEditTaskMutation,
//   useDeleteTaskMutation,
// } = taskSlice;
