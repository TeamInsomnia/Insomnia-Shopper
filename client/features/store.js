import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  authReducer,
  allProductsReducer,
  singleProductReducer,
  orderDetailsReducer,
  orderReducer,
  allUsersReducer,
  singleUserReducer
} from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    singleUser: singleUserReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
