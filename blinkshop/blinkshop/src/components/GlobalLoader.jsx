// src/components/GlobalLoader.js
import React from "react";
import { useLoading } from "./LoadingContext";


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
<div className="h-16 w-16 bg-black text-white text-center flex items-center justify-center rounded-full">
  Loading...
</div>
    </div>
  );
};

export default GlobalLoader;
