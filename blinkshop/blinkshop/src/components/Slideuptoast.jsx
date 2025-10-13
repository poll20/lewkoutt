
import React, { useEffect, useState } from "react";
import { useBio } from "./BioContext";

const  SlideUpToast = ({ onClose, coupon, totalDiscountPrice }) => {
  const [visible, setVisible] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  console.log("appcd",appliedCode)
const {setkarocode}=useBio()
  useEffect(() => {
    setVisible(true);
    const validFirst = coupon.find(
      (c) => totalDiscountPrice >= c.minOrderAmount
    );
    if (validFirst) {
      setAppliedCode(validFirst.code);
    }
  }, [coupon, totalDiscountPrice]);

  const calculateDiscount = (coupon) => {
    if (coupon.discountType === "Percentage") {
      return Math.round((totalDiscountPrice * coupon.discountValue) / 100);
    }
    return coupon.discountValue;
  };

  const isValidCoupon = (coupon) => {
    return totalDiscountPrice >= coupon.minOrderAmount;
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

      {/* Top Applied Input + Remove */}
      {/* {appliedCode && ( */}
        <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: "10px", marginBottom: "16px" }}>
          <input
            type="text" 
            placeholder="Enter Coupon Code"
            value={appliedCode}
            onChange={(e)=>{setAppliedCode(e.value)}}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontWeight: "lighter",
              
            }}
          />
          <button
            
            onClick={()=>{setkarocode(appliedCode),setTimeout(()=>{
               
          setVisible(false);
          setTimeout(onClose, 300);
    
            },100)}}
            style={{
              padding: "5px 5px",
              backgroundColor: "#fff",
              border: "none",
              color: "green",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      {/* )} */}

      {/* Coupon Applied Message */}
      {appliedCode && (
        <>
          <div style={{ textAlign: "center", fontSize: "18px", color: "green", fontWeight: "bold" }}>
            YAY! You saved ₹
            {
              calculateDiscount(
                coupon.find((c) => c.code === appliedCode)
              )
            }
          </div>
          <div style={{ textAlign: "center", marginBottom: "10px", color: "#666", fontSize: "14px" }}>
            your coupon is successfully applied
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
            <div
              key={c._id}
              style={{
                borderTop: "1px dashed #ccc",
                padding: "12px 0",
                opacity: valid ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{c.code}</span>
                {/* <span
                  onClick={() => {
                    if (isApplied) {
                      // setkarocode("")
                      setAppliedCode("");
                      
                    } else if (valid) {
                    // setkarocode(c.code)
                      setAppliedCode(c.code);

                      
                    }
                  }}
                  style={{
                    color: isApplied ? "red" : "#1a73e8",
                    cursor: valid ? "pointer" : "not-allowed",
                    fontWeight: "500",
                  }}
                >
                  {isApplied ? "Remove" : "Apply"}
                </span> */}
                <span
  onClick={() => {
    if (isApplied) {
      setAppliedCode("");
      setkarocode(""); // ✅ Remove from BioContext
      localStorage.removeItem("firstcpn");
      localStorage.removeItem("amountafteraddcoupon");
    } else if (valid) {
      setAppliedCode(c.code);
      setkarocode(c.code);
    }
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

              <div
                style={{
                  fontSize: "14px",
                  color: valid ? "green" : "red",
                  marginTop: "4px",
                }}
              >
                {valid
                  ? `Save ₹${discount} on this order`
                  : `Add ₹${moreNeeded} more to avail this coupon`}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "4px",
                }}
              >
                {valid
                  ? `Get ${c.discountValue}${c.discountType === "Percentage" ? "%" : "₹"} off upto ₹100`
                  : ""}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#444",
                  textDecoration: "underline",
                  marginTop: "4px",
                }}
              >
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
