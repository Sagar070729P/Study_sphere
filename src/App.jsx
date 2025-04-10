import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Filesharing from "./pages/Filesharing";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import UserProvider from "./context/UserContext";
import "./styles/App.css";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filesharing" element={<Filesharing />} />
              <Route path="/community" element={<Community />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;


