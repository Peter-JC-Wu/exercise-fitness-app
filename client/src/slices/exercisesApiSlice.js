import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// fetchBaseQuery is the function that will allow requests to the API
// This is basically the parent to exercises user Api slice
const baseQuery = fetchBaseQuery({
  baseUrl: "https://exercisedb.p.rapidapi.com",
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_EXERCISE_KEY,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  },
});

export const exercisesApiSlice = createApi({
  reducerPath: "exercisesApi",
  baseQuery,
  tagTypes: ["exercises"],
  keepUnusedDataFor: 60 * 60 * 24 * 1,
  endpoints: (builder) => ({})
});