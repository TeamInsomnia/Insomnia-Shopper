// SINGLE USER SLICE FOLLOWS:

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

// need an async Thunk to create a new user.

export const createUser = createAsyncThunk(
  "createUser",
  async (newUserInfo) => {
    try {
      const newUser = await axios.post(`/api/users`, newUserInfo);
      return newUserInfo.data;
      // this still needs back-end restriction and validation.
    } catch (err) {
      console.log(err);
    }
  }
);

///////////

export const singleUserSlice = createSlice({
  name: "singleUserSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleUser = (state) => {
  return state.singleUser;
};

export default singleUserSlice.reducer;
