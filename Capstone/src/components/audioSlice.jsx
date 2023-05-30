import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabled: true,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    toggleAudio: (state) => {
      state.enabled = !state.enabled;
    },
  },
});

export const { toggleAudio } = audioSlice.actions;

export default audioSlice;
