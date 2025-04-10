// components/PopupNotification.jsx
import React, { useEffect } from 'react';
import './PopupNotification.css';

const PopUpNotificationss = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Hide after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-notification">
      {message}
    </div>
  );
};

export default PopUpNotificationss;
