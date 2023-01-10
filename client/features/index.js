export {
  default as authReducer,
  me,
  authenticate,
  logout,
} from "./auth/authSlice";

export {
  default as allProductsReducer,
  fetchAllProducts,
} from "./products/allProductsSlice";
