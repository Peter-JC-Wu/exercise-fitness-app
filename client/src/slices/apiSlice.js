// fetchBaseQuery is the function that will allow requests to the backend api
// This is basically the parent to user Api slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthHeadersToken } from "../utilities/authHeadersTokenUtils";

// production: process.env.REACT_APP_BACKEND_API_URL
// dev: http://localhost:5001
// baseUrl is an empty string because of using a proxy
const baseQuery = fetchBaseQuery({ 
  // baseUrl: "http://localhost:5001",
  baseUrl: process.env.REACT_APP_BACKEND_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getAuthHeadersToken(getState());
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User", "exercises", "bodyPart"],
  endpoints: (builder) => ({})
});