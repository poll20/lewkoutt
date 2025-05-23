// src/components/GlobalLoader.js
import React from "react";
import { useLoading } from "./LoadingContext";
import loading from "./image/loadingg.mp4"

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  console.log("GlobalLoader mounted. isLoading:", isLoading);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
 <video autoPlay loop muted playsInline  preload="auto" >
   <source src={loading} type="video/mp4"  />
 </video>
    </div>
  );
};

export default GlobalLoader;
