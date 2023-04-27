import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
  "/posts/fetchAllPosts",
  async () => {
    const response = await axios.get(
      "https://footygram-backend-git-dev-rajyeola.vercel.app/posts/"
    );

    return { posts: response.data.posts };
  }
);

export const createNewPost = createAsyncThunk(
  "/posts/createNewPost",
  async ({ postContent, imageURL }) => {
    const response = await axios.post(
      "https://footygram-backend-git-dev-rajyeola.vercel.app/posts/",
      {
        postContent,
        imageURL,
      }
    );

    return { post: response.data.newPost };
  }
);

export const deletePost = createAsyncThunk(
  "/posts/deletePost",
  async (postID) => {
    const response = await axios.delete(
      `https://footygram-backend-git-dev-rajyeola.vercel.app/posts/${postID}`
    );

    return { post: response.data.post };
  }
);

export const addReactionToPost = createAsyncThunk(
  "/posts/addReactionToPost",
  async ({ postID, reaction }) => {
    const response = await axios.post(
      `https://footygram-backend-git-dev-rajyeola.vercel.app/posts/${postID}/${reaction}`
    );

    return { post: response.data.post };
  }
);

export const removeReactionFromPost = createAsyncThunk(
  "/posts/removeReactionFromPost",
  async ({ postID, reaction }) => {
    const response = await axios.delete(
      `https://footygram-backend-git-dev-rajyeola.vercel.app/posts/${postID}/${reaction}`
    );

    return { post: response.data.post };
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewPost.fulfilled]: (state, action) => {
      const { post } = action.payload;

      state.posts.unshift(post);
      state.status = "fulfilled";
    },
    [createNewPost.pending]: (state) => {
      state.status = "loading";
    },
    [createNewPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      const { posts } = action.payload;

      state.posts = posts;
      state.status = "fulfilled";
    },
    [fetchAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [deletePost.fulfilled]: (state, action) => {
      const { post } = action.payload;

      state.status = "fulfilled";
      const newPosts = state.posts.filter(
        ({ _id: postID }) => postID !== post._id
      );
      state.posts = newPosts;
    },
    [deletePost.pending]: (state) => {
      state.status = "loading";
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [addReactionToPost.fulfilled]: (state, action) => {
      const { post: updatedPost } = action.payload;

      const updatedPosts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      state.posts = updatedPosts;
      state.status = "fulfilled";
    },
    [addReactionToPost.pending]: (state) => {
      state.status = "loading";
    },
    [addReactionToPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [removeReactionFromPost.fulfilled]: (state, action) => {
      const { post: updatedPost } = action.payload;

      const updatedPosts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      state.posts = updatedPosts;
      state.status = "fulfilled";
    },
    [removeReactionFromPost.pending]: (state) => {
      state.status = "loading";
    },
    [removeReactionFromPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export default postsSlice.reducer;
