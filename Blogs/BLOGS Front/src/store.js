import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/reducers/user";
import blogSclice from "./redux/reducers/blog";

export const store = configureStore({
  reducer: {
    counter: userSlice,
    blogSclice: blogSclice
  },
});
