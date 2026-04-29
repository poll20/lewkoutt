
// import React, { useState, useEffect } from "react";
// import "./CheckOut.css";
// import { useBio } from "./BioContext";
// import { useDashboard } from "./dashboardforadmin/DashboardContext";
// import { IoIosArrowForward } from "react-icons/io";
// import { NavLink, useLocation } from "react-router-dom";
// import { useFirebaseAuth } from "./FirebaseContext";
// import phonepay from "../components/image/phonepay.png";
// import paytm from "../components/image/paytm.png";
// import googlepay from "../components/image/gpay.webp";
// import TimeSlots from "./TimeSlots";
// import Slideuptoast from "./Slideuptoast";
// import BundleProduct from "./BundleProduct";

// const Checkout = () => {
//   const {
//     buydata,
//     addresssetkro,
//     orderplaced,
//     walletkapesa,
//     timeslotlelo,
//     fetchCoupons,
//     fetchDistance,
//     distance,
//     coupons,
//     karocode
//   } = useBio();
//   const { userDetails } = useFirebaseAuth();
//   const location = useLocation();
//   const [paymentmode, setpaymentmode] = useState("");
//   const [showSheet, setShowSheet] = useState(false);

//   // Coupon state
//   const [firstcpn, setfirstcpn] = useState(null);
//   const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
//   const [yppicode, setyppicode] = useState(false);
//  const [numericdistanceofaddress, setnumericdistanceofaddress] = useState(0);

//   // Cart & address state
//   const [purchaseproduct, setpurchaseproduct] = useState(
//     () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
//   );

//   const [deleveryaddress, setdeleveryadress] = useState(
//     () => JSON.parse(localStorage.getItem("checkoutAddress")) || addresssetkro || []
//   );

//   const [mywalletAmount, setMywalletAmount] = useState(
//     () => JSON.parse(localStorage.getItem("checkoutWallet")) || walletkapesa || 0
//   );

//   const [deliveryCharge, setDeliveryCharge] = useState(
//   () => JSON.parse(localStorage.getItem("checkoutDeliveryCharge")) || 0
// );

// console.log("Deliverykatime:", timeslotlelo);
//   // Persist address if context changes
//   useEffect(() => {
//     if (addresssetkro?.length) {
//       setdeleveryadress(addresssetkro);
//       localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
//     }
//   }, [addresssetkro]);

//   // Persist cart, wallet & address
//   useEffect(() => localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct)), [purchaseproduct]);
//   useEffect(() => localStorage.setItem("checkoutAddress", JSON.stringify(deleveryaddress)), [deleveryaddress]);
//   useEffect(() => localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount)), [mywalletAmount]);
// useEffect(() => {
//   //  fetchDistance(deleveryaddress)
//   if (deleveryaddress?.length > 0) {
//     fetchDistance(deleveryaddress);
//   }
//   }, [deleveryaddress]);

  
//  useEffect(() => {
//   console.log("Distance updated:", distance);
//   if (!distance) return;

//   // 🔥 Convert "15.7 km" → 15.7 (number)
//   // const numericDistance = parseFloat(distance.toString().replace("km", "").trim());
//   const numericDistance = parseFloat(
//   distance.toString().replace(/,/g, "").replace("km", "").trim()
// );

//   console.log("Parsed numeric distance:", numericDistance);
// setnumericdistanceofaddress(numericDistance)
//   if (isNaN(numericDistance)) return; // safety check

//   let charge = 0;
//   // if(numericDistance < 15 || purchaseproduct?.discountprice<799){
//   //   charge=50 
//   // }
//   if (numericDistance >= 16 && numericDistance <= 18) {
//     charge = 49;
//   } else if (numericDistance > 18 && numericDistance <= 21) {
//     charge = 70;
//   } else if (numericDistance > 21 && numericDistance <= 25) {
//     charge = 80;
//   }

//   setDeliveryCharge(charge);
//   localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(charge));
// }, [distance]);


//   // Clear checkout data on unmount (except navigating to address page)
//   useEffect(() => {
//     return () => {
//       if (location.pathname !== "/address/chek") {
//         localStorage.removeItem("checkoutCart");
//         localStorage.removeItem("checkoutAddress");
//         localStorage.removeItem("checkoutWallet");
//         localStorage.removeItem("checkoutCoupon");
//       }
//     };
//   }, [location.pathname]);

