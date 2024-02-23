// FileUpload.js
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("pdfs", file);
    });

    try {
      await axios.post("http://localhost:5000/upload", formData);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some PDFs here, or click to select files</p>
        )}
      </div>
      <button onClick={uploadFiles}>Upload</button>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUpload;
