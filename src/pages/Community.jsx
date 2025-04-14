import React, { useState } from 'react';
import '../styles/Community.css';

const Community = () => {
  const [communities, setCommunities] = useState([
    { name: "Tech Enthusiasts", description: "All about the latest in tech!" },
    { name: "AI Researchers", description: "Discuss ML/AI algorithms & research." },
  ]);
  const [newCommunity, setNewCommunity] = useState({ name: "", description: "" });

  const handleJoin = (name) => {
    alert(`Joined community: ${name}`);
    // Backend integration for joining community will go here.
  };

  const handleCreate = () => {
    if (newCommunity.name.trim() && newCommunity.description.trim()) {
      setCommunities([...communities, newCommunity]);
      setNewCommunity({ name: "", description: "" });
    }
  };

  return (
    <div className="community-container">
      <h2>Community Hub</h2>

      <div className="create-community">
        <input
          type="text"
          placeholder="Community Name"
          value={newCommunity.name}
          onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCommunity.description}
          onChange={(e) =>
            setNewCommunity({ ...newCommunity, description: e.target.value })
          }
        />
        <button onClick={handleCreate}>Create Community</button>
      </div>

      <div className="community-list">
        {communities.map((community, idx) => (
          <div className="community-card" key={idx}>
            <h3>{community.name}</h3>
            <p>{community.description}</p>
            <button onClick={() => handleJoin(community.name)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
