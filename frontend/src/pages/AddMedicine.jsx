import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState([""]); // Default empty time slot
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/medicines/add",
        { name, dosage, frequency, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Medicine added successfully!");
      navigate("/dashboard"); // Redirect back to Dashboard
    } catch (err) {
      console.error("Error adding medicine:", err.response?.data || err.message);
      alert("Failed to add medicine");
    }
  };

  return (
    <div>
      <h2>Add New Medicine</h2>
      <form onSubmit={handleSubmit}>
        <label>Medicine Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Dosage:</label>
        <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} required />

        <label>Frequency:</label>
        <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} required />

        <label>Time (comma-separated e.g., 08:00 AM, 08:00 PM):</label>
        <input
          type="text"
          value={time.join(", ")}
          onChange={(e) => setTime(e.target.value.split(",").map((t) => t.trim()))}
          required
        />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
