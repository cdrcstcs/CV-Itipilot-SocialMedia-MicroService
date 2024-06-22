import React, { useState } from 'react';
import axios from 'axios';

export const ImageUploader = ({ onImageUpload }) => {
    const [previewURL, setPreviewURL] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData);
            if (response.data && response.data.image._id) {
                onImageUpload(response.data.image._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {previewURL && <img src={previewURL} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
        </div>
    );
};
