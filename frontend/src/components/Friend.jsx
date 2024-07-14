import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined, LocationOnOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useAuthContext } from "scenes/context/UserContext";
const Friend = ({ friendId, longtitude, latitude }) => {
  const navigate = useNavigate();
  const {userDataFetch} = useAuthContext();
  const _id = userDataFetch._id;
  const friends = useSelector((state) => state.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const [friend, setFriend] = useState("");
  const isFriend = Array.isArray(friends[_id]) && friends[_id].find((friend) => friend._id === friendId);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/others/${friendId}`);
        setFriend(response.data);
      } catch (error) {
        console.error("Error fetching friend details:", error);
      }
    };
    fetchFriendDetails();
  }, [friendId]);
  const patchFriend = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${friendId}`, {});
      const updatedFriend = response.data;
      dispatch(setFriends({ userId: _id, friends: updatedFriend }));
    } catch (error) {
      console.error("Error patching friend:", error);
    }
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage imageId={friend.imageId} size="55px" />
        <Box

          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
            style={{ cursor: "pointer" }}

        >
          <Typography color={main}>{friend.name}</Typography>
          {longtitude? 
          <Typography
            variant="body2"
            color="primary"
            style={{ cursor: "pointer", display:'flex', alignItems:'center', justifyContent:'center' }}
          >
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <div>
              Coordinates: {latitude}, {longtitude}
            </div>
          </Typography>
          : null
          }
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
