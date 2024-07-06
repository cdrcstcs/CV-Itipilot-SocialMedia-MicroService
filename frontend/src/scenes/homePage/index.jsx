import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useAuthContext } from "scenes/context/UserContext";
const HomePage = () => {
  console.log('hello');
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {userDataFetch} = useAuthContext();
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={userDataFetch}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget imageId={userDataFetch.imageId} longtitude={userDataFetch.longtitude} latitude={userDataFetch.latitude} />
          <PostsWidget userId={userDataFetch._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendListWidget userId={userDataFetch._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
