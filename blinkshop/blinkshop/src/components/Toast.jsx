// Toast.js
import React, { useEffect } from 'react';
// import { CheckCircle } from 'lucide-react'; // or use any check icon

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md flex items-center gap-2 animate-slideUp">
      {/* <CheckCircle className="w-5 h-5" /> */}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Toast;
