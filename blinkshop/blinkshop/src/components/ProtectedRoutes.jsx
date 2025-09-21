import React from "react";
import { Navigate } from "react-router-dom";
import { useBio } from "./BioContext";
import { useFirebaseAuth } from "./FirebaseContext";


export default function ProtectedRoutes({ children }) {
  const { userDetails,user } = useFirebaseAuth();
console.log("userdetails in protec", userDetails,user);
  if (!userDetails) {
    // agar login hi nahi hai to login page bhej do
    return <Navigate to="/" replace />;
  }

  if (userDetails?.role !== "admin") {
    // agar role admin nahi hai to homepage bhej do
    return <Navigate to="/" replace />;
  }

  // role admin hai to route allow karo
  return children;
}
