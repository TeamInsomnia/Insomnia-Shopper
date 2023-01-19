import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleUser = createAsyncThunk(
  "fetchSingleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      console.error("Error occured in fetchSingleUser async thunk ", err);
    }
  }
);

export const fetchOrderHistory = createAsyncThunk(
  "/users/history",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/history/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const singleUserSlice = createSlice({
  name: "singleUserSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default singleUserSlice.reducer;
