import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";

// Create store without next-redux-wrapper
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
