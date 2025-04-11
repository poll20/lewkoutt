// src/components/GlobalLoader.js
import React from "react";
import { useLoading } from "../context/LoadingContext";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

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
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
    </div>
  );
};

export default GlobalLoader;
