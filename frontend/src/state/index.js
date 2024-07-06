import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: {}, // Initialize friends as an object
  posts: [],
};

export const authSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      const { userId, friends } = action.payload;
      state.friends[userId] = friends; // Update friends for the specific userId
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
