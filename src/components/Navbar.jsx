// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>StudySphere</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/filesharing">File Sharing</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

