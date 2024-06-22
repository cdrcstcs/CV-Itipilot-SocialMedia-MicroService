import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import axios from "axios"; // Import Axios
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const Friend = ({ friendId, name, subtitle}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${_id}/${friendId}`,{});
      dispatch(setFriends({ friends: response.data }));
    } catch (error) {
      console.error("Error patching friend:", error);
    }
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};
export default Friend;
