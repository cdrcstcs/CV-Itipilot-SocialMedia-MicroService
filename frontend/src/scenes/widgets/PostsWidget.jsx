import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import axios from "axios";
const PostsWidget = ({ userId, isProfile = false }) => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const getUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${userId}/posts`);
      setPosts(response.data);
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
  }, [isProfile, userId, posts]); 
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
