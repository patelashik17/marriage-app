// store.js
import { configureStore } from "@reduxjs/toolkit";
import { applicationReducer } from "./components/reducer/dashboardReducer";

const store = configureStore({
  reducer: {
    application: applicationReducer,
  },
});

export default store;
