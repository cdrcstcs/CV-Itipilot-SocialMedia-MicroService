import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import axios from "axios"; 
import { SingleImage } from "scenes/image/imagePage";
import { useAuthContext } from "scenes/context/UserContext";
import { useDispatch } from "react-redux";
import { setPost } from "state";
const PostWidget = ({
  postId,
  postUserId,
  description,
  longtitude,
  latitude,
  imageId,
  likes,
}) => {
  // console.log('hello');

  const dispatch = useDispatch();
  const {userDataFetch} = useAuthContext();
  const loggedInUserId = userDataFetch._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/posts/${postId}/like`);
      dispatch(setPost({ post: response.data }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend friendId={postUserId} longtitude={longtitude} latitude={latitude}/>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {imageId && <SingleImage imageId={imageId}></SingleImage>}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default PostWidget;
