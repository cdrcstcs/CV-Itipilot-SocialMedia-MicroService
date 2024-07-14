import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
const UserWidget = ({user}) => {
  console.log('hello');
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const {
    _id,
    name,
    email,
    phone,
    friends,
    hotels,
    userType,
    imageId,
    longtitude,
    latitude,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage imageId={imageId}/>
          <Box>
            <Typography
              variant="h4"
              color={dark}
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
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      <Box p="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          mb="0.5rem"
        >
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          {longtitude? <Typography
            variant="body2"
            color="primary"
          >
            Coordinates: {latitude}, {longtitude}
          </Typography> : null}        
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
        >
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{userType}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Email</Typography>
          <Typography color={main} fontWeight="500">
            {email}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Phone</Typography>
          <Typography color={main} fontWeight="500">
            {phone}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Hotels</Typography>
          <Typography color={main} fontWeight="500">
            {hotels.length}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
    </WidgetWrapper>
  );
};
export default UserWidget;
