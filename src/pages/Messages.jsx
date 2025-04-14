import React, { useState } from 'react';
import Friendlist from "../components/Friendlist";
import "../styles/Messages.css";

const Messages = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState({});

  const handleSend = () => {
    if (selectedFriend && message.trim()) {
      const updatedChats = { ...chats };
      if (!updatedChats[selectedFriend]) updatedChats[selectedFriend] = [];
      updatedChats[selectedFriend].push({ text: message, sender: "You" });
      setChats(updatedChats);
      setMessage("");
    }
  };

  return (
    <div className="messages-container">
      <div className="friendlist-area">
        <Friendlist setSelectedFriend={setSelectedFriend} />
      </div>
      <div className="chat-area">
        {selectedFriend ? (
          <>
            <div className="chat-header">{selectedFriend}</div>
            <div className="chat-box">
              {chats[selectedFriend]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.sender === "You" ? "sent" : "received"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-friend">Select a friend to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
