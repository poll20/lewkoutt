// import React, { useEffect, useState } from "react";

// const SlideUpCouponToast = ({ onClose,coupon ,firstcpns,totalDiscountPrice}) => {
//   const [visible, setVisible] = useState(false);
//   const [couponCode, setCouponCode] = useState(firstcpns.code);
//   const [applied, setApplied] = useState(true); // default applied

//   const allCoupons = [
//     {
//       code: "FIRST10",
//       isValid: true,
//       discountText: "Save ₹89 on this order",
//       note: "Get 10% off upto ₹100",
//     },
//     {
//       code: "NM20",
//       isValid: false,
//       discountText: "Save ₹179 on this order",
//       note: "Add ₹100 more to avail this coupon",
//     },
//     {
//       code: "EXTRA250",
//       isValid: false,
//       discountText: "Save ₹250 on this order",
//       note: "Add ₹1591 more to avail this coupon",
//     },
//   ];

//   useEffect(() => {
//     setTimeout(() => setVisible(true), 100);
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: visible ? "0" : "-100%",
//         left: "50%",
//         transform: "translateX(-50%)",
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "16px 16px 0 0",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//         transition: "bottom 0.5s ease",
//         zIndex: 9999,
//         width: "100%",
//         fontFamily: "sans-serif",
//         maxHeight: "90vh",
//         overflowY: "auto",
//       }}
//     >
//       {/* Close Button */}
//       <div
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "12px",
//           fontSize: "18px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//         onClick={() => {
//           setVisible(false);
//           setTimeout(onClose, 300);
//         }}
//       >
//         ×
//       </div>

//       {/* Header Text */}
//       <div style={{ fontSize: "40px", textAlign: "center", marginBottom: 5 }}>
//         🟢
//       </div>
//       <div style={{ textAlign: "center", fontWeight: 500 }}>'FIRST10' Applied</div>
//       <div
//         style={{
//           textAlign: "center",
//           fontWeight: "bold",
//           fontSize: "20px",
//           marginTop: "8px",
//         }}
//       >
//         YAY! You saved ₹89
//       </div>
//       <div
//         style={{
//           textAlign: "center",
//           fontSize: "14px",
//           color: "#555",
//           marginTop: "4px",
//         }}
//       >
//         your coupon is successfully applied
//       </div>
//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         <a href="#" style={{ textDecoration: "underline", color: "#1a73e8" }}>
//           okay, got it
//         </a>
//       </div>

//       {/* Input Box */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "10px",
//           marginTop: "20px",
//           padding: "10px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <input
//           type="text"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           style={{
//             flex: 1,
//             border: "none",
//             outline: "none",
//             fontSize: "14px",
//           }}
//           placeholder="Enter coupon code"
//         />

//         <span
//   onClick={() => {
//     if (applied) {
//       setApplied(false);
//       setTimeout(() => {
//         setCouponCode("");
//       }, 100);
//     } else if (couponCode.trim() !== "") {
//       setApplied(true);
//     }
//   }}
//   style={{
//     color: applied ? "red" : "#1a73e8",
//     cursor: "pointer",
//     fontWeight: "bold",
//     marginLeft: "10px",
//   }}
// >
//   {applied ? "Remove" : "Apply"}
// </span>
//       </div>

//       {/* Feedback */}
//       {applied && (
//         <div style={{ color: "green", fontSize: "13px", marginTop: "4px" }}>
//           YAY! You saved ₹89
//         </div>
//       )}

//       {/* Coupon List */}
//       <div style={{ marginTop: "20px" }}>
//         {coupon.map((coupon, index) => (
//           <div
//             key={index}
//             style={{
//               borderTop: "1px solid #eee",
//               padding: "12px 0",
//               opacity: coupon.isValid ? 1 : 0.6,
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <span style={{ fontWeight: "bold" }}>{coupon.code}</span>
//               <span
//                 style={{
//                   color: coupon.isValid ? "#00b386" : "#888",
//                   cursor: "pointer",
//                   fontWeight: "500",
//                 }}
//               >
//                 {coupon.isValid ? "Remove" : "Apply"}
//               </span>
//             </div>
//             <div
//               style={{
//                 color: coupon.isValid ? "green" : "red",
//                 fontSize: "14px",
//                 marginTop: "4px",
//               }}
//             >
//               {coupon.discountValue}
//             </div>
//             <div style={{ color: "#777", fontSize: "13px", marginTop: "2px" }}>
//               {coupon.note}
//             </div>
//             <div
//               style={{
//                 fontSize: "13px",
//                 color: "#444",
//                 textDecoration: "underline",
//                 marginTop: "4px",
//               }}
//             >
//               Know more
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SlideUpCouponToast;
// import React, { useEffect, useState } from "react";

// const SlideUpCouponToast = ({ onClose, coupon, totalDiscountPrice }) => {
//     console.log("dp",totalDiscountPrice)
//   const [visible, setVisible] = useState(false);
//   const [appliedCode, setAppliedCode] = useState("");

//   useEffect(() => {
//     setVisible(true);
//     // Auto apply first valid coupon
//     const validFirst = coupon.find(
//       (c) => totalDiscountPrice >= c.minOrderAmount
//     );
//     if (validFirst) {
//       setAppliedCode(validFirst.code);
//     }
//   }, [coupon, totalDiscountPrice]);

//   const calculateDiscount = (coupon) => {
//     if (coupon.discountType === "Percentage") {
//       return Math.round((totalDiscountPrice * coupon.discountValue) / 100);
//     }
//     return coupon.discountValue;
//   };

