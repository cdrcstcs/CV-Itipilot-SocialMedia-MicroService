import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import axios from "axios"; 
const FriendListWidget = ({ userId }) => {
  console.log('hello');

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.friends);
  // const getFriends = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/users/${userId}/friends`,
  //     );
  //     const updatedFriend = response.data;

  //   // Update Redux state using immer.js (enabled by Redux Toolkit)
  //     dispatch(setFriends({ userId: userId, friends: updatedFriend }));
  //   } catch (error) {
  //     console.error("Error fetching friends:", error);
  //   }
  // };
  // useEffect(() => {
  //   getFriends();
  // }, [userId]);
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
        {Array.isArray(friends[userId]) &&
          friends[userId].map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              longtitude={friend.longtitude}
              latitude={friend.latitude}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
