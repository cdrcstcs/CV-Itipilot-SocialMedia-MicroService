import React, { useEffect, useState } from "react";
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
import { useRef } from "react";
const Friend = ({ friendId, longtitude, latitude }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const [friendName, setFriendName] = useState("");
  const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  const hiddenLinkRef = useRef(null);
  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${friendId}`);
        const { name } = response.data;
        setFriendName(name);
      } catch (error) {
        console.error("Error fetching friend details:", error);
      }
    };

    fetchFriendDetails();
  }, [friendId]);
  const patchFriend = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${_id}/${friendId}`, {});
      dispatch(setFriends({ friends: response.data }));
    } catch (error) {
      console.error("Error patching friend:", error);
    }
  };
  const handleMessageClick = () => {
    hiddenLinkRef.current.click();
  };
  const replaceHistory = (url) => {
    window.history.replaceState({}, document.title, url);
  };
  const urltomap = `http://localhost:5600/${longtitude}/${latitude}`;
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
          <Typography color={main}>{friendName}</Typography>
          <Typography
            variant="body2"
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleMessageClick();
              replaceHistory(window.location.href);
          }}
          >
            Coordinates: {latitude}, {longtitude} (Click to View)
            <a href={urltomap} ref={hiddenLinkRef} style={{ display: 'none' }}>Hidden Link</a>
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
