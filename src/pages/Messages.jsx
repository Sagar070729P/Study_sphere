import React, { useState, useRef, useEffect } from "react";
import Friendlist from "../components/Friendlist";
import "../styles/Messages.css";

const Messages = () => {
  const [friends, setFriends] = useState(["Alice", "Bob", "Charlie"]);
  const [activeFriend, setActiveFriend] = useState("Alice");
  const [chats, setChats] = useState({
    Alice: [],
    Bob: [],
    Charlie: [],
  });
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      setChats((prevChats) => ({
        ...prevChats,
        [activeFriend]: [...prevChats[activeFriend], message],
      }));
      setMessage("");
    }
  };

  const addFriend = (name) => {
    setFriends([...friends, name]);
    setChats((prevChats) => ({
      ...prevChats,
      [name]: [],
    }));
    setActiveFriend(name);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats[activeFriend]]);

  return (
    <div className="messages-container">
      <div className="sidebar">
        <Friendlist
          friends={friends}
          setActiveFriend={setActiveFriend}
          addFriend={addFriend}
        />
      </div>
      <div className="chat-area">
        <div className="chat-box">
          {chats[activeFriend]?.map((msg, index) => (
            <div key={index} className="chat-message">
              {msg}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${activeFriend}`}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
