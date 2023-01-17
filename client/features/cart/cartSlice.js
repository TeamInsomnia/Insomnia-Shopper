import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderDetailsAsync = createAsyncThunk(
  "/AllOrderDetails",
  async () => {
    try {
      const { data } = await axios.get("/api/orderDetails");
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchSingleOrderDetailAsync = createAsyncThunk(
  "/orderDetails",
  async (orderId) => {
    try {
      const { data } = await axios.get(`/api/orderDetails/${orderId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "/updateOrderDetails",
  async ({ orderId, quantity }) => {
    const { data } = await axios.put(`/api/orderDetails/${orderId}`, {
      quantity,
    });
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetailsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchSingleOrderDetailAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
