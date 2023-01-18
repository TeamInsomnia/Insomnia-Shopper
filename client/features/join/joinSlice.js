/* JOINSLICE: PRIMARY purpose here is to shoot a user
down if she submits a username or email address that is
ALREADY in our database. This is modeled off authSlice.js
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

// ... do we even need this Thunk?
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ username, password, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

/*
  SLICE
*/
export const joinSlice = createSlice({
  name: "join",
  initialState: {
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
      state.error = null;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
/*
  ACTIONS
*/
export const { join } = joinSlice.actions;
/*
  REDUCER
*/
export default joinSlice.reducer;
