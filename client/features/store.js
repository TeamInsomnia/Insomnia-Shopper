import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  authReducer,
  allProductsReducer,
  singleProductReducer,
  orderDetailsReducer,
  orderReducer,
  allUsersReducer
} from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
