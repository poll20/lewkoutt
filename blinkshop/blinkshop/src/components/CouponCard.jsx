import React, { useEffect, useState } from "react";

const CouponCard = ({ coupon,prdrate }) => {
  const [isMobile, setIsMobile] = useState(false);

  const [copied, setCopied] = useState(false);

 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    code,
    discountType,
    discountValue,
    minOrderAmount,
    usageLimit,
    usageLimitPerUser,
    startDate,
    expiryDate,
    couponType,
    isActive,
    description,
    userGender,
    categories,
    productNames,
    freeShipping,
  } = coupon;
   const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);

    // "Copied" text 2 seconds ke baad chhupa dena
    setTimeout(() => setCopied(false), 2000);
  }

  const containerStyle = {
    border: isActive ? "2px dashed black" : "2px dashed #dc3545",
    // borderRadius: "16px",
    padding: isMobile ? "12px" : "20px",
    margin: "6px auto",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: isMobile ? "300px" : "420px",
    // height:"90px",
    position: "relative",
    fontFamily: "sans-serif",
    fontWeight:"bold",
    transition: "all 0.3s ease-in-out",
    marginTop:"20px"
    
  };

  const header = {
    fontSize: isMobile ? "12px" : "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "2px",
    
  };

  const line = {
    fontSize: isMobile ? "13px" : "15px",
    color: "#555",
    marginBottom: "1px",
    
  };

  const badgeStyle = {
    position: "absolute",
    top: "-12px",
    left: "10px",
    background: "#d63384",
    color: "#fff",
    padding: "2px 5px",
    borderRadius: "0 8px 8px 0",
    fontSize: "12px",
    fontWeight: "bold",
    
  };

  const bottomInfo = {
    fontSize: isMobile ? "11px" : "13px",
    color: "#888",
    marginTop: "2px",
  };

  return (
    <div style={containerStyle}>
      <div style={badgeStyle}>{couponType || "Coupon"}</div>
      
 <div style={line}>
        🎉 {discountType === "Percentage"
          ? <span style={{color:"green"}}>Get this for INR {prdrate-(prdrate * discountValue/100)}</span>
          : `Flat ₹${discountValue} OFF`}
      </div>

 {coupon.description && <div style={line}>📌 {coupon.description}</div>}

  {!coupon.minOrderAmount==0 && <div style={line}>Minimum Order: ₹{coupon.minOrderAmount}</div>}

   {coupon.freeShipping && <div style={line}>🚚 Free Shipping Included</div>}

      {/* <div style={header}>Use Code: <span style={{ color: "#d63384" }}>{coupon.code}</span></div> */}
<div style={header}>
      Use Code:{" "}
      <span
        onClick={handleCopy}
        style={{
          color: "#d63384",
          cursor: "pointer",
          textDecoration: "underline",
          position: "relative",
        }}
        title="Click to copy"
      >
        {coupon.code}
        {copied && (
          <span
            style={{
              position: "absolute",
              top:"0",
              left: "50px",
              fontSize: "10px",
              color: "green",
              backgroundColor: "#fff",
              padding: "2px 4px",
              borderRadius: "4px",
              boxShadow: "0 0 2px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            Copied
          </span>
        )}
      </span>
    </div>
     

      {/* <div style={line}>Minimum Order: ₹{coupon.minOrderAmount || 0}</div> */}

      {/* <div style={line}>Usage Limit: {usageLimit || "∞"} | Per User: {usageLimitPerUser || "∞"}</div> */}

     

      {/* {categories?.length > 0 && (
        <div style={line}>Categories: {categories.join(", ")}</div>
      )}

      {productNames?.length > 0 && (
        <div style={line}>Products: {productNames.join(", ")}</div>
      )}

      {userGender && (
        <div style={line}>Gender: {userGender}</div>
      )} */}

      {/* {coupon.description && <div style={line}>📌 {coupon.description}</div>} */}

      {/* <div style={bottomInfo}>
        🗓 Valid From: {new Date(coupon.startDate).toLocaleDateString()} —{" "}
        {new Date(coupon.expiryDate).toLocaleDateString()}
      </div> */}

      {/* <div style={{ ...bottomInfo, color: isActive ? "#28a745" : "#dc3545", fontWeight: "bold" }}>
        {coupon.isActive ? "🟢 Active" : "🔴 Inactive"}
      </div> */}
    </div>
  );
};

export default CouponCard;
