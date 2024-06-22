import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import axios from "axios"; 
import { SingleImage } from "scenes/image/imagePage";
const PostWidget = ({
  postId,
  postUserId,
  description,
  longtitude,
  latitude,
  imageId,
  likes,
}) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/posts/${postId}/like`,
        { userId: loggedInUserId }
      );
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
