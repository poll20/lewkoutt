import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDashboard } from "./DashboardContext";

export default function SlotControl() {
//   const [slots, setSlots] = useState([]);
  const{slots,toggleSlot,fetchSlots}=useDashboard()
//   const apiUrl = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   const fetchSlots = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/slots`);
//       setSlots(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching slots:", err);
//     }
//   };

//   const toggleSlot = async (label) => {
//     try {
//       await axios.post(`${apiUrl}/slot-status/toggle`, { label });
//       fetchSlots(); // Refresh list
//     } catch (err) {
//       console.error("❌ Error toggling slot:", err);
//     }
//   };
useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠 Admin Slot Control</h2>

      {slots?.map((slot, index) => (
        <div key={index} style={styles.slotItem}>
          <span
            style={{
              ...styles.slotLabel,
              color: slot.disabled ? "#dc2626" : "#15803d", // red or green
            }}
          >
            {slot.label}
          </span>
          <button
            onClick={() => toggleSlot(slot.label)}
            style={{
              ...styles.button,
              backgroundColor: slot.disabled ? "#16a34a" : "#dc2626",
            }}
          >
            {slot.disabled ? "Enable" : "Disable"}
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  slotItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  slotLabel: {
    fontSize: "16px",
    fontWeight: "500",
  },
  button: {
    padding: "6px 14px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
