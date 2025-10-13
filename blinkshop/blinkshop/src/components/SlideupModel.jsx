import React, { useEffect, useState } from 'react';

const SlideUpModal = ({ show, onClose, children }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      // trigger animation after short delay
      setTimeout(() => setAnimate(true), 30);
    } else {
      setAnimate(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 998
        }}
      />

      {/* Slide-up Container */}
      <div style={{
        
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '75vh',
        backgroundColor: '#fff',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        transform: animate ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 999,
        overflowY: 'auto',
      }}>
        {children}
      </div>
    </>
  );
};

export default SlideUpModal;
