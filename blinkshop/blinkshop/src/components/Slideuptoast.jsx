
// import React, { useEffect, useState } from "react";
// import { useBio } from "./BioContext";

// const SlideUpCouponToast = ({ onClose, coupon, totalDiscountPrice }) => {
//   const [visible, setVisible] = useState(false);
//   const [appliedCode, setAppliedCode] = useState("");
//   console.log("appcd",appliedCode)
// const {setkarocode}=useBio()
//   useEffect(() => {
//     setVisible(true);
//     const validFirst = coupon.find(
//       (c) => totalDiscountPrice >= c.minOrderAmount
//     );
//     if (validFirst) {
//       setAppliedCode(validFirst.code);
//     }
//   }, [coupon, totalDiscountPrice]);

//   // const calculateDiscount = (coupon) => {
//   //   if (coupon.discountType === "Percentage") {
//   //     return Math.round((totalDiscountPrice * coupon.discountValue) / 100);
//   //   }
//   //   return coupon.discountValue;
//   // };
//   const calculateDiscount = (coupon) => {
//   if (!coupon) return 0; // prevent crash if coupon is undefined

//   if (coupon?.discountType === "Percentage") {
//     return Math.round((totalDiscountPrice * coupon?.discountValue) / 100);
//   }
//   return coupon.discountValue || 0;
// };


//   const isValidCoupon = (coupon) => {
//     return totalDiscountPrice >= coupon.minOrderAmount;
//   };

// //   if (!coupon || coupon.length === 0) {
// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         bottom: "0",
// //         left: "50%",
// //         transform: "translateX(-50%)",
// //         backgroundColor: "#fff",
// //         padding: "20px",
// //         borderRadius: "16px",
// //         boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
// //         textAlign: "center",
// //         zIndex: 9999,
// //       }}
// //     >
// //       <p>Loading coupons...</p>
// //     </div>
// //   );
// // }

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

//       {/* Top Applied Input + Remove */}
//       {/* {appliedCode && ( */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent:"center", gap: "10px", marginBottom: "16px" }}>
//           {/* <input
//             type="text" 
//             placeholder="Enter Coupon Code"
//             value={appliedCode}
//             // onChange={(e)=>{setAppliedCode(e.value)}}
//             onChange={(e)=>{setAppliedCode(e.target.value)}}
//             style={{
//               flex: 1,
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               fontWeight: "lighter",
              
//             }}
//           /> */}
//           <button
            
//             onClick={()=>{setkarocode(appliedCode),setTimeout(()=>{
               
//           setVisible(false);
//           setTimeout(onClose, 300);
    
//             },100)}}
//             style={{
//               padding: "5px 5px",
//               backgroundColor: "#fff",
//               border: "none",
//               color: "green",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               cursor: "pointer",
//             }}
//           >
//             Apply
//           </button>
//         </div>
//       {/* )} */}

//       {/* Coupon Applied Message */}
//       {appliedCode && (
//         <>
//           <div style={{ textAlign: "center", fontSize: "18px", color: "green", fontWeight: "bold" }}>
//             YAY! You saved ₹
//             {
//               calculateDiscount(
//                 coupon?.find((c) => c?.code === appliedCode)
//               )
//             }
//           </div>
//           <div style={{ textAlign: "center", marginBottom: "10px", color: "#666", fontSize: "14px" }}>
//             your coupon is successfully applied
//           </div>
//         </>
//       )}

//       {/* Coupons List */}
//       <div style={{ marginTop: "10px" }}>
//         {coupon?.map((c) => {
//           const valid = isValidCoupon(c);
//           const discount = calculateDiscount(c);
//           const isApplied = appliedCode === c?.code;
//           const moreNeeded = c?.minOrderAmount - totalDiscountPrice;

//           return (
//             <div
//               key={c._id}
//               style={{
//                 borderTop: "1px dashed #ccc",
//                 padding: "12px 0",
//                 opacity: valid ? 1 : 0.6,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <span style={{ fontWeight: "bold" }}>{c?.code}</span>
//                 <span
//                   onClick={() => {
//                     if (isApplied) {
//                       // setkarocode("")
//                       setAppliedCode("");
                      
