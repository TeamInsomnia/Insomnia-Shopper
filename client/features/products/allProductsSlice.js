import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (err) {
      console.error("error in fetchAllProducts thunk: ", err);
    }
  }
);

export const addProduct = createAsyncThunk("addProduct", async (formData) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post("/api/products", formData, {
      headers: { authorization: token },
    });
    return data;
  } catch (err) {
    console.error("error in addProduct thunk: ", err);
  }
});

export const allProductsSlice = createSlice({
  name: "allProductsSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const stateCopy = [...state];
        stateCopy.push(action.payload);
        return stateCopy;
      });
  },
});

export default allProductsSlice.reducer;
