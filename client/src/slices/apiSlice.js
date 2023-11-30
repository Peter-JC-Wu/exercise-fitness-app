// fetchBaseQuery is the function that will allow requests to the backend api
// This is basically the parent to user Api slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// production: process.env.REACT_APP_BACKEND_API_URL
// dev: http://localhost:6000
// baseUrl is an empty string because of using a proxy
const baseQuery = fetchBaseQuery({ 
  // baseUrl: process.env.REACT_APP_BACKEND_API_URL,
  baseUrl: "http://localhost:5001"
});

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User", "exercises", "bodyPart"],
  endpoints: (builder) => ({})
});