//   // Wallet calculation
//   useEffect(() => {
//     if (userDetails?.wallet?.cashback) {
//       const availableWallet = userDetails.wallet.cashback;
//       const tenPercentOfOrder = purchaseproduct.reduce(
//         (sum, item) => sum + (item.discountprice || item.price || 0), 0
//       ) * 0.1;
//       setMywalletAmount(Math.min(availableWallet, tenPercentOfOrder));
//     }
//   }, [purchaseproduct, userDetails]);
//     useEffect(() => {
//     if (window.fbq && purchaseproduct) {
//       window.fbq("track", "InitiateCheckout", {
//         contents: [
//           {
//             id: `SKU_${purchaseproduct._id}`,
//             name: purchaseproduct.title,
//             quantity: 1,
//             item_price: purchaseproduct.discountprice || purchaseproduct.price,
//           },
//         ],
//         content_type: "product",
//         value: purchaseproduct.discountprice || purchaseproduct.price,
//         currency: "INR",
//       });
//     }
//   }, [purchaseproduct]);
// //   useEffect(() => {
// //   if (window.fbq && cartItems?.length) {
// //     window.fbq("track", "InitiateCheckout", {
// //       content_ids: cartItems.map(
// //         item => `SKU_${item.productId}`
// //       ),
// //       content_type: "product_group",

// //       contents: cartItems.map(item => ({
// //         id: `SKU_${item.productId}`,
// //         quantity: item.qty,
// //         item_price: item.price,
// //       })),

// //       value: totalAmount,
// //       currency: "INR",
// //       num_items: cartItems.length,
// //     });
// //   }
// // }, [cartItems]);

//   const toggleSheet = () => setShowSheet(!showSheet);
//   const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();
//   console.log("city is",city)
// const codprice=50
// const upiprice=20
//   // Total prices
//   const totalDiscountPrice = purchaseproduct.reduce(
//     (sum, item) => sum + (item.discountprice || item.price || 0), 0
//   );
//   const totalPrice = purchaseproduct.reduce((sum, item) => sum + (item.price || 0), 0);

//   // Fetch coupons for first product
//   useEffect(() => {
//     if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
//       // fetchCoupons(purchaseproduct[0]?.cate, purchaseproduct[0]?.tag);
//       fetchCoupons("all","all");
      
//     }
//   }, [purchaseproduct]);

//   // 👇 Add this effect near your other useEffects
// useEffect(() => {
//   const firstProduct = purchaseproduct?.[0];
//   if (firstProduct?.cate && firstProduct?.tag) {
//     console.log("🔁 Refetching coupons after returning to checkout...");
//     // fetchCoupons(firstProduct.cate, firstProduct.tag);
//     fetchCoupons("all","all");

//   }
// }, [location.pathname]);

//   // Apply coupon safely
//   useEffect(() => {
//     if (!coupons?.length || !purchaseproduct?.length) return;

//     let couponToApply;
//     if (!karocode?.length) {
//       couponToApply = coupons.find(c => c?.couponType === "First Order");
//     } else {
//       couponToApply = coupons.find(c => c?.code === karocode);
//     }

//     if (couponToApply) {
//       const discountType = couponToApply?.discountType ?? "Flat";
//       const discountValue = Number(couponToApply?.discountValue ?? 0);
//       const discounted = discountType === "Percentage"
//         ? (totalDiscountPrice * discountValue) / 100
//         : discountValue;

//       setfirstcpn(couponToApply);
//       setamountafteraddcoupon(discounted);
    
//       setyppicode(true);
//     } else {
//       setfirstcpn(null);
//       setamountafteraddcoupon(0);
//       setyppicode(false);
//     }
//   }, [coupons, totalDiscountPrice, karocode, purchaseproduct]);

//   const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
//   const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
//   const payableAmount = (amountAfterCoupon - walletToUse)+deliveryCharge;
//   useEffect(()=>{
//     if(payableAmount<799){
//   let charge=50

//   setDeliveryCharge(charge)
// }
//   },[payableAmount ])

//   return (
//     <div className="checkout-container-checkoutbuy">
//       <h2 className="checkout-title-checkoutbuy">Checkout</h2>

//       {/* Address Section */}
//       <NavLink to='/address/chek' className="navlink">
//         <div className="address-section-checkoutbuy">
//           <span>
//             {deleveryaddress?.length > 0
//               ? `${deleveryaddress[0]?.building}/${deleveryaddress[0]?.locality}, ${deleveryaddress[0]?.city}`
//               : "No address available"}
//           </span>
//         </div>
//       </NavLink>

//       {/* Review Items */}
//       <div className="review-item-section-checkoutbuy">
//         <span onClick={toggleSheet}>Review item</span>
//         <IoIosArrowForward onClick={toggleSheet}></IoIosArrowForward>
//       </div>

//       {/* Coupons */}
//       <div className="coupons-section-checkoutbuy" onClick={() => setyppicode(true)}>
//         <span style={{ fontWeight: "600" }}>
//           {firstcpn?.code ? `${firstcpn.code} Applied` : 'Apply Coupon'}
//         </span>
//         <span style={{ color: "red", fontWeight: "800" }}>
//           {amountafteraddcoupon ? `₹${amountafteraddcoupon}` : ''} 
//           <IoIosArrowForward style={{ color: "black" }} />
//         </span>
//       </div>

