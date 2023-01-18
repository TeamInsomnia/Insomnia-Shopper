import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk("fetchProfile", async (id) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (err) {
    console.error("error from fetchProfile async thunk: ", err);
  }
});

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProfile = (state) => {
  return state.profile;
};

export default profileSlice.reducer;
