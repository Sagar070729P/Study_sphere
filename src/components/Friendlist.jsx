// Friendlist.jsx
import React from "react";
import "../styles/Friendlist.css";

const friends = ["Alice", "Bob", "Charlie"];

const Friendlist = () => {
  return (
    <div className="friend-list">
      <h3>Friends</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friendlist;