//       {/* Order Details */}
//       <div className="order-details-checkoutbuy">
//         <h3>Order Details</h3>
//         <div className="order-row-checkoutbuy">
//           <span>MRP</span>
//           <span>₹{totalPrice}.0</span>
//         </div>
//         <div className="order-row-checkoutbuy">
//           <span>Discount on MRP</span>
//           <span>₹{totalPrice - totalDiscountPrice}.0</span>
//         </div>
//         <div className="order-row-checkoutbuy">
//           <span>Discounted Price</span>
//           <span>₹{totalDiscountPrice}.0</span>
//         </div>
//         {amountafteraddcoupon ? (
//           <div className="order-row-checkoutbuy">
//             <span>Coupon Applied</span>
//             <span>₹{amountafteraddcoupon}.0</span>
//           </div>
//         ) : null}
//         <div className="order-row-checkoutbuy">
//           <span>Wallet</span>
//           <span className="text-green-600 font-semibold text-[16px]">₹{mywalletAmount.toFixed(2)}</span>
//         </div>

//         <div className="order-row-checkoutbuy">
//           <span style={{ display: 'flex', flexDirection: 'column' }}>
//   <span>Delivery Charges</span>
//   <span style={{ display: 'flex', flexDirection: 'column',fontSize:"10px" }}>{deliveryCharge?('(Distance-based delivery fee applied)'):('')}</span>
//   </span>
//   <span className="text-green-600 font-semibold text-[16px]">
//     ₹{deliveryCharge}
//   </span>
// </div>

//         <div className="order-row-checkoutbuy payable-row-checkoutbuy">
//           <span>Payable amount</span>
//           <span>₹{payableAmount}.0</span>
//         </div>
//         <p className="discount-text-checkoutbuy">
//           🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
//         </p>
//       </div>
//       {/* Payment Methods UI */}
//       {
//         parseFloat(numericdistanceofaddress) > 25  && <div style={{
//   background: "#fff",
//   borderRadius: "12px",
//   padding: "14px",
//   marginTop: "12px",
//   boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
//   border: "1px solid #eee"
// }}>
//   <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
//     Pay via
//     <span style={{ fontSize: "11px", color: "#666", marginLeft: "6px" }}>
//       ⚡ Enjoy fast delivery on all prepaid orders.
//     </span>
//   </div>

//   {/* UPI */}
//   <div style={{
//     border: "1px solid #e5e5e5",
//     borderRadius: "10px",
//     padding: "10px",
//     marginBottom: "10px"
//   }}>
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <span style={{ fontWeight: "600",fontSize:"15px" }}>UPI payment</span>
//       <span style={{ color: "#1b7f3a", fontSize: "10px", fontWeight:"600" , background: "#e9f7ee",
//       color: "#de4e0bff",padding:"0 10px"}}>enjoy ₹{upiprice} off</span>
//       <span>
//         <span style={{ textDecoration: "line-through", color: "#999", fontSize: "12px" }}>
//           ₹{payableAmount}
//         </span>{" "}
//         <span style={{ fontWeight: "700" }}>₹{payableAmount-upiprice}</span>
//       </span>
//     </div>

//     <div style={{
//       background: "#e9f7ee",
//       color: "#1b7f3a",
//       fontSize: "12px",
//       padding: "6px",
//       borderRadius: "6px",
//       marginTop: "6px",
//       textAlign: "center",
//       fontWeight: "600"
//     }}>
//       Pay online and save ₹{upiprice}
//     </div>

//     <div style={{
//       display: "flex",
//       justifyContent: "space-between",
//       marginTop: "10px"
//     }}>
//       {[phonepay, paytm, googlepay].map((item, i) => (
          
//         <div  onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse,payableAmount-upiprice,timeslotlelo,"online")}  key={i}  style={{
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           padding: "8px",
//           fontSize: "11px",
//           width: "23%",
//           textAlign: "center",
//           fontWeight: "600"
//         }}>
//           <img src={item} alt="UPI" style={{ minWidth: "100%", height: "30px", objectFit: "contain" }} />
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* Other Options */}
//   {[
//     "Credit / Debit Card",
//     "Net Banking",
//     "Wallets"
//   ].map((method, i) => (
//     <div onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse,payableAmount-upiprice,timeslotlelo,"online")} key={i} style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "10px",
//       borderBottom: "1px solid #eee"
//     }}>
//       <span style={{ fontWeight: "500" }}>{method}</span>
//       <span style={{ color: "#1b7f3a", fontSize: "12px", fontWeight:"600" , background: "#e9f7ee",
//       color: "#de4e0bff",padding:"0 10px"}}>enjoy ₹{upiprice} off</span>
//       <span style={{ color: "#1b7f3a", fontSize: "12px", fontWeight: "600" }}>
//         ₹{payableAmount-upiprice}
//       </span>
//     </div>
//   ))}

