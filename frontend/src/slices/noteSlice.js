// import { apiSlice } from "./apiSlice";

// export const noteSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getNotes: builder.query({
//       query: () => "/notes",
//     }),
//     getNote: builder.query({
//       query: (noteId) => `/notes/${noteId}`,
//     }),
//     createNote: builder.mutation({
//       query: (note) => ({
//         url: `/notes`,
//         method: "POST",
//         body: note,
//       }),
//     }),
//     editNote: builder.mutation({
//       query: (note) => ({
//         url: `/notes/${note.id}`,
//         method: "PATCH",
//         body: note,
//       }),
//     }),
//     deleteNote: builder.mutation({
//       query: (note) => ({
//         url: `/notes/${note.id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
//   overrideExisting: false
// });

// export const {
//   useGetNotesQuery,
//   useGetNoteQuery,
//   useCreateNoteMutation,
//   useEditNoteMutation,
//   useDeleteNoteMutation,
// } = noteSlice;
