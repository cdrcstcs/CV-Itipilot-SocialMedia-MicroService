import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import axios from "axios"; // Import Axios

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/others/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);
  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget longtitude={user.longtitude} latitude={user.latitude}/> */}
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
