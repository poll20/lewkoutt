// import React, { useEffect, useState } from 'react';

// const SlideUpModal = ({ show, onClose, children }) => {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     if (show) {
//       // trigger animation after short delay
//       setTimeout(() => setAnimate(true), 30);
//     } else {
//       setAnimate(false);
//     }
//   }, [show]);

//   if (!show) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           height: '100vh',
//           width: '100%',
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           zIndex: 998
//         }}
//       />

//       {/* Slide-up Container */}
//       <div style={{
        
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         width: '100%',
//         height: '75vh',
//         backgroundColor: '#fff',
//         borderTopLeftRadius: '20px',
//         borderTopRightRadius: '20px',
//         boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
//         transform: animate ? 'translateY(0)' : 'translateY(100%)',
//         transition: 'transform 0.3s ease-in-out',
//         zIndex: 999,
//         overflowY: 'auto',
//       }}>
//         {children}
//       </div>
//     </>
//   );
// };

// export default SlideUpModal;



import React, { useEffect, useState } from "react";
import { useBio } from "./BioContext";

const SlideUpToast = ({ onClose, coupon, totalDiscountPrice }) => {
  const { karocode, setkarocode } = useBio();

  const [visible, setVisible] = useState(false);
  const [appliedCode, setAppliedCode] = useState(() => karocode || "");

  // Show toast when mounted
  useEffect(() => {
    setVisible(true);

    // Auto select first valid coupon if none applied
    if (!appliedCode) {
      const validFirst = coupon.find(c => totalDiscountPrice >= c.minOrderAmount);
      if (validFirst) setAppliedCode(validFirst.code);
    }
  }, [coupon, totalDiscountPrice]);

  const calculateDiscount = (c) => {
    if (!c) return 0;
    if (c.discountType === "Percentage") return Math.round((totalDiscountPrice * c.discountValue) / 100);
    return c.discountValue;
  };

  const isValidCoupon = (c) => {
    return totalDiscountPrice >= c.minOrderAmount;
  };

  // Apply coupon button click
  const handleApply = () => {
    const selected = coupon.find(c => c.code === appliedCode);
    if (selected && isValidCoupon(selected)) {
      setkarocode(appliedCode);
      localStorage.setItem("firstcpn", JSON.stringify(selected));
      localStorage.setItem("amountafteraddcoupon", JSON.stringify(calculateDiscount(selected)));
      setVisible(false);
      setTimeout(onClose, 300);
    }
  };

  // Remove coupon
  const handleRemove = () => {
    setAppliedCode("");
    setkarocode("");
    localStorage.removeItem("firstcpn");
    localStorage.removeItem("amountafteraddcoupon");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: visible ? "0" : "-600px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "bottom 0.5s ease",
        zIndex: 9999,
        width: "100%",
        fontFamily: "sans-serif",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      {/* Close Button */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        ×
      </div>

      {/* Coupon Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={appliedCode}
          onChange={(e) => setAppliedCode(e.target.value.toUpperCase())} // live sync input
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontWeight: "lighter",
          }}
        />
        <button
          onClick={handleApply}
          style={{
            padding: "5px 10px",
            backgroundColor: "#fff",
            border: "1px solid green",
            color: "green",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
        {appliedCode && (
          <button
            onClick={handleRemove}
            style={{
              padding: "5px 10px",
              backgroundColor: "#fff",
              border: "1px solid red",
              color: "red",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Applied Coupon Info */}
      {appliedCode && (
        <>
          <div style={{ textAlign: "center", fontSize: "18px", color: "green", fontWeight: "bold" }}>
            YAY! You saved ₹{calculateDiscount(coupon.find(c => c.code === appliedCode))}
          </div>
          <div style={{ textAlign: "center", marginBottom: "10px", color: "#666", fontSize: "14px" }}>
            Your coupon is successfully applied
          </div>
        </>
      )}

      {/* Coupons List */}
      <div style={{ marginTop: "10px" }}>
        {coupon.map((c) => {
          const valid = isValidCoupon(c);
          const discount = calculateDiscount(c);
          const isApplied = appliedCode === c.code;
          const moreNeeded = c.minOrderAmount - totalDiscountPrice;

          return (
            <div key={c._id} style={{ borderTop: "1px dashed #ccc", padding: "12px 0", opacity: valid ? 1 : 0.6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>{c.code}</span>
                <span
                  onClick={() => {
                    if (isApplied) handleRemove();
                    else if (valid) setAppliedCode(c.code);
                  }}
                  style={{
                    color: isApplied ? "red" : "#1a73e8",
                    cursor: valid ? "pointer" : "not-allowed",
                    fontWeight: "500",
                  }}
                >
                  {isApplied ? "Remove" : "Apply"}
                </span>
              </div>
              <div style={{ fontSize: "14px", color: valid ? "green" : "red", marginTop: "4px" }}>
                {valid ? `Save ₹${discount} on this order` : `Add ₹${moreNeeded} more to avail this coupon`}
              </div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                {valid ? `Get ${c.discountValue}${c.discountType === "Percentage" ? "%" : "₹"} off upto ₹100` : ""}
              </div>
              <div style={{ fontSize: "13px", color: "#444", textDecoration: "underline", marginTop: "4px" }}>
                Know more
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideUpToast;
