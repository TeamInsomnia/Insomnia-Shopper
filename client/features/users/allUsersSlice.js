import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.get("/api/users", {
      headers: { authorization: token },
    });
    return data;
  } catch (err) {
    console.error("mix-up from the fetchAllUsers thunk: ", err);
  }
});

export const allUsersSlice = createSlice({
  name: "allUsersSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default allUsersSlice.reducer;
