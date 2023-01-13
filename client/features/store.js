import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  authReducer,
  allUsersReducer,
  allProductsReducer,
  singleProductReducer,
  cartReducer,
} from "./";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
