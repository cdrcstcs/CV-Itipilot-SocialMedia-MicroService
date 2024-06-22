import React, { useState } from 'react';
import axios from 'axios';
export const ImageUploader = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await axios.post('http://localhost:3000/upload', formData);
            if (response.data && response.data.image._id) {
                onImageUpload(response.data.image._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {previewURL && <img src={previewURL} alt="Preview" style={{ width: '30%', height: '300px', marginTop: '10px' }} />}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};
