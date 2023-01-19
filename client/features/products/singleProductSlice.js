import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      console.error("hit an error in fetchSingleProduct thunk: ", err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.put(`/api/products/${id}`, formData, {
        headers: { authorization: token },
      });
      return data;
    } catch (err) {
      console.error("error in updateProduct thunk: ", err);
    }
  }
);

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/products/${id}`, {
      headers: { authorization: token },
    });
  } catch (err) {
    console.error("error in deleteProduct thunk: ", err);
  }
});

export const singleProductSlice = createSlice({
  name: "singleProductSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
