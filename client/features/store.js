import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authReducer, allProductsReducer } from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
