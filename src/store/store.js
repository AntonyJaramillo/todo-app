import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./slices/todo";
export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
