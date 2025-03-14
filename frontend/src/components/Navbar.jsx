// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f8f9fa", display: "flex", justifyContent: "space-between" }}>
      <h2>Medicine Tracker</h2>
      <div>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
        <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        <Link to="/signup" style={{ marginRight: "15px" }}>Signup</Link>
        <button onClick={handleLogout} style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
