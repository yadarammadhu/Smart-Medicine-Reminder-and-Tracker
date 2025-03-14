// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddMedicine from "./pages/AddMedicine";  
import EditMedicine from "./pages/EditMedicine"; 

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Medicine Reminder App</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/edit-medicine/:id" element={<EditMedicine />} />
      </Routes>
    </div>
  );
};

export default App;
