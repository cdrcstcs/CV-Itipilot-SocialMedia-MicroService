import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import axios from "axios"; 
const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/friends`,
      );
      console.log(response.data);
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  useEffect(() => {
    getFriends();
  }, [userId]);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
