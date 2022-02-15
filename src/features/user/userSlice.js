import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserByUsername = createAsyncThunk(
  "users/fetchUserByUsername",
  async (username) => {
    const response = await axios.get(
      `https://footygram-api.herokuapp.com/user/${username}`
    );

    return { user: response.data.user };
  }
);

const initialState = {
  status: "idle",
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserByUsername.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.status = "fulfilled";

      state.user = user;
    },
    [fetchUserByUsername.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserByUsername.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "rejected";
    },
  },
});

export default userSlice.reducer;
