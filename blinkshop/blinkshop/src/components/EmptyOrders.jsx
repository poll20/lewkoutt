import React from "react";

const EmptyOrders = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Lottie animation */}
      <iframe
        src="https://lottie.host/embed/9df8148f-ea96-4c19-9648-57ee926726d6/LBV9Fr8PKh.lottie"
        style={{
          width: "180px",
          height: "180px",
          border: "none",
          marginBottom: "20px",
        }}
        title="No Orders Animation"
      ></iframe>

      {/* Text */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#000",
          marginBottom: "8px",
        }}
      >
        No Order Yet
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "#777",
          marginBottom: "40px",
        }}
      >
        Come to the other side, it's beautiful here!
      </p>

      {/* Button */}
     

    </div>
  );
};

export default EmptyOrders;
