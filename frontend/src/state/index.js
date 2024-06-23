import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: [],
  posts: [],
};
export const authSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
export const { setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
