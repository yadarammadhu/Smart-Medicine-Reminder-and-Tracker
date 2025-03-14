// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Dashboard = () => {
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        const fetchMedicines = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:5000/api/medicines", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMedicines(res.data);
            } catch (err) {
                console.error("Error fetching medicines:", err);
            }
        };

        fetchMedicines();
    }, [navigate]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/api/medicines/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMedicines(medicines.filter((med) => med._id !== id));
        } catch (err) {
            console.error("Error deleting medicine:", err);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>📋 My Medicine Tracker</h2>
            <button
                onClick={() => navigate("/add-medicine")}
                style={{ padding: "10px 20px", marginBottom: "20px", backgroundColor: "#28a745", color: "white" }}
            >
                ➕ Add Medicine
            </button>
            {medicines.length === 0 ? (
                <p>No medicines added yet.</p>
            ) : (
                <ul>
                    {medicines.map((med) => (
                        <li key={med._id} style={{ padding: "10px", backgroundColor: "#007bff", margin: "10px" }}>
                            <strong>{med.name}</strong> - {med.dosage} - {med.frequency}
                            <button onClick={() => navigate(`/edit-medicine/${med._id}`)}>✏️ Edit</button>
                            <button onClick={() => handleDelete(med._id)} style={{ backgroundColor: "red", color: "white" }}>🗑️ Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
