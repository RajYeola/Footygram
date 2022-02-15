import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "/search/fetchAllUsers",
  async () => {
    const response = await axios.get("http://localhost:5000/user/allUsers");

    return { users: response.data.users };
  }
);

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, action) => {
      const { users } = action.payload;
      state.status = "fulfilled";
      state.users = users;
    },
    [fetchAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default searchSlice.reducer;
