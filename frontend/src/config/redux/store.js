import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";

/**
 * STEPS for State Management
 * Submit Action
 * Handle Action in it's Reducer
 * Register Here -> Store
 */

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