//   const isValidCoupon = (coupon) => {
//     return totalDiscountPrice >= coupon.minOrderAmount;
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: visible ? "0" : "-600px",
//         left: "50%",
//         transform: "translateX(-50%)",
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "16px",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//         transition: "bottom 0.5s ease",
//         zIndex: 9999,
//         width: "100%",
//         fontFamily: "sans-serif",
//         maxHeight: "90vh",
//         overflowY: "auto",
//       }}
//     >
//       {/* Close Button */}
//       <div
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "12px",
//           fontSize: "18px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//         onClick={() => {
//           setVisible(false);
//           setTimeout(onClose, 300);
//         }}
//       >
//         ×
//       </div>

//       {/* Header Text */}
//       {appliedCode && (
//         <>
//           <div style={{ fontSize: "40px", textAlign: "center" }}>🟢</div>
//           <div style={{ textAlign: "center", fontWeight: "500" }}>
//             '{appliedCode}' Applied
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               fontWeight: "bold",
//               fontSize: "20px",
//               marginTop: "8px",
//             }}
//           >
//             YAY! You saved ₹
//             {
//               calculateDiscount(
//                 coupon.find((c) => c.code === appliedCode)
//               )
//             }
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               fontSize: "14px",
//               color: "#555",
//               marginTop: "4px",
//             }}
//           >
//             your coupon is successfully applied
//           </div>
//           <div
//             style={{ textAlign: "center", marginTop: "10px" }}
//           >
//             <a
//               href="#"
//               style={{ textDecoration: "underline", color: "#1a73e8" }}
//             >
//               okay,. got it
//             </a>
//           </div>
//         </>
//       )}

//       {/* Coupon List */}
//       <div style={{ marginTop: "20px" }}>
//         {coupon.map((coupon) => {
//           const valid = isValidCoupon(coupon);
//           const discount = calculateDiscount(coupon);
//           const isApplied = appliedCode === coupon.code;
//           const moreNeeded = coupon.minOrderAmount - totalDiscountPrice;

//           return (
//             <div
//               key={coupon._id}
//               style={{
//                 borderTop: "1px solid #eee",
//                 padding: "12px 0",
//                 opacity: valid ? 1 : 0.6,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <span style={{ fontWeight: "bold" }}>{coupon.code}</span>
//                 <span
//                   onClick={() => {
//                     if (isApplied) {
//                       setAppliedCode("");
//                     } else if (valid) {
//                       setAppliedCode(coupon.code);
//                     }
//                   }}
//                   style={{
//                     color: isApplied ? "red" : "#1a73e8",
//                     cursor: valid ? "pointer" : "not-allowed",
//                     fontWeight: "500",
//                   }}
//                 >
//                   {isApplied ? "Remove" : "Apply"}
//                 </span>
//               </div>

//               <div
//                 style={{
//                   color: valid ? "green" : "red",
//                   fontSize: "14px",
//                   marginTop: "4px",
//                 }}
//               >
//                 {valid
//                   ? `Save ₹${discount} on this order`
//                   : `Add ₹${moreNeeded} more to avail this coupon`}
//               </div>

//               <div
//                 style={{
//                   color: "#777",
//                   fontSize: "13px",
//                   marginTop: "2px",
//                 }}
//               >
//                 {valid
//                   ? `Get ${coupon.discountValue}${
//                       coupon.discountType === "Percentage" ? "%" : "₹"
//                     } off upto ₹100`
//                   : ""}
//               </div>

//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#444",
//                   textDecoration: "underline",
//                   marginTop: "4px",
//                 }}
//               >
//                 Know more
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SlideUpCouponToast;

import React, { useEffect, useState } from "react";
import { useBio } from "./BioContext";

const SlideUpCouponToast = ({ onClose, coupon, totalDiscountPrice }) => {
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

  // const calculateDiscount = (coupon) => {
  //   if (coupon.discountType === "Percentage") {
  //     return Math.round((totalDiscountPrice * coupon.discountValue) / 100);
  //   }
  //   return coupon.discountValue;
  // };
  const calculateDiscount = (coupon) => {
  if (!coupon) return 0; // prevent crash if coupon is undefined

  if (coupon?.discountType === "Percentage") {
    return Math.round((totalDiscountPrice * coupon?.discountValue) / 100);
  }
  return coupon.discountValue || 0;
};


  const isValidCoupon = (coupon) => {
    return totalDiscountPrice >= coupon.minOrderAmount;
  };

//   if (!coupon || coupon.length === 0) {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "0",
//         left: "50%",
//         transform: "translateX(-50%)",
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "16px",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//         textAlign: "center",
//         zIndex: 9999,
//       }}
//     >
//       <p>Loading coupons...</p>
//     </div>
//   );
// }

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
          {/* <input
            type="text" 
            placeholder="Enter Coupon Code"
            value={appliedCode}
            // onChange={(e)=>{setAppliedCode(e.value)}}
            onChange={(e)=>{setAppliedCode(e.target.value)}}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontWeight: "lighter",
              
            }}
          /> */}
          <button
            
          //   onClick={()=>{setkarocode(appliedCode),setTimeout(()=>{
               
          // setVisible(false);
          // setTimeout(onClose, 300);
    
          //   },100)}}
           onClick={() => {
    if(appliedCode){
      setkarocode(appliedCode);
      setVisible(false);
      onClose();
    }
  }}
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
                style={{
                    color: isApplied ? "red" : "#1a73e8",
                    cursor: valid ? "pointer" : "not-allowed",
                    fontWeight: "500",
                  }}
  onClick={() => {
    if (isApplied) {
      setAppliedCode("");
      setkarocode("");  // REMOVE from context
    } else if (valid) {
      setAppliedCode(c.code);
      setkarocode(c.code);  // APPLY in context
    }
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

              {/* <div
                style={{
                  fontSize: "13px",
                  color: "#444",
                  textDecoration: "underline",
                  marginTop: "4px",
                }}
              >
                Know more
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideUpCouponToast;