//   {/* COD */}
//   {/* <div style={{
//     display: "flex",
//     flexDirection:"column",
//     alignItems: "start",
//     padding: "10px",
//     marginTop: "6px",
//     // border: "1px solid black"
//   }}>
//     <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
//     <span style={{ fontWeight: "500" }}>Cash on delivery</span>
    
//     <span style={{ color: "#e53935", fontSize: "12px", fontWeight: "700" }}>
//       ₹{payableAmount + codprice}
//     </span>
//     </div>
//     <div>
//     <p style={{ fontSize: "10px", fontWeight: "700" }}>₹{codprice} will be charge extra for cash on delivery option</p>
//     </div>
//   </div> */}
//   <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "start",
//     padding: "10px",
//     marginTop: "6px",
//     cursor: "pointer",
//   }}
//   onClick={() => setpaymentmode("cod")}
// >
//   <div
//     style={{
//       width: "100%",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     }}
//   >
//     <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//       <input
//         type="radio"
//         name="paymentMode"
//         value="cod"
//         onChange={() => setpaymentmode("cod")}
//       />
//       <span style={{ fontWeight: "500" }}>Cash on delivery</span>
//     </label>

//     <span
//       style={{
//         color: "#e53935",
//         fontSize: "12px",
//         fontWeight: "700",
//       }}
//     >
//       ₹{payableAmount + codprice}
//     </span>
//   </div>

//   <p style={{ fontSize: "10px", fontWeight: "700", marginTop: "4px" }}>
//     ₹{codprice} will be charged extra for cash on delivery option
//   </p>
// </div>

// </div>

//       }






//       {/* Time Slots + Pay Now */}
//       {city?.toLowerCase().includes("jaipur") && parseFloat(distance) < 25 ? (
//         <>
//           <TimeSlots />
//           {/* <button
//             className="pay-now-btn-checkoutbuy"
//             disabled={!timeslotlelo}
//             onClick={() => timeslotlelo && orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount, timeslotlelo)}
//           >
//             Pay Now
//           </button> */}
//           <button 
// className="pay-now-btn-checkoutbuy"
// onClick={() => {
//     // if (!timeslotlelo) {
//     //   alert("Please Select the Slot and Press on Confirm Slot.");
//     //   return;
//     // }
//     orderplaced(purchaseproduct, deleveryaddress, walletToUse,payableAmount, timeslotlelo,"online");
//   }}
// >
//   Pay Now
// </button>

//         </>
//       ) : (
//         <button
//           className="pay-now-btn-checkoutbuy"
//           onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse,paymentmode=="cod"?(payableAmount+codprice):(payableAmount-upiprice),'',paymentmode)}
//         >
//           {paymentmode === "cod" ? "Confirm Order" : "Pay Now"}
//         </button>
//       )}

//       {/* Coupon Toast */}
//       {/* {yppicode && firstcpn && (
//         <Slideuptoast
//           coupon={coupons}
//           firstcpns={firstcpn}
//           totalDiscountPrice={totalDiscountPrice}
//           onClose={() => setyppicode(false)}
//         />
//       )} */}
//       {yppicode && coupons?.length > 0 && (
//   <Slideuptoast
//     coupon={coupons}
//     firstcpns={firstcpn}
//     totalDiscountPrice={totalDiscountPrice}
//     onClose={() => setyppicode(false)}
//   />
// )}

//  {/* {yppicode && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setyppicode(false)} />} */}

// {/* Bottom Sheet */}
//       <div className="bottom-sheet" style={{ display: showSheet ? 'block' : 'none' }}>
//         <p>Review item</p>
//         <button onClick={toggleSheet} className="closed-button">✖</button>
//         {purchaseproduct.map((order, i) => (
//           Array.isArray(order.bundle) && order.bundle.length > 0 ? (
//             <BundleProduct
//               key={i}
//               source="checkout"
//               originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
//               totalPrice={1000}
//               products={[{ ...order.bundle[0] }, { ...order.bundle[1] }]}
//             />
//           ) : (
//             <div key={i} className="sheet-content">
//               <div className="item-info">
//                 <img src={order.image} alt="Product" className="product-image-sheet" loading="lazy" />
//                 <div className="item-details">
//                   <span className="item-price">₹{order.discountprice}</span>
//                   <h4>{order.description}</h4>
//                   <p>Size: {order.size} &nbsp;&nbsp; Qty: {order.qty}</p>
//                   <p className="delivery-info">
//                     Deliver by <span className="delivery-date">{timeslotlelo || '60 minute delivery'}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import { useBio } from "./BioContext";
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";
import phonepay from "../components/image/phonepay.png";
import paytm from "../components/image/paytm.png";
import googlepay from "../components/image/gpay.webp";
import TimeSlots from "./TimeSlots";
import Slideuptoast from "./Slideuptoast";
import BundleProduct from "./BundleProduct";

// ─────────────────────────────────────────────
// 🏷️  MEMBERSHIP PRICING HELPERS
// ─────────────────────────────────────────────

