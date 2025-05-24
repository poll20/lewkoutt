// src/components/GlobalLoader.js
import React from "react";
import { useLoading } from "./LoadingContext";
import loading from "./image/loadingg-unscreen.gif"

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  // if (!isLoading) return null;
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
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<div className="h-16 w-16 bg-black text-white text-center flex items-center justify-center rounded-full">
  <video autoPlay loop muted playsInline  preload="auto" style={{width:"180px",height:"180px",marginLeft:"10px",border:"2px solid red"}}>
    <source src={loading} type="video/mp4"  />
  </video>
</div>
    </div>
  );
};

export default GlobalLoader;
