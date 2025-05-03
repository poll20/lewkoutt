import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";

const MoodMsgType = () => {
  const [moodemoji, setMoodemoji] = useState("");
  const [moodcolor, setMoodcolor] = useState("");
  const [moodtype, setMoodType] = useState("");
  const [msgWithOffer, setMsgWithOffer] = useState("");
  const [msgWithoutOffer, setMsgWithoutOffer] = useState("");
  const{moodmsg}=useDashboard()
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      moodemoji,
      moodcolor,
      moodtype,
      msgwithoffer: msgWithOffer,
      msgwithoutoffer: msgWithoutOffer,
    };

    console.log("Mood Message Data:", data);
    // API call yahan likhna (e.g., axios.post("/api/moodmsg", data))
    setTimeout(()=>{
      moodmsg(data)
    },200)
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "1.5rem",
        background: "#f9f9f9",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#4F46E5", marginBottom: "1rem" }}>
        Add Mood Message
      </h2>

      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
        Mood emoji:
      </label>
      <input
        type="text"
        value={moodemoji}
        onChange={(e) => setMoodemoji(e.target.value)}
        placeholder="e.g. sleepy, sad"
        required
        style={{
          width: "100%",
          padding: "0.6rem",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
      />
       <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
        Mood color:
      </label>
      <input
        type="text"
        value={moodcolor}
        onChange={(e) => setMoodcolor(e.target.value)}
        placeholder="e.g. sleepy, sad"
        required
        style={{
          width: "100%",
          padding: "0.6rem",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
      />

      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
        Mood Type:
      </label>
      <input
        type="text"
        value={moodtype}
        onChange={(e) => setMoodType(e.target.value)}
        placeholder="e.g. sleepy, sad"
        required
        style={{
          width: "100%",
          padding: "0.6rem",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
        }}
      />


      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
        Message With Offer:
      </label>
      <textarea
        value={msgWithOffer}
        onChange={(e) => setMsgWithOffer(e.target.value)}
        rows={8}
        
        required
        style={{
          width: "100%",
          padding: "0.6rem",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
        Message Without Offer:
      </label>
      <textarea
        value={msgWithoutOffer}
        onChange={(e) => setMsgWithoutOffer(e.target.value)}
        rows={8}
        required
        style={{
          width: "100%",
          padding: "0.6rem",
          marginBottom: "1.5rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.8rem",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
          borderRadius: "0.6rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Save Message
      </button>
    </form>
  );
};

export default MoodMsgType;
