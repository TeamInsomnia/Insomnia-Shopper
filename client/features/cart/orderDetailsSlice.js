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

export const addExistingToCartAsync = createAsyncThunk(
  "/updateOrderDetails",
  async ({ orderId, productId, quantity }) => {
    try {
      const { data } = await axios.put("/api/orderDetails/", {
        orderId,
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addNewToCartAsync = createAsyncThunk(
  "/addToOrderDetails",
  async ({ orderId, productId, quantity }) => {
    try {
      const { data } = await axios.post("/api/orderDetails/", {
        orderId,
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk('/removeFromCart', async(id)=>{
  try{
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/orderDetails/${id}`, {
      headers: { authorization: token },
    });
  }
  catch (error){
    console.error(error)
  }
})

export const orderDetailsSlice = createSlice({
  name: "orderDetailsSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetailsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addExistingToCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addNewToCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action)=>{
      return action.payload; 
    })
  },
});

export default orderDetailsSlice.reducer;
