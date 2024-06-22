import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useRef } from "react";
import { useAuthContext } from "scenes/context/UserContext";
const Friend = ({ friendId, longtitude, latitude }) => {
  const navigate = useNavigate();
  const {userDataFetch} = useAuthContext();
  const _id = userDataFetch._id;
  const friends = userDataFetch.friends;
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
      console.log(response.data);
    } catch (error) {
      console.error("Error patching friend:", error);
    }
  };
  const handleLocationClick = () => {
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
              handleLocationClick();
              replaceHistory(window.location.href);
          }}
          >
            Coordinates: {latitude}, {longtitude} (Click to View)
            <a href={urltomap} ref={hiddenLinkRef} style={{ display: 'none' }}>Hidden Link</a>
          </Typography>
        </Box>
      </FlexBetween>
      {friendId==_id? null :
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
      }
    </FlexBetween>
  );
};
export default Friend;
