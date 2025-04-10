// Filesharing.jsx
import React, { useState } from "react";
import "../styles/Filesharing.css";

const Filesharing = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      alert(`Uploading: ${file.name}`);
      // Add upload logic here
    }
  };

  return (
    <div className="filesharing-container">
      <h3>File Sharing</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Filesharing;