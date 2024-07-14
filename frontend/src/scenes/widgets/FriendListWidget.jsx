import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const friends = useSelector((state) => state.friends);
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
