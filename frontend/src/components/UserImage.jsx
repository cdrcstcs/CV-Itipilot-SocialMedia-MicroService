import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "scenes/context/UserContext";
const UserImage = ({ size = "60px" }) => {
  const [imagePath, setImagePath] = useState(null);
  const {userDataFetch} = useAuthContext();
  const imageId = userDataFetch.imageId;
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/images/${imageId}`);
        const data = response.data;
        setImagePath(data.path); // Assuming the API returns an object with a `path` property
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };
    if (imageId) {
      fetchImage();
    }
  }, [imageId]);
  return (
    <Box width={size} height={size}>
      {imagePath ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:4000/${imagePath}`}
        />
      ) : (
        <div style={{ width: size, height: size, backgroundColor: "#ccc" }} />
      )}
    </Box>
  );
};
export default UserImage;
