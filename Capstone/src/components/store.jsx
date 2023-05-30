import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";

const store = configureStore({
  reducer: {
    audio: audioSlice.reducer,
  },
});

export default store;
