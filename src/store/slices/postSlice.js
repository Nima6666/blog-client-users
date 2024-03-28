import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = async () => {
  console.log("getting all posts");
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/posts`);

    return response.data;
  } catch {
    return Error;
  }
};

export const getPost = async (id) => {
  console.log("getting clicked post");
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVERAPI}/posts/${id}`
    );
    return response.data;
  } catch {
    return Error;
  }
};

export const like = async (id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVERAPI}/posts/${id}/like`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch {
    return Error;
  }
};

export const commentHandle = async (comment, id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVERAPI}/posts/${id}/comment`,
      { comment },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postSlice = createSlice({
  name: "post",
  initialState: { posts: {}, selPost: [], userLike: false },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSelPost(state, action) {
      state.selPost = action.payload;
    },
    setLike(state, action) {
      state.userLike = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
