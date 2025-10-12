import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa"; // 🏷️ icon

const CouponCard = ({ coupon, prdrate }) => {
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

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerStyle = {
    width: isMobile ? "300px" : "350px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "16px",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const iconStyle = {
    position: "absolute",
    top: "12px",
    left: "12px",
    fontSize: "16px",
    color: "#000",
  };

  const offerTextStyle = {
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "bold",
    color: "#000",
    marginLeft: "24px", // spacing from icon
  };

  const subTextStyle = {
    fontSize: "13px",
    color: "#777",
    margin: "4px 0 12px 24px",
  };

  const codeContainer = {
    border: "1px dashed #aaa",
    padding: "8px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "10px",
  };

  const copyBtnStyle = {
    cursor: "pointer",
    color: "#000",
    fontWeight: "500",
    fontSize: "14px",
    position: "relative",
  };

  const copiedStyle = {
    position: "absolute",
    top: "-20px",
    right: "0",
    fontSize: "10px",
    color: "green",
  };

  return (
    <div style={containerStyle}>
      <FaTag style={iconStyle} />
      {/* <div style={offerTextStyle}>
        Get This For INR <span style={{color:"green"}}>{prdrate - coupon.discountValue}</span>
        Get This For INR <span style={{color:"green"}}>{(prdrate - (prdrate * coupon.discountValue) / 100).toFixed(2)}</span>

      </div> */}
      <div style={offerTextStyle}>
  Get This For INR{" "}
  <span style={{ color: "green",fontWeight:"bold" }}>
    {coupon?.discountType === "fixed"
      ? prdrate - coupon?.discountValue
      : (prdrate - (prdrate * coupon?.discountValue) / 100).toFixed(0)}
  </span>
</div>

      <div style={subTextStyle}>
        Flat {coupon?.discountValue}% Off On Your Purchase
      </div>

       <div style={codeContainer}>
        {coupon?.code}
        <span onClick={handleCopy} style={copyBtnStyle}>
          {copied ? "Copied" : "Copy"}
        </span>
      </div>
    </div>
  );
};

export default CouponCard;
