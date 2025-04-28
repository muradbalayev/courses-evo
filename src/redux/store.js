import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { instructorsApi } from "./services/instructorsApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [instructorsApi.reducerPath]: instructorsApi.reducer,

    // [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(instructorsApi.middleware),
});

setupListeners(store.dispatch);
