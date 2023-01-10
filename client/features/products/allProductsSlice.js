import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const { products } = await axios.get("/api/products");
      return products;
    } catch (err) {
      console.error("error in fetchAllProducts thunk: ", err);
    }
  }
);

export const allProductsSlice = createSlice({
  name: allProductsSlice,
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default allProductsSlice.reducer;
