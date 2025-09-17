import React from "react";
import { Navigate } from "react-router-dom";
import { useBio } from "./BioContext";


export default function ProtectedRoutes({ children }) {
  const { userdetails } = useBio();

  if (!userdetails) {
    // agar login hi nahi hai to login page bhej do
    return <Navigate to="/" replace />;
  }

  if (userdetails.role !== "admin") {
    // agar role admin nahi hai to homepage bhej do
    return <Navigate to="/" replace />;
  }

  // role admin hai to route allow karo
  return children;
}
