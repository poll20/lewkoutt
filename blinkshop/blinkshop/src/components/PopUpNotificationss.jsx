// // components/PopupNotification.jsx
// import React, { useEffect } from 'react';
// import './Popupnotification.css';

// const PopUpNotificationss = ({ message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose(); // Hide after 2 seconds
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="popup-notification">
//       {message}
//     </div>
//   );
// };

// export default PopUpNotificationss;
// components/PopupNotification.jsx
import React, { useEffect } from "react";

const PopUpNotificationss = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        maxWidth: "90%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",

        padding: "14px 18px",
        backgroundColor: "black",
        color: "#fff",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: "500",

        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // 👈 exact center
        zIndex: 9999,

        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      }}
    >
      {message}
    </div>
  );
};

export default PopUpNotificationss;
