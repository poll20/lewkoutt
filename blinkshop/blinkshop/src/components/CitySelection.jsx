import React, { useState } from "react";

export default function CitySelection() {
  const [selected, setSelected] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f9f9f9, #e3f2fd)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Select Your City
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Jaipur Option */}
          <button
            onClick={() => setSelected("jaipur")}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "2px solid",
              borderColor: selected === "jaipur" ? "#1976d2" : "#ccc",
              backgroundColor: selected === "jaipur" ? "#e3f2fd" : "#fff",
              color: selected === "jaipur" ? "#1976d2" : "#333",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "0.3s",
            }}
          >
            Jaipur
          </button>

          {/* Others Option */}
          <button
            onClick={() => setSelected("others")}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "2px solid",
              borderColor: selected === "others" ? "#1976d2" : "#ccc",
              backgroundColor: selected === "others" ? "#e3f2fd" : "#fff",
              color: selected === "others" ? "#1976d2" : "#333",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "0.3s",
            }}
          >
            Others
          </button>
        </div>

        {/* Show selected city */}
        {selected && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "1rem",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Selected: {selected.charAt(0).toUpperCase() + selected.slice(1)}
          </p>
        )}
      </div>
    </div>
  );
}
