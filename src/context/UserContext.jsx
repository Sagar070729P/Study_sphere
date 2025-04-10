import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    status: "Available",
    profilePic: null,
  });

  const updateUser = (newData) => {
    setUser((prevUser) => ({ ...prevUser, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