/**
 * Returns the effective discountprice for a single cart item
 * based on membership type. Never mutates the original object.
 */
const getMembershipPrice = (item, memberType) => {
  // const category = item?.cate?.toString().trim().toLowerCase();
  const rawCategory = item?.cate?.toString().toLowerCase();

// 🔥 Extract only "tops" or "dress"
const match = rawCategory?.match(/\b(tops?|dress(es)?)\b/);

const category = match ? match[0] : null;
console.log("memcate",category)
  if (memberType === "silver") {
    if (category === "tops") return 299;
  }

  if (memberType === "gold") {
    if (category === "tops") return 299;
    if (category === "dress") return 599;
  }

  // Fallback: use existing discountprice or price
  return item.discountprice ?? item.price ?? 0;
};

/**
 * Returns a NEW array of cart items with membership prices applied.
 * Original items are not mutated.
 */
const applyMembershipPricing = (cartItems, member) => {
  if (!member?.isMember) return cartItems; // non-member → untouched

  return cartItems.map((item) => ({
    ...item,
    discountprice: getMembershipPrice(item, member.memberType),
  }));
};

// ─────────────────────────────────────────────
// 🟢  MEMBERSHIP TOAST  (self-contained)
// ─────────────────────────────────────────────
const MembershipToast = ({ memberType, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "50px",
        boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        fontWeight: "700",
        whiteSpace: "nowrap",
        animation: "slideUpFadeIn 0.4s ease",
        letterSpacing: "0.2px",
      }}
    >
      <span style={{ fontSize: "18px" }}>🎉</span>
      Yaay! {memberType?.charAt(0).toUpperCase() + memberType?.slice(1)} Membership is Applied!
      <button
        onClick={onClose}
        style={{
          background: "rgba(255,255,255,0.25)",
          border: "none",
          borderRadius: "50%",
          color: "#fff",
          cursor: "pointer",
          width: "20px",
          height: "20px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "4px",
          flexShrink: 0,
        }}
      >
        ✕
      </button>

      {/* Keyframe injected once */}
      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// 🛒  CHECKOUT COMPONENT
// ─────────────────────────────────────────────

