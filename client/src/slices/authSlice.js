import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set userInfo to local storage and Redux store when logged in
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Action to remove userInfo from local storage and Redux store when logged out 
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    // Action to add an exercise to the userInfo savedFavoriteExericsesList array
    addSavedExerciseToList: (state, action) => {
      const { exerciseId, exercise } = action.payload;

      // Check if the exercise is already in the savedFavoriteExercisesList
      if (!state.userInfo.savedFavoriteExercisesList.find((item) => item.id === exerciseId)) {
        // Add the new exercise to the list
        state.userInfo.savedFavoriteExercisesList.push({ exerciseId: exerciseId, exercise });
        // Update the data in local storage
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    // Action to remove an exercise from the userInfo savedFavoriteExericsesList array
    removeSavedExerciseFromList: (state, action) => {
      const { exerciseId } = action.payload;
      state.userInfo.savedFavoriteExercisesList = state.userInfo.savedFavoriteExercisesList.filter(
        (item) => item.exerciseId !== exerciseId
      );
      // Update the data in local storage
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});

// Destructure the action creators
export const { 
  setCredentials, 
  clearCredentials,
  addSavedExerciseToList,
  removeSavedExerciseFromList,
 } = authSlice.actions;

export default authSlice.reducer;