//                     } else if (valid) {
//                     // setkarocode(c.code)
//                       setAppliedCode(c.code);

                      
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
//                   fontSize: "14px",
//                   color: valid ? "green" : "red",
//                   marginTop: "4px",
//                 }}
//               >
//                 {valid
//                   ? `Save ₹${discount} on this order`
//                   : `Add ₹${moreNeeded} more to avail this coupon`}
//               </div>

//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#666",
//                   marginTop: "4px",
//                 }}
//               >
//                 {valid
//                   ? `Get ${c?.discountValue}${c.discountType === "Percentage" ? "%" : "₹"} off upto ₹100`
//                   : ""}
//               </div>

//               {/* <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#444",
//                   textDecoration: "underline",
//                   marginTop: "4px",
//                 }}
//               >
//                 Know more
//               </div> */}
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

const SlideUpCouponToast = ({ onClose, coupon = [], totalDiscountPrice = 0 }) => {
  const [visible, setVisible] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  const { setkarocode } = useBio();

  // 🧠 Safety: ensure valid coupon array
  const validCoupons = Array.isArray(coupon) ? coupon : [];

  useEffect(() => {
    setVisible(true);
    // ✅ Automatically apply first valid coupon
    const validFirst = validCoupons.find(
      (c) => totalDiscountPrice >= (c?.minOrderAmount ?? Infinity)
    );
    if (validFirst?.code) setAppliedCode(validFirst.code);
  }, [validCoupons, totalDiscountPrice]);

  // ✅ Calculate discount safely
  const calculateDiscount = (c) => {
    if (!c) return 0;
    if (c?.discountType === "Percentage") {
      return Math.round((totalDiscountPrice * (c?.discountValue ?? 0)) / 100);
    }
    return c?.discountValue || 0;
  };

  // ✅ Validate coupon condition
  const isValidCoupon = (c) => totalDiscountPrice >= (c?.minOrderAmount ?? Infinity);

  // ✅ Early return if no coupons
  if (!validCoupons.length) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
          zIndex: 9999,
          width: "100%",
          fontFamily: "sans-serif",
        }}
      >
        <p>Loading coupons...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: visible ? "0" : "-600px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "bottom 0.5s ease",
        zIndex: 9999,
        width: "100%",
        fontFamily: "sans-serif",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      {/* ❌ Close Button */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          fontSize: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          setVisible(false);
          if (typeof onClose === "function") {
            setTimeout(onClose, 300);
          }
        }}
      >
        ×
      </div>

      {/* ✅ Apply Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={() => {
            if (appliedCode.trim() !== "") {
              setkarocode(appliedCode);
              setVisible(false);
              if (typeof onClose === "function") setTimeout(onClose, 300);
            }
          }}
          style={{
            padding: "6px 12px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>

      {/* 🟢 Applied Message */}
      {appliedCode && (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "green",
              fontWeight: "bold",
            }}
          >
            YAY! You saved ₹
            {calculateDiscount(validCoupons.find((c) => c?.code === appliedCode))}
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Your coupon is successfully applied
          </div>
        </>
      )}

      {/* 🏷️ Coupon List */}
      <div style={{ marginTop: "10px" }}>
        {validCoupons.map((c) => {
          const valid = isValidCoupon(c);
          const discount = calculateDiscount(c);
          const isApplied = appliedCode === c?.code;
          const moreNeeded = (c?.minOrderAmount ?? 0) - totalDiscountPrice;

          return (
            <div
              key={c?._id || c?.code}
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
                <span style={{ fontWeight: "bold" }}>{c?.code ?? "Unknown"}</span>
                <span
                  onClick={() => {
                    if (isApplied) setAppliedCode("");
                    else if (valid) setAppliedCode(c?.code || "");
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
                  : `Add ₹${moreNeeded > 0 ? moreNeeded : 0} more to avail this coupon`}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "4px",
                }}
              >
                {valid
                  ? `Get ${c?.discountValue}${
                      c?.discountType === "Percentage" ? "%" : "₹"
                    } off upto ₹100`
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideUpCouponToast;
