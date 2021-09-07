import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFollowers: false,
  reloadState: 0,
  user: { _id: null, display_picture: null, user_name: "" },
  content: "",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setShowFollowers: (state, action) => {
      state.showFollowers = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleReload: (state) => {
      state.reloadState++;
    },
  },
});

export const { setShowFollowers, setUser, toggleReload } = mainSlice.actions;

export default mainSlice.reducer;
