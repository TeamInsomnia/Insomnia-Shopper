import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUnpurchasedOrderAsync = createAsyncThunk(
  "/orderDetails",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/order/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createOrder = createAsyncThunk("createOrder", async (userId) => {
  try {
    console.log(userId);
    const { data } = await axios.post("/api/order", { userId });
    return data;
  } catch (error) {
    console.error("error in createOrder Thunk: ", error);
  }
});

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUnpurchasedOrderAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const stateCopy = [...state];
        stateCopy.push(action.payload);
        return stateCopy;
      });
  },
});

export default orderSlice.reducer;
