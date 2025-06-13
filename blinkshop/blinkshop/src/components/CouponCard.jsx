// import React, { useEffect, useState } from "react";

// const CouponCard = ({ coupon,prdrate }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   const [copied, setCopied] = useState(false);

 
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 480);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const {
//     code,
//     discountType,
//     discountValue,
//     minOrderAmount,
//     usageLimit,
//     usageLimitPerUser,
//     startDate,
//     expiryDate,
//     couponType,
//     isActive,
//     description,
//     userGender,
//     categories,
//     productNames,
//     freeShipping,
//   } = coupon;
//    const handleCopy = () => {
//     navigator.clipboard.writeText(coupon.code);
//     setCopied(true);

//     // "Copied" text 2 seconds ke baad chhupa dena
//     setTimeout(() => setCopied(false), 2000);
//   }

//   const containerStyle = {
//     border: isActive ? "1px solid gray" : "2px dashed #dc3545",
//     // borderRadius: "16px",
//     padding: isMobile ? "12px" : "20px",
//     margin: "6px auto",
//     background: "#fff",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     width: isMobile ? "300px" : "420px",
//     // height:"90px",
//     position: "relative",
//     fontFamily: "sans-serif",
//     fontWeight:"bold",
//     transition: "all 0.3s ease-in-out",
//     marginTop:"20px"
    
//   };

//   const header = {
//     fontSize: isMobile ? "12px" : "20px",
//     fontWeight: "bold",
//     border:"1px dashed black",
//     width:"200px",
//     color: "#333",
//     marginBottom: "-5px",
    
//   };

//   const line = {
//     fontSize: isMobile ? "13px" : "15px",
//     color: "#555",
//     marginBottom: "1px",
    
//   };

//   const badgeStyle = {
//     position: "absolute",
//     top: "-12px",
//     left: "10px",
//     background: "#d63384",
//     color: "#fff",
//     padding: "2px 5px",
//     borderRadius: "0 8px 8px 0",
//     fontSize: "12px",
//     fontWeight: "bold",
    
//   };

//   const bottomInfo = {
//     fontSize: isMobile ? "11px" : "13px",
//     color: "#888",
//     marginTop: "2px",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={badgeStyle}>{couponType || "Coupon"}</div>
      
//  <div style={line}>
//         🎉 {discountType === "Percentage"
//           ? <span style={{color:"green"}}>Get this for INR {prdrate-(prdrate * discountValue/100)}</span>
//           : `Flat ₹${discountValue} OFF`}
//       </div>

//  {coupon.description && <div style={line}>📌 {coupon.description}</div>}

//   {!coupon.minOrderAmount==0 && <div style={line}>Minimum Order: ₹{coupon.minOrderAmount}</div>}

//    {coupon.freeShipping && <div style={line}>🚚 Free Shipping Included</div>}

//       {/* <div style={header}>Use Code: <span style={{ color: "#d63384" }}>{coupon.code}</span></div> */}
// <div style={header}>
//       Use Code:{" "}
//       <span
//         onClick={handleCopy}
//         style={{
//           color: "#d63384",
          
//           cursor: "pointer",
//           textDecoration: "underline",
//           position: "relative",
//         }}
//         title="Click to copy"
//       >
//         {coupon.code}
//         {copied && (
//           <span
//             style={{
//               position: "absolute",
//             //   border:"1px solid black",
//               top:"0",
//               left: "50px",
//               fontSize: "10px",
//               color: "green",
//             //   backgroundColor: "#fff",
//               padding: "2px 4px",
//               borderRadius: "4px",
//               boxShadow: "0 0 2px rgba(0,0,0,0.2)",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Copied
//           </span>
//         )}
//       </span>
//     </div>
     

//       {/* <div style={line}>Minimum Order: ₹{coupon.minOrderAmount || 0}</div> */}

//       {/* <div style={line}>Usage Limit: {usageLimit || "∞"} | Per User: {usageLimitPerUser || "∞"}</div> */}

     

//       {/* {categories?.length > 0 && (
//         <div style={line}>Categories: {categories.join(", ")}</div>
//       )}

//       {productNames?.length > 0 && (
//         <div style={line}>Products: {productNames.join(", ")}</div>
//       )}

//       {userGender && (
//         <div style={line}>Gender: {userGender}</div>
//       )} */}

//       {/* {coupon.description && <div style={line}>📌 {coupon.description}</div>} */}

//       {/* <div style={bottomInfo}>
//         🗓 Valid From: {new Date(coupon.startDate).toLocaleDateString()} —{" "}
//         {new Date(coupon.expiryDate).toLocaleDateString()}
//       </div> */}

//       {/* <div style={{ ...bottomInfo, color: isActive ? "#28a745" : "#dc3545", fontWeight: "bold" }}>
//         {coupon.isActive ? "🟢 Active" : "🔴 Inactive"}
//       </div> */}
//     </div>
//   );
// };

// export default CouponCard;

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
      <div style={offerTextStyle}>
        Get This For INR {(prdrate - (prdrate * coupon.discountValue) / 100).toFixed(2)}
      </div>
      <div style={subTextStyle}>
        Flat {coupon.discountValue}% Off On Your First Purchase
      </div>

       <div style={codeContainer}>
        {coupon.code}
        <span onClick={handleCopy} style={copyBtnStyle}>
          {copied ? "Copied" : "Copy"}
        </span>
      </div>
    </div>
  );
};

export default CouponCard;
