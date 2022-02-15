import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    search: searchReducer,
    user: userReducer,
  },
});
