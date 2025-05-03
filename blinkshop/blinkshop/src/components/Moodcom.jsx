import React from "react";
import { useDashboard } from "./dashboardforadmin/DashboardContext";

const moods = [
  { emoji: '😭', label: "Crampy Cutie", bg: "#fddde6" },
  { emoji: '\ud83d\udc94', label: "Broken-Hearted", bg: "#e3dcfb" },
  { emoji: "\ud83d\udcbc", label: "Hustling Hottie", bg: "#dcf3fa" },
  { emoji: "🥺", label: "Lonely Girl", bg: "#dcf5ec" },
  { emoji: "😳", label: "Shy Queen", bg: "#e3dcfb" },
  { emoji: "😴", label: "Sleepy Sadie", bg: "#fddde6" },
  {label:"Just Window Shopping",bg: "#dcf5ec"}
];

const Moodcom = () => {
    const {moodmsgs}=useDashboard()
    return (
        <div 
        style={{display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height:"800px"
        }}>
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "1.5rem",
          borderRadius: "1rem",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
         
          fontFamily: "'Baloo 2', cursive",
          fontWeight:"bolder",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            color: "rgba(255, 1, 1, .3)",
            fontWeight:"bolder",
            marginBottom: "0.5rem",
            lineHeight: "1.4",
          }}
        >
          Hey Pookie,<br /> how’s your heart today?
        </h2>
        <p
          style={{
            color: "rgba(1, 5, 255, 0.5)",
            fontSize: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          Pick your vibe, we’ve got a little magic for you!
        </p>
  
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.7rem",
          }}
        >
          {moodmsgs?.returns?.map((mood, index) => (
           
           <button
              key={mood._id}
              style={{
                backgroundColor: mood.moodcolor,
                border: "none",
                borderRadius: "1.5rem",
                padding: "0.8rem 1.2rem",
                fontSize: "0.9rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                cursor: "pointer",
                flex: "1 1 40%",
                justifyContent: "center",
                minWidth: "140px",
                color: "#374151",
              }}
            >
              <span>{mood.moodemoji}</span>
              {mood.moodtype}
            </button>
          ))}
        </div>
  
        <button
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#FEE4E2",
            border: "none",
            borderRadius: "2rem",
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#4B5563",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Select & Shine ✨
        </button>
      </div>
      </div>
    );
  };
  
  export default Moodcom;