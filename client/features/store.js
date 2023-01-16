import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  authReducer,
  allProductsReducer,
  singleProductReducer,
  orderDetailsReducer,
  orderReducer,
} from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
