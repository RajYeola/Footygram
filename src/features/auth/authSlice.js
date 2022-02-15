import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("auth/signup", async (userInfo) => {
  const response = await axios.post(
    "http://localhost:5000/user/signup",
    userInfo
  );

  return { token: response.data.token, user: response.data.userInfo };
});

export const signinUser = createAsyncThunk("auth/signin", async (userInfo) => {
  const response = await axios.post(
    "http://localhost:5000/user/signin",
    userInfo
  );

  return { token: response.data.token, user: response.data.userInfo };
});

export const followUser = createAsyncThunk(
  "users/followUser",
  async (username) => {
    const response = await axios.post(
      `http://localhost:5000/user/follow/${username}`
    );

    return { user: response.data.user };
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (username) => {
    const response = await axios.post(
      `http://localhost:5000/user/unfollow/${username}`
    );

    return { user: response.data.user };
  }
);

const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signoutUser: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      axios.defaults.headers.common["Authorization"] = null;
    },
  },
  extraReducers: {
    [signinUser.pending]: (state) => {
      state.status = "loading";
    },
    [signinUser.fulfilled]: (state, action) => {
      const { token, user } = action?.payload;

      state.user = user;
      state.token = token;
      state.status = "fulfilled";

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      axios.defaults.headers.common["Authorization"] = token;
    },
    [signinUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      const { token, user } = action?.payload;

      state.token = token;
      state.user = user;
      state.status = "fulfilled";

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      axios.defaults.headers.common["Authorization"] = token;
    },
    [signupUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [followUser.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.status = "fulfilled";
      state.user = user;
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "rejected";
    },
    [unfollowUser.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.status = "fulfilled";
      state.user = user;
    },
    [unfollowUser.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "rejected";
    },
  },
});

export const { signoutUser } = authSlice.actions;

export default authSlice.reducer;
