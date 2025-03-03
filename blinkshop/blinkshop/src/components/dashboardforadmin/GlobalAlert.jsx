import React, { useEffect, useState } from "react";

export default function GlobalAlert() {
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const showAlert = () => {
      const message = localStorage.getItem("lowStockAlert");
      if (message) {
        setAlertMessage(message);
        setTimeout(() => {
          localStorage.removeItem("lowStockAlert");
          setAlertMessage(""); // ✅ Alert remove ho jayega
        }, 5000);
      }
    };

    window.addEventListener("lowStockAlertEvent", showAlert);

    return () => {
      window.removeEventListener("lowStockAlertEvent", showAlert);
    };
  }, []);

  return (
    alertMessage && (
      <div className="global-alert">
        {alertMessage}
      </div>
    )
  );
}
