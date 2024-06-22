import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import axios from "axios";
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts) || [];
  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      dispatch(setPosts({ posts: response.data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const getUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${userId}/posts`);
      dispatch(setPosts({ posts: response.data }));
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
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};
export default PostsWidget;
