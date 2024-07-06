import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
const PostsWidget = ({ userId, isProfile = false }) => {
  console.log('hello');
  const dispatch = useDispatch();
  const [posts, setPostsState] = useState([]);
  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      dispatch(setPosts({ posts: response.data }));
      setPostsState(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const getUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${userId}/posts`);
      dispatch(setPosts({ posts: response.data }));
      setPostsState(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId]); 
  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            description,
            longtitude,
            latitude,
            imageId,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              description={description}
              longtitude={longtitude}
              latitude={latitude}
              imageId={imageId}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};
export default PostsWidget;