const Checkout = () => {
  const {
    buydata,
    addresssetkro,
    orderplaced,
    walletkapesa,
    timeslotlelo,
    fetchCoupons,
    fetchDistance,
    distance,
    coupons,
    karocode,
  } = useBio();
  const { userDetails } = useFirebaseAuth();
  const location = useLocation();
  const [paymentmode, setpaymentmode] = useState("");
  const [showSheet, setShowSheet] = useState(false);

  // Membership toast visibility
  const [showMembershipToast, setShowMembershipToast] = useState(false);

  // Coupon state
  const [firstcpn, setfirstcpn] = useState(null);
  const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
  const [yppicode, setyppicode] = useState(false);
  const [numericdistanceofaddress, setnumericdistanceofaddress] = useState(0);

  // Cart & address state (raw, unpriced)
  const [purchaseproduct, setpurchaseproduct] = useState(
    () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
  );

  const [deleveryaddress, setdeleveryadress] = useState(
    () =>
      JSON.parse(localStorage.getItem("checkoutAddress")) ||
      addresssetkro ||
      []
  );

  const [mywalletAmount, setMywalletAmount] = useState(
    () =>
      JSON.parse(localStorage.getItem("checkoutWallet")) || walletkapesa || 0
  );

  const [deliveryCharge, setDeliveryCharge] = useState(
    () => JSON.parse(localStorage.getItem("checkoutDeliveryCharge")) || 0
  );

  // ── Derived membership info ──────────────────
  const member = userDetails?.member ?? { isMember: false, memberType: null };
  const isMember = member?.isMember === true;

  /**
   * pricedCart: cart items with membership prices applied (non-mutating).
   * All price calculations below use this array, not purchaseproduct directly.
   */
  const pricedCart = applyMembershipPricing(purchaseproduct, member);

  // Show membership toast once when component mounts for a member
  useEffect(() => {
    if (isMember) {
      setShowMembershipToast(true);
    }
  }, [isMember]);

  console.log("Deliverykatime:", timeslotlelo);

  // ── Sync address from context ────────────────
  useEffect(() => {
    if (addresssetkro?.length) {
      setdeleveryadress(addresssetkro);
      localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
    }
  }, [addresssetkro]);

  // ── Persist to localStorage ──────────────────
  useEffect(
    () => localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct)),
    [purchaseproduct]
  );
  useEffect(
    () =>
      localStorage.setItem("checkoutAddress", JSON.stringify(deleveryaddress)),
    [deleveryaddress]
  );
  useEffect(
    () =>
      localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount)),
    [mywalletAmount]
  );

  // ── Fetch distance when address changes ──────
  useEffect(() => {
    if (deleveryaddress?.length > 0) {
      fetchDistance(deleveryaddress);
    }
  }, [deleveryaddress]);

  // ── Delivery charge based on distance ────────
  useEffect(() => {
    console.log("Distance updated:", distance);
    if (!distance) return;

    const numericDistance = parseFloat(
      distance.toString().replace(/,/g, "").replace("km", "").trim()
    );
    console.log("Parsed numeric distance:", numericDistance);
    setnumericdistanceofaddress(numericDistance);
    if (isNaN(numericDistance)) return;

    // Members always pay ₹100 flat shipping
    if (isMember) {
      setDeliveryCharge(100);
      localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(100));
      return;
    }

    let charge = 0;
    if (numericDistance >= 16 && numericDistance <= 18) {
      charge = 49;
    } else if (numericDistance > 18 && numericDistance <= 21) {
      charge = 70;
    } else if (numericDistance > 21 && numericDistance <= 25) {
      charge = 80;
    }

    setDeliveryCharge(charge);
    localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(charge));
  }, [distance, isMember]);

  // ── Clear checkout data on unmount ───────────
  useEffect(() => {
    return () => {
      if (location.pathname !== "/address/chek") {
        localStorage.removeItem("checkoutCart");
        localStorage.removeItem("checkoutAddress");
        localStorage.removeItem("checkoutWallet");
        localStorage.removeItem("checkoutCoupon");
      }
    };
  }, [location.pathname]);

  // ── Wallet calculation ───────────────────────
  useEffect(() => {
    if (userDetails?.wallet?.cashback) {
      const availableWallet = userDetails.wallet.cashback;
      // Use pricedCart for wallet 10% cap calculation
      const tenPercentOfOrder =
        pricedCart.reduce(
          (sum, item) => sum + (item.discountprice || item.price || 0),
          0
        ) * 0.1;
      setMywalletAmount(Math.min(availableWallet, tenPercentOfOrder));
    }
  }, [purchaseproduct, userDetails, isMember]);

  // ── Facebook Pixel ───────────────────────────
  useEffect(() => {
    if (window.fbq && purchaseproduct) {
      window.fbq("track", "InitiateCheckout", {
        contents: [
          {
            id: `SKU_${purchaseproduct._id}`,
            name: purchaseproduct.title,
            quantity: 1,
            item_price: purchaseproduct.discountprice || purchaseproduct.price,
          },
        ],
        content_type: "product",
        value: purchaseproduct.discountprice || purchaseproduct.price,
        currency: "INR",
      });
    }
  }, [purchaseproduct]);

  const toggleSheet = () => setShowSheet(!showSheet);
  const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();
  console.log("city is", city);

  const codprice = 50;
  const upiprice = 20;

  // ── 💰 PRICE CALCULATIONS (use pricedCart) ───
  const totalDiscountPrice = pricedCart.reduce(
    (sum, item) => sum + (item.discountprice || item.price || 0),
    0
  );
  const totalPrice = purchaseproduct.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  // ── Fetch coupons ────────────────────────────
  useEffect(() => {
    if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
      fetchCoupons("all", "all");
    }
  }, [purchaseproduct]);

  useEffect(() => {
    const firstProduct = purchaseproduct?.[0];
    if (firstProduct?.cate && firstProduct?.tag) {
      console.log("🔁 Refetching coupons after returning to checkout...");
      fetchCoupons("all", "all");
    }
  }, [location.pathname]);

  // ── Apply coupon ─────────────────────────────
  useEffect(() => {
    if (!coupons?.length || !purchaseproduct?.length) return;

    let couponToApply;
    if (!karocode?.length) {
      couponToApply = coupons.find((c) => c?.couponType === "First Order");
    } else {
      couponToApply = coupons.find((c) => c?.code === karocode);
    }

    if (couponToApply) {
      const discountType = couponToApply?.discountType ?? "Flat";
      const discountValue = Number(couponToApply?.discountValue ?? 0);
      const discounted =
        discountType === "Percentage"
          ? (totalDiscountPrice * discountValue) / 100
          : discountValue;

      setfirstcpn(couponToApply);
      setamountafteraddcoupon(discounted);
      setyppicode(true);
    } else {
      setfirstcpn(null);
      setamountafteraddcoupon(0);
      setyppicode(false);
    }
  }, [coupons, totalDiscountPrice, karocode, purchaseproduct]);

  const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
  const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);

  // Members always have deliveryCharge = ₹100 (set above in distance effect)
  const payableAmount = amountAfterCoupon - walletToUse + deliveryCharge;

  // Non-member fallback: if order < ₹799, add ₹50 shipping
  useEffect(() => {
    if (isMember) return; // members already have fixed ₹100
    if (payableAmount < 799) {
      setDeliveryCharge(50);
    }
  }, [payableAmount, isMember]);

  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* 🟢 Membership Toast */}
      {showMembershipToast && (
        <MembershipToast
          memberType={member.memberType}
          onClose={() => setShowMembershipToast(false)}
        />
      )}

      {/* Membership Badge (inline, below title) */}
      {isMember && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "linear-gradient(135deg,#bbf7d0,#86efac)",
            color: "#15803d",
            fontSize: "12px",
            fontWeight: "700",
            padding: "5px 14px",
            borderRadius: "50px",
            marginBottom: "12px",
            letterSpacing: "0.3px",
          }}
        >
          {member.memberType === "gold" ? "🥇" : "🥈"}{" "}
          {member.memberType?.charAt(0).toUpperCase() +
            member.memberType?.slice(1)}{" "}
          Member — Special Prices Applied
        </div>
      )}

      {/* Address Section */}
      <NavLink to="/address/chek" className="navlink">
        <div className="address-section-checkoutbuy">
          <span>
            {deleveryaddress?.length > 0
              ? `${deleveryaddress[0]?.building}/${deleveryaddress[0]?.locality}, ${deleveryaddress[0]?.city}`
              : "No address available"}
          </span>
        </div>
      </NavLink>

      {/* Review Items */}
      <div className="review-item-section-checkoutbuy">
        <span onClick={toggleSheet}>Review item</span>
        <IoIosArrowForward onClick={toggleSheet} />
      </div>

      {/* Coupons */}
      <div
        className="coupons-section-checkoutbuy"
        onClick={() => setyppicode(true)}
      >
        <span style={{ fontWeight: "600" }}>
          {firstcpn?.code ? `${firstcpn.code} Applied` : "Apply Coupon"}
        </span>
        <span style={{ color: "red", fontWeight: "800" }}>
          {amountafteraddcoupon ? `₹${amountafteraddcoupon}` : ""}
          <IoIosArrowForward style={{ color: "black" }} />
        </span>
      </div>

      {/* Order Details */}
      <div className="order-details-checkoutbuy">
        <h3>Order Details</h3>
        <div className="order-row-checkoutbuy">
          <span>MRP</span>
          <span>₹{totalPrice}.0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discount on MRP</span>
          <span>₹{totalPrice - totalDiscountPrice}.0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discounted Price</span>
          <span>₹{totalDiscountPrice}.0</span>
        </div>

        {/* Membership savings row */}
        {isMember && (() => {
          const originalTotal = purchaseproduct.reduce(
            (sum, item) => sum + (item.discountprice ?? item.price ?? 0),
            0
          );
          const memberSavings = originalTotal - totalDiscountPrice;
          return memberSavings > 0 ? (
            <div className="order-row-checkoutbuy">
              <span>
                {member.memberType?.charAt(0).toUpperCase() +
                  member.memberType?.slice(1)}{" "}
                Member Discount
              </span>
              <span style={{ color: "#16a34a", fontWeight: "700" }}>
                −₹{memberSavings}.0
              </span>
            </div>
          ) : null;
        })()}

        {amountafteraddcoupon ? (
          <div className="order-row-checkoutbuy">
            <span>Coupon Applied</span>
            <span>₹{amountafteraddcoupon}.0</span>
          </div>
        ) : null}

        <div className="order-row-checkoutbuy">
          <span>Wallet</span>
          <span className="text-green-600 font-semibold text-[16px]">
            ₹{mywalletAmount.toFixed(2)}
          </span>
        </div>

        <div className="order-row-checkoutbuy">
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span>Delivery Charges</span>
            <span style={{ display: "flex", flexDirection: "column", fontSize: "10px" }}>
              {isMember
                ? "(Fixed ₹100 for members)"
                : deliveryCharge
                ? "(Distance-based delivery fee applied)"
                : ""}
            </span>
          </span>
          <span className="text-green-600 font-semibold text-[16px]">
            ₹{deliveryCharge}
          </span>
        </div>

        <div className="order-row-checkoutbuy payable-row-checkoutbuy">
          <span>Payable amount</span>
          <span>₹{payableAmount}.0</span>
        </div>

        <p className="discount-text-checkoutbuy">
          🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on
          the final amount
        </p>
      </div>

      {/* Payment Methods — distance > 25 km */}
      {parseFloat(numericdistanceofaddress) > 25 && (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "14px",
            marginTop: "12px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
            Pay via
            <span style={{ fontSize: "11px", color: "#666", marginLeft: "6px" }}>
              ⚡ Enjoy fast delivery on all prepaid orders.
            </span>
          </div>

          {/* UPI */}
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "600", fontSize: "15px" }}>
                UPI payment
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  background: "#e9f7ee",
                  color: "#de4e0bff",
                  padding: "0 10px",
                }}
              >
                enjoy ₹{upiprice} off
              </span>
              <span>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: "12px",
                  }}
                >
                  ₹{payableAmount}
                </span>{" "}
                <span style={{ fontWeight: "700" }}>
                  ₹{payableAmount - upiprice}
                </span>
              </span>
            </div>

            <div
              style={{
                background: "#e9f7ee",
                color: "#1b7f3a",
                fontSize: "12px",
                padding: "6px",
                borderRadius: "6px",
                marginTop: "6px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Pay online and save ₹{upiprice}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              {[phonepay, paytm, googlepay].map((item, i) => (
                <div
                  onClick={() =>
                    orderplaced(
                      pricedCart,
                      deleveryaddress,
                      walletToUse,
                      payableAmount - upiprice,
                      timeslotlelo,
                      "online"
                    )
                  }
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "8px",
                    fontSize: "11px",
                    width: "23%",
                    textAlign: "center",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item}
                    alt="UPI"
                    style={{
                      minWidth: "100%",
                      height: "30px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other online payment options */}
          {["Credit / Debit Card", "Net Banking", "Wallets"].map(
            (method, i) => (
              <div
                onClick={() =>
                  orderplaced(
                    pricedCart,
                    deleveryaddress,
                    walletToUse,
                    payableAmount - upiprice,
                    timeslotlelo,
                    "online"
                  )
                }
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: "500" }}>{method}</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    background: "#e9f7ee",
                    color: "#de4e0bff",
                    padding: "0 10px",
                  }}
                >
                  enjoy ₹{upiprice} off
                </span>
                <span
                  style={{
                    color: "#1b7f3a",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  ₹{payableAmount - upiprice}
                </span>
              </div>
            )
          )}

          {/* COD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              padding: "10px",
              marginTop: "6px",
              cursor: "pointer",
            }}
            onClick={() => setpaymentmode("cod")}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value="cod"
                  onChange={() => setpaymentmode("cod")}
                />
                <span style={{ fontWeight: "500" }}>Cash on delivery</span>
              </label>
              <span
                style={{ color: "#e53935", fontSize: "12px", fontWeight: "700" }}
              >
                ₹{payableAmount + codprice}
              </span>
            </div>
            <p style={{ fontSize: "10px", fontWeight: "700", marginTop: "4px" }}>
              ₹{codprice} will be charged extra for cash on delivery option
            </p>
          </div>
        </div>
      )}

      {/* Time Slots + Pay Now */}
      {city?.toLowerCase().includes("jaipur") &&
      parseFloat(distance) < 25 ? (
        <>
          <TimeSlots />
          <button
            className="pay-now-btn-checkoutbuy"
            onClick={() => {
              orderplaced(
                pricedCart,
                deleveryaddress,
                walletToUse,
                payableAmount,
                timeslotlelo,
                "online"
              );
            }}
          >
            Pay Now
          </button>
        </>
      ) : (
        <button
          className="pay-now-btn-checkoutbuy"
          onClick={() =>
            orderplaced(
              pricedCart,
              deleveryaddress,
              walletToUse,
              paymentmode === "cod"
                ? payableAmount + codprice
                : payableAmount - upiprice,
              "",
              paymentmode
            )
          }
        >
          {paymentmode === "cod" ? "Confirm Order" : "Pay Now"}
        </button>
      )}

      {/* Coupon Toast */}
      {yppicode && coupons?.length > 0 && (
        <Slideuptoast
          coupon={coupons}
          firstcpns={firstcpn}
          totalDiscountPrice={totalDiscountPrice}
          onClose={() => setyppicode(false)}
        />
      )}

      {/* Bottom Sheet — Review Items */}
      <div
        className="bottom-sheet"
        style={{ display: showSheet ? "block" : "none" }}
      >
        <p>Review item</p>
        <button onClick={toggleSheet} className="closed-button">
          ✖
        </button>
        {purchaseproduct.map((order, i) =>
          Array.isArray(order.bundle) && order.bundle.length > 0 ? (
            <BundleProduct
              key={i}
              source="checkout"
              originalPrice={
                order.bundle[0].price + (order.bundle[1]?.price || 300)
              }
              totalPrice={1000}
              products={[{ ...order.bundle[0] }, { ...order.bundle[1] }]}
            />
          ) : (
            <div key={i} className="sheet-content">
              <div className="item-info">
                <img
                  src={order.image}
                  alt="Product"
                  className="product-image-sheet"
                  loading="lazy"
                />
                <div className="item-details">
                  {/* Show membership price if applicable */}
                  <span className="item-price">
                    ₹{getMembershipPrice(order, member.isMember ? member.memberType : null)}
                    {isMember &&
                      getMembershipPrice(order, member.memberType) !==
                        (order.discountprice ?? order.price) && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#999",
                            fontSize: "11px",
                            marginLeft: "6px",
                          }}
                        >
                          ₹{order.discountprice ?? order.price}
                        </span>
                      )}
                  </span>
                  <h4>{order.description}</h4>
                  <p>
                    Size: {order.size} &nbsp;&nbsp; Qty: {order.qty}
                  </p>
                  <p className="delivery-info">
                    Deliver by{" "}
                    <span className="delivery-date">
                      {timeslotlelo || "60 minute delivery"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Checkout;