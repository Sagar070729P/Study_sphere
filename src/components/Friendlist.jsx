import React from "react";
import "../styles/Friendlist.css";

const friends = ["Alice", "Bob", "Charlie", "David"];

const Friendlist = ({ setSelectedFriend }) => {
  return (
    <div className="friend-list">
      <h3>Friends</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} onClick={() => setSelectedFriend(friend)}>
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friendlist;
