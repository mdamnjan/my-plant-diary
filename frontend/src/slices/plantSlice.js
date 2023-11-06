// import { apiSlice } from "./apiSlice";

// export const plantSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getPlants: builder.query({
//       query: () => "/plants",
//     }),
//     getPlant: builder.query({
//       query: (plantId) => `/plants/${plantId}`,
//     }),
//     createPlant: builder.mutation({
//       query: (plant) => ({
//         url: `/plants`,
//         method: "POST",
//         body: plant,
//       }),
//     }),
//     editPlant: builder.mutation({
//       query: (plant) => ({
//         url: `/plants/${plant.id}`,
//         method: "PATCH",
//         body: plant,
//       }),
//     }),
//     deletePlant: builder.mutation({
//       query: (plant) => ({
//         url: `/plants/${plant.id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
//   overrideExisting: false
// });

// export const {
//   useGetPlantsQuery,
//   useGetPlantQuery,
//   useCreatePlantMutation,
//   useEditPlantMutation,
//   useDeletePlantMutation,
// } = plantSlice;
