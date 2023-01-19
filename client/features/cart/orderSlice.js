import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUnpurchasedOrderAsync = createAsyncThunk(
  "/fetchSingleUnpurchasedOrderAsync",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/order/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async ({ userId, totalPrice }) => {
    try {
      const { data } = await axios.post("/api/order", { userId, totalPrice });
      return data;
    } catch (error) {
      console.error("error in createOrder Thunk: ", error);
    }
  }
);

export const purchaseOrder = createAsyncThunk('/purchaseOrder', async(id) =>{
  try{
    const {data} = await axios.put(`/api/order/${id}`); 
    console.log(data);
    return data; 
  }
  catch (error){
    console.error(error);
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
        return action.payload;
      })
      .addCase(purchaseOrder.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default orderSlice.reducer;
