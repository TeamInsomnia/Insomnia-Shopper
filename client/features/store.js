import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authReducer, allProductsReducer, singleProductReducer, cartReducer } from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
