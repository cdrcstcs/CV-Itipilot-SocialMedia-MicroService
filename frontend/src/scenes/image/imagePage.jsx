import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const SingleImage = ({imageId}) => {
  // console.log('hello');

  const [image, setImage] = useState(null);
  const fetchImage = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/images/${imageId}`);
          setImage(response.data.image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
useEffect(() => {
    fetchImage();
}, []);
  return (
    <div>
      {image ? (
        <div>
          <img width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/${image}`} 
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};