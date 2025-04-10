import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Home.css";

const Home = () => {
  const { user, updateUser } = useContext(UserContext);
  const [editName, setEditName] = useState(user.name);
  const [editStatus, setEditStatus] = useState(user.status);

  const handleSave = () => {
    updateUser({ name: editName, status: editStatus });
  };

  return (
    <div className="home-container">
      <h1>Welcome to StudySphere</h1>
      <div className="profile-editor">
        <label>
          Name:
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        </label>
        <label>
          Status:
          <input value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
        </label>
        <button onClick={handleSave}>Save Profile</button>
      </div>
      <p>Navigate through File Sharing, Community, and Messaging using the navbar above.</p>
    </div>
  );
};

export default Home;
