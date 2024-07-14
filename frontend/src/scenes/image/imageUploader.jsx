import React from 'react';
import axios from 'axios';
export const ImageUploader = ({ onImageUpload }) => {
    console.log('hello');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:3000/upload`, formData);
            if (response.data && response.data.image._id) {
                onImageUpload(response.data.image._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    return (
        <div>
            {/* Customize the input element to hide the filename */}
            <label htmlFor="upload-input" style={{ cursor: 'pointer', backgroundColor:'black', color:'white', borderRadius:'20px', fontSize:'16px', fontWeight:'200px',width:'100px' }}>
                Upload 
            </label>
            <input
                id="upload-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the input element
            />
        </div>
    );
};
