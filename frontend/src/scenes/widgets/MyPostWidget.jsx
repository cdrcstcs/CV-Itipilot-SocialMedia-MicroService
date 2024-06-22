import {
  Divider,
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { ImageUploader } from "scenes/image/imageUploader";
import axios from "axios"; 
const MyPostWidget = ({ longtitude, latitude }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [postimageid, setpostimageid] = useState(null);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const onimg = (imgId) =>{
    setpostimageid(imgId);
  }
  const handlePost = async () => {
    try {
      const postData = {
        userId: _id,
        description: post,
        longtitude,
        latitude,
        imageId: postimageid
      };
      const response = await axios.post(`http://localhost:3000/posts`, postData);
      dispatch(setPosts({ posts: response.data }));
      setPost("");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage/>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <ImageUploader onImageUpload={onimg}></ImageUploader>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default MyPostWidget;
