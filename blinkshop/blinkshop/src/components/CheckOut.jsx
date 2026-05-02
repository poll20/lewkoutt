
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
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import "./CheckOut.css";
// import { useBio } from "./BioContext";
// import { IoIosArrowForward } from "react-icons/io";
// import { NavLink, useLocation } from "react-router-dom";
// import { useFirebaseAuth } from "./FirebaseContext";
// import phonepay from "../components/image/phonepay.png";
// import paytm from "../components/image/paytm.png";
// import googlepay from "../components/image/gpay.webp";
// import TimeSlots from "./TimeSlots";
// import Slideuptoast from "./Slideuptoast";
// import BundleProduct from "./BundleProduct";

// // ─────────────────────────────────────────────────────────────────────────────
// // CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────
// const COD_SURCHARGE = 50;
// const UPI_DISCOUNT = 20;
// const MEMBER_DELIVERY_CHARGE = 100;
// const MIN_FREE_DELIVERY_AMOUNT = 799;
// const LOW_ORDER_DELIVERY_CHARGE = 50;

// // ─────────────────────────────────────────────────────────────────────────────
// // HELPERS
// // ─────────────────────────────────────────────────────────────────────────────

// /** Extract a clean category keyword from any item field */
// const extractCategory = (item) => {
//   const raw = (
//     item?.cate ||
//     item?.category ||
//     item?.description ||
//     item?.title ||
//     ""
//   )
//     .toString()
//     .toLowerCase();

//   const match = raw.match(/\b(tops?|dresses?)\b/);
//   return match ? match[0].replace(/s$/, "") : null; // normalise: "tops"→"top", "dresses"→"dress"
// };

// /**
//  * Returns the membership-adjusted discountprice for a single item.
//  * Does NOT mutate the original item.
//  *
//  * Pricing rules:
//  *  Silver → tops = ₹299, everything else = original price
//  *  Gold   → tops = ₹299, everything else = ₹599
//  */
// const getMembershipPrice = (item, memberType) => {
//   const category = extractCategory(item);
//   const original = item?.discountprice ?? item?.price ?? 0;

//   if (memberType === "silver") {
//     if (category === "top") return 299;
//     return original;
//   }

//   if (memberType === "gold") {
//     if (category === "top") return 299;
//     return 599; // ✅ FIXED: was `category != "tops"` which always evaluated true
//   }

//   return original;
// };

// /** Returns a new cart array with membership prices applied (non-mutating) */
// const applyMembershipPricing = (cartItems, member) => {
//   if (!member?.isMember || !member?.memberType) return cartItems;
//   return cartItems.map((item) => ({
//     ...item,
//     discountprice: getMembershipPrice(item, member.memberType),
//   }));
// };

// /** True only when every item in the cart is a "top" */
// const isOnlyTopCart = (cartItems) =>
//   cartItems.length > 0 &&
//   cartItems.every((item) => extractCategory(item) === "top");

// /** Parse "15.7 km" or "1,234 km" → 15.7 */
// const parseDistance = (raw) => {
//   if (!raw) return NaN;
//   return parseFloat(raw.toString().replace(/,/g, "").replace(/km/i, "").trim());
// };

// /** Distance-based delivery charge for non-members (within 16-25 km band) */
// const getDistanceCharge = (km) => {
//   if (km >= 16 && km <= 18) return 49;
//   if (km > 18 && km <= 21) return 70;
//   if (km > 21 && km <= 25) return 80;
//   return 0;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // MEMBERSHIP TOAST
// // ─────────────────────────────────────────────────────────────────────────────
// const MembershipToast = ({ memberType, onClose }) => {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3500);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   const label =
//     memberType
//       ? memberType.charAt(0).toUpperCase() + memberType.slice(1)
//       : "Member";

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "24px",
//         left: "50%",
//         transform: "translateX(-50%)",
//         zIndex: 9999,
//         background: "linear-gradient(135deg,#22c55e 0%,#16a34a 100%)",
//         color: "#fff",
//         padding: "12px 24px",
//         borderRadius: "50px",
//         boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         fontSize: "14px",
//         fontWeight: "700",
//         whiteSpace: "nowrap",
//         animation: "slideUpFadeIn 0.4s ease",
//         letterSpacing: "0.2px",
//       }}
//     >
//       <style>{`
//         @keyframes slideUpFadeIn {
//           from { opacity:0; transform:translateX(-50%) translateY(20px); }
//           to   { opacity:1; transform:translateX(-50%) translateY(0); }
//         }
//       `}</style>
//       <span style={{ fontSize: "18px" }}>🎉</span>
//       Yaay! {label} Membership is Applied!
//       <button
//         onClick={onClose}
//         style={{
//           background: "rgba(255,255,255,0.25)",
//           border: "none",
//           borderRadius: "50%",
//           color: "#fff",
//           cursor: "pointer",
//           width: "20px",
//           height: "20px",
//           fontSize: "12px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginLeft: "4px",
//           flexShrink: 0,
//         }}
//       >
//         ✕
//       </button>
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // CHECKOUT COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
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
//     karocode,
//   } = useBio();

//   const { userDetails } = useFirebaseAuth();
//   const location = useLocation();

//   // ── UI state ────────────────────────────────────────────────────────────────
//   const [paymentmode, setPaymentMode] = useState(""); // "cod" | "online" | ""
//   const [showSheet, setShowSheet] = useState(false);
//   const [showMembershipToast, setShowMembershipToast] = useState(false);
//   const [yppicode, setYppicode] = useState(false);

//   // ── Coupon state ─────────────────────────────────────────────────────────────
//   const [firstcpn, setFirstcpn] = useState(null);
//   const [couponDiscount, setCouponDiscount] = useState(0);

//   // ── Distance ─────────────────────────────────────────────────────────────────
//   const [numericDistance, setNumericDistance] = useState(0);
//   const [deliveryCharge, setDeliveryCharge] = useState(
//     () => JSON.parse(localStorage.getItem("checkoutDeliveryCharge")) ?? 0
//   );

//   // ── Cart & address (persisted) ────────────────────────────────────────────────
//   const [purchaseproduct, setPurchaseproduct] = useState(
//     () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
//   );

//   const [deliveryAddress, setDeliveryAddress] = useState(
//     () =>
//       JSON.parse(localStorage.getItem("checkoutAddress")) ||
//       addresssetkro ||
//       []
//   );

//   const [mywalletAmount, setMywalletAmount] = useState(
//     () =>
//       JSON.parse(localStorage.getItem("checkoutWallet")) ?? walletkapesa ?? 0
//   );

//   // ── Membership ───────────────────────────────────────────────────────────────
//   // Derive safely; never rely on a possibly-undefined nested value mid-render
//   const member = useMemo(
//     () => userDetails?.member ?? { isMember: false, memberType: null },
//     [userDetails]
//   );
//   const isMember = member.isMember === true;
//   const memberType = member.memberType ?? null;

//   // ── pricedCart: memoised — recomputes only when cart or membership changes ──
//   const pricedCart = useMemo(
//     () => applyMembershipPricing(purchaseproduct, member),
//     [purchaseproduct, member]
//   );

//   // ── Totals (derived, no extra state needed) ───────────────────────────────────
//   const totalMRP = useMemo(
//     () => purchaseproduct.reduce((s, i) => s + (i.price ?? 0), 0),
//     [purchaseproduct]
//   );

//   const totalDiscountPrice = useMemo(
//     () => pricedCart.reduce((s, i) => s + (i.discountprice ?? i.price ?? 0), 0),
//     [pricedCart]
//   );

//   // Savings from membership alone (compare raw discountprice vs membership price)
//   const memberSavings = useMemo(() => {
//     if (!isMember) return 0;
//     const rawTotal = purchaseproduct.reduce(
//       (s, i) => s + (i.discountprice ?? i.price ?? 0),
//       0
//     );
//     return Math.max(0, rawTotal - totalDiscountPrice);
//   }, [isMember, purchaseproduct, totalDiscountPrice]);

//   const amountAfterCoupon = totalDiscountPrice - couponDiscount;
//   const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
//   const payableAmount = amountAfterCoupon - walletToUse + deliveryCharge;

//   const city = deliveryAddress?.[0]?.city?.toString().trim().toLowerCase() ?? "";
//   const isJaipur = city.includes("jaipur");
//   const isFarDelivery = numericDistance > 25;
//   const isLocalDelivery = isJaipur && numericDistance <= 25 && numericDistance > 0;

//   // ─────────────────────────────────────────────────────────────────────────────
//   // EFFECTS
//   // ─────────────────────────────────────────────────────────────────────────────

//   // Show membership toast once when membership data is confirmed
//   useEffect(() => {
//     if (isMember) setShowMembershipToast(true);
//   }, [isMember]);

//   // Sync address from context
//   useEffect(() => {
//     if (addresssetkro?.length) {
//       setDeliveryAddress(addresssetkro);
//       localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
//     }
//   }, [addresssetkro]);

//   // Persist cart
//   useEffect(() => {
//     localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct));
//   }, [purchaseproduct]);

//   // Persist address
//   useEffect(() => {
//     localStorage.setItem("checkoutAddress", JSON.stringify(deliveryAddress));
//   }, [deliveryAddress]);

//   // Persist wallet
//   useEffect(() => {
//     localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount));
//   }, [mywalletAmount]);

//   // Fetch distance whenever address changes
//   useEffect(() => {
//     if (deliveryAddress?.length > 0) {
//       fetchDistance(deliveryAddress);
//     }
//   }, [deliveryAddress]); // eslint-disable-line react-hooks/exhaustive-deps

//   // Compute delivery charge whenever distance OR membership changes
//   useEffect(() => {
//     const km = parseDistance(distance);
//     if (isNaN(km)) return;

//     setNumericDistance(km);

//     let charge = 0;

//     if (isMember) {
//       // Members: flat ₹100 for silver-only-tops or all gold orders
//       const onlyTop = isOnlyTopCart(purchaseproduct);
//       if (memberType === "silver" && onlyTop) charge = MEMBER_DELIVERY_CHARGE;
//       else if (memberType === "gold") charge = MEMBER_DELIVERY_CHARGE;
//       else charge = getDistanceCharge(km); // silver buying non-tops falls back to normal
//     } else {
//       charge = getDistanceCharge(km);
//     }

//     setDeliveryCharge(charge);
//     localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(charge));
//   }, [distance, isMember, memberType, purchaseproduct]); // ✅ FIXED: added all deps

//   // Non-member low-order delivery surcharge (applied AFTER payableAmount stabilises)
//   // ✅ FIXED: guard isMember so this never fires for members
//   useEffect(() => {
//     if (isMember) return;
//     if (payableAmount > 0 && payableAmount < MIN_FREE_DELIVERY_AMOUNT) {
//       setDeliveryCharge((prev) => {
//         const next = LOW_ORDER_DELIVERY_CHARGE;
//         if (prev === next) return prev; // avoid infinite loop
//         localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(next));
//         return next;
//       });
//     }
//   }, [payableAmount, isMember]);

//   // Wallet: cap at 10 % of order — use pricedCart total ✅ FIXED dep array
//   useEffect(() => {
//     const cashback = userDetails?.wallet?.cashback;
//     if (!cashback) return;
//     const tenPercent = totalDiscountPrice * 0.1;
//     setMywalletAmount(Math.min(cashback, tenPercent));
//   }, [totalDiscountPrice, userDetails]); // ✅ FIXED: was [purchaseproduct, userDetails] — stale

//   // Clear localStorage on unmount (unless going to address page)
//   useEffect(() => {
//     return () => {
//       if (location.pathname !== "/address/chek") {
//         localStorage.removeItem("checkoutCart");
//         localStorage.removeItem("checkoutAddress");
//         localStorage.removeItem("checkoutWallet");
//         localStorage.removeItem("checkoutCoupon");
//         localStorage.removeItem("checkoutDeliveryCharge");
//       }
//     };
//   }, [location.pathname]);

//   // Fetch coupons when cart is ready
//   useEffect(() => {
//     if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
//       fetchCoupons("all", "all");
//     }
//   }, [purchaseproduct]); // eslint-disable-line react-hooks/exhaustive-deps

//   // Re-fetch coupons when returning to checkout page
//   useEffect(() => {
//     const first = purchaseproduct?.[0];
//     if (first?.cate && first?.tag) {
//       fetchCoupons("all", "all");
//     }
//   }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

//   // Apply coupon
//   useEffect(() => {
//     if (!coupons?.length || !purchaseproduct?.length) {
//       setFirstcpn(null);
//       setCouponDiscount(0);
//       setYppicode(false);
//       return;
//     }

//     const couponToApply = karocode?.length
//       ? coupons.find((c) => c?.code === karocode)
//       : coupons.find((c) => c?.couponType === "First Order");

//     if (couponToApply) {
//       const isPercent = couponToApply?.discountType === "Percentage";
//       const value = Number(couponToApply?.discountValue ?? 0);
//       const discount = isPercent
//         ? (totalDiscountPrice * value) / 100
//         : value;

//       setFirstcpn(couponToApply);
//       setCouponDiscount(discount);
//       setYppicode(true);
//     } else {
//       setFirstcpn(null);
//       setCouponDiscount(0);
//       setYppicode(false);
//     }
//   }, [coupons, totalDiscountPrice, karocode, purchaseproduct]);

//   // Facebook Pixel — ✅ FIXED: purchaseproduct is an array, iterate correctly
//   useEffect(() => {
//     if (!window.fbq || !purchaseproduct?.length) return;
//     window.fbq("track", "InitiateCheckout", {
//       content_ids: purchaseproduct.map((p) => `SKU_${p._id}`),
//       content_type: "product",
//       contents: purchaseproduct.map((p) => ({
//         id: `SKU_${p._id}`,
//         name: p.title,
//         quantity: p.qty ?? 1,
//         item_price: p.discountprice ?? p.price,
//       })),
//       value: totalDiscountPrice,
//       currency: "INR",
//       num_items: purchaseproduct.length,
//     });
//   }, [purchaseproduct]); // eslint-disable-line react-hooks/exhaustive-deps

//   // ─────────────────────────────────────────────────────────────────────────────
//   // HANDLERS
//   // ─────────────────────────────────────────────────────────────────────────────

//   const toggleSheet = useCallback(() => setShowSheet((s) => !s), []);

//   /** Place order — chooses correct price based on payment mode */
//   const handlePayNow = useCallback(() => {
//     let finalAmount = payableAmount;
//     let mode = "online";

//     if (paymentmode === "cod") {
//       finalAmount = payableAmount + COD_SURCHARGE;
//       mode = "cod";
//     } else if (isFarDelivery) {
//       // Far delivery always shows UPI/online options with ₹20 off
//       finalAmount = payableAmount - UPI_DISCOUNT;
//     }

//     orderplaced(pricedCart, deliveryAddress, walletToUse, finalAmount, timeslotlelo ?? "", mode);
//   }, [
//     payableAmount,
//     paymentmode,
//     isFarDelivery,
//     pricedCart,
//     deliveryAddress,
//     walletToUse,
//     timeslotlelo,
//     orderplaced,
//   ]);

//   const handleOnlinePayment = useCallback(() => {
//     orderplaced(
//       pricedCart,
//       deliveryAddress,
//       walletToUse,
//       payableAmount - UPI_DISCOUNT,
//       timeslotlelo ?? "",
//       "online"
//     );
//   }, [pricedCart, deliveryAddress, walletToUse, payableAmount, timeslotlelo, orderplaced]);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="checkout-container-checkoutbuy">
//       <h2 className="checkout-title-checkoutbuy">Checkout</h2>

//       {/* Membership Toast */}
//       {showMembershipToast && (
//         <MembershipToast
//           memberType={memberType}
//           onClose={() => setShowMembershipToast(false)}
//         />
//       )}

//       {/* Membership Badge */}
//       {isMember && (
//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "6px",
//             background: "linear-gradient(135deg,#bbf7d0,#86efac)",
//             color: "#15803d",
//             fontSize: "12px",
//             fontWeight: "700",
//             padding: "5px 14px",
//             borderRadius: "50px",
//             marginBottom: "12px",
//             letterSpacing: "0.3px",
//           }}
//         >
//           {memberType === "gold" ? "🥇" : "🥈"}{" "}
//           {memberType?.charAt(0).toUpperCase() + memberType?.slice(1)} Member —
//           Special Prices Applied
//         </div>
//       )}

//       {/* Address */}
//       <NavLink to="/address/chek" className="navlink">
//         <div className="address-section-checkoutbuy">
//           <span>
//             {deliveryAddress?.length > 0
//               ? `${deliveryAddress[0]?.building}/${deliveryAddress[0]?.locality}, ${deliveryAddress[0]?.city}`
//               : "No address available"}
//           </span>
//         </div>
//       </NavLink>

//       {/* Review Items */}
//       <div className="review-item-section-checkoutbuy">
//         <span onClick={toggleSheet}>Review item</span>
//         <IoIosArrowForward onClick={toggleSheet} />
//       </div>

//       {/* Coupon */}
//       <div
//         className="coupons-section-checkoutbuy"
//         onClick={() => setYppicode(true)}
//       >
//         <span style={{ fontWeight: "600" }}>
//           {firstcpn?.code ? `${firstcpn.code} Applied` : "Apply Coupon"}
//         </span>
//         <span style={{ color: "red", fontWeight: "800" }}>
//           {couponDiscount ? `₹${couponDiscount}` : ""}
//           <IoIosArrowForward style={{ color: "black" }} />
//         </span>
//       </div>

//       {/* Order Details */}
//       <div className="order-details-checkoutbuy">
//         <h3>Order Details</h3>

//         <div className="order-row-checkoutbuy">
//           <span>MRP</span>
//           <span>₹{totalMRP}.0</span>
//         </div>
//         <div className="order-row-checkoutbuy">
//           <span>Discount on MRP</span>
//           <span>₹{totalMRP - totalDiscountPrice}.0</span>
//         </div>
//         <div className="order-row-checkoutbuy">
//           <span>Discounted Price</span>
//           <span>₹{totalDiscountPrice}.0</span>
//         </div>

//         {/* Membership savings row */}
//         {isMember && memberSavings > 0 && (
//           <div className="order-row-checkoutbuy">
//             <span>
//               {memberType?.charAt(0).toUpperCase() + memberType?.slice(1)} Member Discount
//             </span>
//             <span style={{ color: "#16a34a", fontWeight: "700" }}>
//               −₹{memberSavings}.0
//             </span>
//           </div>
//         )}

//         {couponDiscount > 0 && (
//           <div className="order-row-checkoutbuy">
//             <span>Coupon Applied</span>
//             <span>−₹{couponDiscount}.0</span>
//           </div>
//         )}

//         <div className="order-row-checkoutbuy">
//           <span>Wallet</span>
//           <span className="text-green-600 font-semibold text-[16px]">
//             −₹{mywalletAmount.toFixed(2)}
//           </span>
//         </div>

//         <div className="order-row-checkoutbuy">
//           <span style={{ display: "flex", flexDirection: "column" }}>
//             <span>Delivery Charges</span>
//             {deliveryCharge > 0 && (
//               <span style={{ fontSize: "10px", color: "#888" }}>
//                 {isMember ? "(Member flat rate)" : "(Distance-based fee)"}
//               </span>
//             )}
//           </span>
//           <span className="text-green-600 font-semibold text-[16px]">
//             ₹{deliveryCharge}
//           </span>
//         </div>

//         <div className="order-row-checkoutbuy payable-row-checkoutbuy">
//           <span>Payable amount</span>
//           <span>₹{payableAmount}.0</span>
//         </div>

//         <p className="discount-text-checkoutbuy">
//           🎉 Yay! You saved ₹{(walletToUse + couponDiscount + memberSavings).toFixed(2)} on the
//           final amount
//         </p>
//       </div>

//       {/* ── Far delivery (> 25 km): show payment method chooser ── */}
//       {isFarDelivery && (
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: "12px",
//             padding: "14px",
//             marginTop: "12px",
//             boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
//             border: "1px solid #eee",
//           }}
//         >
//           <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
//             Pay via
//             <span style={{ fontSize: "11px", color: "#666", marginLeft: "6px" }}>
//               ⚡ Enjoy fast delivery on all prepaid orders.
//             </span>
//           </div>

//           {/* UPI Section */}
//           <div
//             style={{
//               border: "1px solid #e5e5e5",
//               borderRadius: "10px",
//               padding: "10px",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <span style={{ fontWeight: "600", fontSize: "15px" }}>UPI payment</span>
//               <span
//                 style={{
//                   fontSize: "10px",
//                   fontWeight: "600",
//                   background: "#fef3ea",
//                   color: "#de4e0b",
//                   padding: "2px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 enjoy ₹{UPI_DISCOUNT} off
//               </span>
//               <span>
//                 <span
//                   style={{
//                     textDecoration: "line-through",
//                     color: "#999",
//                     fontSize: "12px",
//                   }}
//                 >
//                   ₹{payableAmount}
//                 </span>{" "}
//                 <span style={{ fontWeight: "700" }}>₹{payableAmount - UPI_DISCOUNT}</span>
//               </span>
//             </div>

//             <div
//               style={{
//                 background: "#e9f7ee",
//                 color: "#1b7f3a",
//                 fontSize: "12px",
//                 padding: "6px",
//                 borderRadius: "6px",
//                 marginTop: "6px",
//                 textAlign: "center",
//                 fontWeight: "600",
//               }}
//             >
//               Pay online and save ₹{UPI_DISCOUNT}
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
//               {[phonepay, paytm, googlepay].map((src, i) => (
//                 <div
//                   key={i}
//                   onClick={handleOnlinePayment}
//                   style={{
//                     border: "1px solid #ddd",
//                     borderRadius: "8px",
//                     padding: "8px",
//                     width: "23%",
//                     textAlign: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <img
//                     src={src}
//                     alt="UPI"
//                     style={{ width: "100%", height: "30px", objectFit: "contain" }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Other Online Methods */}
//           {["Credit / Debit Card", "Net Banking", "Wallets"].map((method, i) => (
//             <div
//               key={i}
//               onClick={handleOnlinePayment}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px",
//                 borderBottom: "1px solid #eee",
//                 cursor: "pointer",
//               }}
//             >
//               <span style={{ fontWeight: "500" }}>{method}</span>
//               <span
//                 style={{
//                   fontSize: "10px",
//                   fontWeight: "600",
//                   background: "#fef3ea",
//                   color: "#de4e0b",
//                   padding: "2px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 enjoy ₹{UPI_DISCOUNT} off
//               </span>
//               <span style={{ color: "#1b7f3a", fontSize: "12px", fontWeight: "600" }}>
//                 ₹{payableAmount - UPI_DISCOUNT}
//               </span>
//             </div>
//           ))}

//           {/* COD */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               padding: "10px",
//               marginTop: "6px",
//               cursor: "pointer",
//             }}
//             onClick={() => setPaymentMode("cod")}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <label
//                 style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
//               >
//                 <input
//                   type="radio"
//                   name="paymentMode"
//                   value="cod"
//                   checked={paymentmode === "cod"}
//                   onChange={() => setPaymentMode("cod")}
//                 />
//                 <span style={{ fontWeight: "500" }}>Cash on delivery</span>
//               </label>
//               <span style={{ color: "#e53935", fontSize: "12px", fontWeight: "700" }}>
//                 ₹{payableAmount + COD_SURCHARGE}
//               </span>
//             </div>
//             <p style={{ fontSize: "10px", fontWeight: "700", marginTop: "4px", color: "#555" }}>
//               ₹{COD_SURCHARGE} extra charged for cash on delivery
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ── Pay Now / Time Slots ── */}
//       {isLocalDelivery ? (
//         <>
//           <TimeSlots />
//           <button
//             className="pay-now-btn-checkoutbuy"
//             onClick={() =>
//               orderplaced(pricedCart, deliveryAddress, walletToUse, payableAmount, timeslotlelo ?? "", "online")
//             }
//           >
//             Pay Now
//           </button>
//         </>
//       ) : (
//         <button className="pay-now-btn-checkoutbuy" onClick={handlePayNow}>
//           {paymentmode === "cod" ? "Confirm Order" : "Pay Now"}
//         </button>
//       )}

//       {/* Coupon Slideup Toast */}
//       {yppicode && coupons?.length > 0 && (
//         <Slideuptoast
//           coupon={coupons}
//           firstcpns={firstcpn}
//           totalDiscountPrice={totalDiscountPrice}
//           onClose={() => setYppicode(false)}
//         />
//       )}

//       {/* Bottom Sheet — Review Items */}
//       <div className="bottom-sheet" style={{ display: showSheet ? "block" : "none" }}>
//         <p>Review item</p>
//         <button onClick={toggleSheet} className="closed-button">
//           ✖
//         </button>
//         {purchaseproduct.map((order, i) =>
//           Array.isArray(order.bundle) && order.bundle.length > 0 ? (
//             <BundleProduct
//               key={i}
//               source="checkout"
//               originalPrice={order.bundle[0].price + (order.bundle[1]?.price ?? 300)}
//               totalPrice={1000}
//               products={[{ ...order.bundle[0] }, { ...order.bundle[1] }]}
//             />
//           ) : (
//             <div key={i} className="sheet-content">
//               <div className="item-info">
//                 <img
//                   src={order.image}
//                   alt="Product"
//                   className="product-image-sheet"
//                   loading="lazy"
//                 />
//                 <div className="item-details">
//                   <span className="item-price">
//                     ₹{getMembershipPrice(order, isMember ? memberType : null)}
//                     {isMember &&
//                       getMembershipPrice(order, memberType) !==
//                         (order.discountprice ?? order.price) && (
//                         <span
//                           style={{
//                             textDecoration: "line-through",
//                             color: "#999",
//                             fontSize: "11px",
//                             marginLeft: "6px",
//                           }}
//                         >
//                           ₹{order.discountprice ?? order.price}
//                         </span>
//                       )}
//                   </span>
//                   <h4>{order.description}</h4>
//                   <p>
//                     Size: {order.size}&nbsp;&nbsp;Qty: {order.qty}
//                   </p>
//                   <p className="delivery-info">
//                     Deliver by{" "}
//                     <span className="delivery-date">
//                       {timeslotlelo || "60 minute delivery"}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;















import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./CheckOut.css";
import { useBio } from "./BioContext";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";
import phonepay from "../components/image/phonepay.png";
import paytm from "../components/image/paytm.png";
import googlepay from "../components/image/gpay.webp";
import TimeSlots from "./TimeSlots";
import Slideuptoast from "./Slideuptoast";
import BundleProduct from "./BundleProduct";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const COD_SURCHARGE = 50;
const UPI_DISCOUNT = 20;
const MEMBER_DELIVERY_CHARGE = 100;
const MIN_FREE_DELIVERY_AMOUNT = 799;
const LOW_ORDER_DELIVERY_CHARGE = 50;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Extract a clean category keyword from any item field */
const extractCategory = (item) => {
  const raw = (
    item?.cate ||
    item?.category ||
    item?.description ||
    item?.title ||
    ""
  )
    .toString()
    .toLowerCase();
console.log("raww,",raw)
  const match = raw.match(/\b(tops?|dresses?|Dresses)\b/);
  return match ? match[0].replace(/s$/, "") : "dress"; // normalise: "tops"→"top", "dresses"→"dress"
};

/**
 * Returns the membership-adjusted discountprice for a single item.
 * Does NOT mutate the original item.
 *
 * Pricing rules:
 *  Silver → tops = ₹299, everything else = original price
 *  Gold   → tops = ₹299, everything else = ₹599
 */
const getMembershipPrice = (item, memberType) => {
  const category = extractCategory(item);
  console.log("catwgory",item,category,memberType)
  const original = item?.discountprice ?? item?.price ?? 0;

  if (memberType === "silver") {
    if (category === "top") return 399;
    return original;
  }

  if (memberType === "gold") {
    if (category === "top") return 399;
    return 650; // ✅ FIXED: was `category != "tops"` which always evaluated true
  }

  return original;
};

/** Returns a new cart array with membership prices applied (non-mutating) */
const applyMembershipPricing = (cartItems, member) => {
  if (!member?.isMember || !member?.memberType) return cartItems;
  return cartItems.map((item) => ({
    ...item,
    discountprice: getMembershipPrice(item, member.memberType),
  }));
};

/** True only when every item in the cart is a "top" */
const isOnlyTopCart = (cartItems) =>
  cartItems.length > 0 &&
  cartItems.every((item) => extractCategory(item) === "top");

/** Parse "15.7 km" or "1,234 km" → 15.7 */
const parseDistance = (raw) => {
  if (!raw) return NaN;
  return parseFloat(raw.toString().replace(/,/g, "").replace(/km/i, "").trim());
};

/** Distance-based delivery charge for non-members (within 16-25 km band) */
const getDistanceCharge = (km) => {
  if (km >= 16 && km <= 18) return 49;
  if (km > 18 && km <= 21) return 70;
  if (km > 21 && km <= 25) return 80;
  return 0;
};

// ─────────────────────────────────────────────────────────────────────────────
// MEMBERSHIP TOAST
// ─────────────────────────────────────────────────────────────────────────────
const MembershipToast = ({ memberType, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const label =
    memberType
      ? memberType.charAt(0).toUpperCase() + memberType.slice(1)
      : "Member";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "linear-gradient(135deg,#22c55e 0%,#16a34a 100%)",
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
      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity:0; transform:translateX(-50%) translateY(20px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>
      <span style={{ fontSize: "18px" }}>🎉</span>
      Yaay! {label} Membership is Applied!
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
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
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

  // ── UI state ────────────────────────────────────────────────────────────────
  const [paymentmode, setPaymentMode] = useState(""); // "cod" | "online" | ""
  const [showSheet, setShowSheet] = useState(false);
  const [showMembershipToast, setShowMembershipToast] = useState(false);
  const [yppicode, setYppicode] = useState(false);

  // ── Coupon state ─────────────────────────────────────────────────────────────
  const [firstcpn, setFirstcpn] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // ── Distance ─────────────────────────────────────────────────────────────────
  const [numericDistance, setNumericDistance] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(
    () => JSON.parse(localStorage.getItem("checkoutDeliveryCharge")) ?? 0
  );

  // ── Cart & address (persisted) ────────────────────────────────────────────────
  const [purchaseproduct, setPurchaseproduct] = useState(
    () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
  );

  const [deliveryAddress, setDeliveryAddress] = useState(
    () =>
      JSON.parse(localStorage.getItem("checkoutAddress")) ||
      addresssetkro ||
      []
  );

  const [mywalletAmount, setMywalletAmount] = useState(
    () =>
      JSON.parse(localStorage.getItem("checkoutWallet")) ?? walletkapesa ?? 0
  );

  // ── Membership ───────────────────────────────────────────────────────────────
  // Derive safely; never rely on a possibly-undefined nested value mid-render
  const member = useMemo(
    () => userDetails?.member ?? { isMember: false, memberType: null },
    [userDetails]
  );
  const isMember = member.isMember === true;
  const memberType = member.memberType ?? null;

  // ── pricedCart: memoised — recomputes only when cart or membership changes ──
  const pricedCart = useMemo(
    () => applyMembershipPricing(purchaseproduct, member),
    [purchaseproduct, member]
  );

  // ── Totals (derived, no extra state needed) ───────────────────────────────────
  const totalMRP = useMemo(
    () => purchaseproduct.reduce((s, i) => s + (i.price ?? 0), 0),
    [purchaseproduct]
  );

  const totalDiscountPrice = useMemo(
    () => pricedCart.reduce((s, i) => s + (i.discountprice ?? i.price ?? 0), 0),
    [pricedCart]
  );

  // Savings from membership alone (compare raw discountprice vs membership price)
  const memberSavings = useMemo(() => {
    if (!isMember) return 0;
    const rawTotal = purchaseproduct.reduce(
      (s, i) => s + (i.discountprice ?? i.price ?? 0),
      0
    );
    return Math.max(0, rawTotal - totalDiscountPrice);
  }, [isMember, purchaseproduct, totalDiscountPrice]);

  const amountAfterCoupon = totalDiscountPrice - couponDiscount;
  const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
  const payableAmount = amountAfterCoupon - walletToUse + deliveryCharge;

  const city = deliveryAddress?.[0]?.city?.toString().trim().toLowerCase() ?? "";
  const isJaipur = city.includes("jaipur");
  const isFarDelivery = numericDistance > 25;
  const isLocalDelivery = isJaipur && numericDistance <= 25 && numericDistance > 0;

  // ─────────────────────────────────────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────────────────────────────────────

  // Show membership toast once when membership data is confirmed
  useEffect(() => {
    if (isMember) setShowMembershipToast(true);
  }, [isMember]);

  // Sync address from context
  useEffect(() => {
    if (addresssetkro?.length) {
      setDeliveryAddress(addresssetkro);
      localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
    }
  }, [addresssetkro]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct));
  }, [purchaseproduct]);

  // Persist address
  useEffect(() => {
    localStorage.setItem("checkoutAddress", JSON.stringify(deliveryAddress));
  }, [deliveryAddress]);

  // Persist wallet
  useEffect(() => {
    localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount));
  }, [mywalletAmount]);

  // Fetch distance whenever address changes
  useEffect(() => {
    if (deliveryAddress?.length > 0) {
      fetchDistance(deliveryAddress);
    }
  }, [deliveryAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  // Compute delivery charge whenever distance OR membership changes
  useEffect(() => {
    const km = parseDistance(distance);
    if (isNaN(km)) return;

    setNumericDistance(km);

    let charge = 0;

    if (isMember) {
      // Members: flat ₹100 for silver-only-tops or all gold orders
      const onlyTop = isOnlyTopCart(purchaseproduct);
      if (memberType === "silver" && onlyTop) charge = MEMBER_DELIVERY_CHARGE;
      else if (memberType === "gold") charge = MEMBER_DELIVERY_CHARGE;
      else charge = getDistanceCharge(km); // silver buying non-tops falls back to normal
    } else {
      charge = getDistanceCharge(km);
    }

    setDeliveryCharge(charge);
    localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(charge));
  }, [distance, isMember, memberType, purchaseproduct]); // ✅ FIXED: added all deps

  // Non-member low-order delivery surcharge (applied AFTER payableAmount stabilises)
  // ✅ FIXED: guard isMember so this never fires for members
  useEffect(() => {
    if (isMember) return;
    if (payableAmount > 0 && payableAmount < MIN_FREE_DELIVERY_AMOUNT) {
      setDeliveryCharge((prev) => {
        const next = LOW_ORDER_DELIVERY_CHARGE;
        if (prev === next) return prev; // avoid infinite loop
        localStorage.setItem("checkoutDeliveryCharge", JSON.stringify(next));
        return next;
      });
    }
  }, [payableAmount, isMember]);

  // Wallet: cap at 10 % of order — use pricedCart total ✅ FIXED dep array
  useEffect(() => {
    const cashback = userDetails?.wallet?.cashback;
    if (!cashback) return;
    const tenPercent = totalDiscountPrice * 0.1;
    setMywalletAmount(Math.min(cashback, tenPercent));
  }, [totalDiscountPrice, userDetails]); // ✅ FIXED: was [purchaseproduct, userDetails] — stale

  // Clear localStorage on unmount (unless going to address page)
  useEffect(() => {
    return () => {
      if (location.pathname !== "/address/chek") {
        localStorage.removeItem("checkoutCart");
        localStorage.removeItem("checkoutAddress");
        localStorage.removeItem("checkoutWallet");
        localStorage.removeItem("checkoutCoupon");
        localStorage.removeItem("checkoutDeliveryCharge");
      }
    };
  }, [location.pathname]);

  // ── Coupon eligibility: coupons are BLOCKED when gold member, silver member + all-tops cart ──
  // In that case the membership discount already applies; stacking a coupon is not allowed.
  const isCouponBlocked = useMemo(
    () => memberType === "silver" && isOnlyTopCart(purchaseproduct) || memberType === "gold",
    [memberType, purchaseproduct]
  );

  // ── Fetch coupons: fire once on mount and again every time we land on this page ──
  // We use a single effect keyed on location.pathname so it always re-fires on navigation.
  // A separate mount-only effect handles the very first load when pathname hasn't changed.
  useEffect(() => {
    // Always attempt fetch — fetchCoupons is safe to call with "all","all" unconditionally.
    // The context should deduplicate/cache as needed.
    fetchCoupons("all", "all");
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Apply coupon — runs whenever coupons list, cart, karocode, or block flag changes ──
  // FIX: previously two separate effects meant fetch could complete AFTER the apply effect
  // already ran with an empty list and reset state — and then never re-ran.
  // Now the single source of truth is `coupons` from context: whenever it updates, we re-apply.
  useEffect(() => {
    // 1. Hard block: silver member buying only tops → no coupon allowed
    if (isCouponBlocked) {
      setFirstcpn(null);
      setCouponDiscount(0);
      setYppicode(false);
      return;
    }

    // 2. Nothing to apply yet — coupons still loading or cart empty
    if (!coupons?.length || !purchaseproduct?.length) {
      // Don't reset here — keep existing coupon state while data is still arriving.
      // Only reset if we previously had a coupon but now genuinely have no coupons at all.
      if (!coupons?.length) {
        setFirstcpn(null);
        setCouponDiscount(0);
        setYppicode(false);
      }
      return;
    }

    // 3. Resolve which coupon to apply
    // karocode can be a string or array — normalise to a trimmed string
    const code = Array.isArray(karocode)
      ? karocode[0]?.toString().trim()
      : karocode?.toString().trim();

    const couponToApply = code
      ? coupons.find((c) => c?.code?.toString().trim() === code)       // user-entered code
      : coupons.find((c) => c?.couponType === "First Order");           // auto first-order

    if (!couponToApply) {
      setFirstcpn(null);
      setCouponDiscount(0);
      setYppicode(false);
      return;
    }

    // 4. Calculate discount amount
    const isPercent = couponToApply?.discountType === "Percentage";
    const value = Number(couponToApply?.discountValue ?? 0);
    // const discount = isPercent
    //   ? Math.round((totalDiscountPrice * value) / 100)
    //   : value;
    // 🧠 check cart type
const onlyTop = isOnlyTopCart(purchaseproduct);
const hasDress = purchaseproduct.some(
  (item) => extractCategory(item) != "top"
);

// 🧠 dress total nikalo
const dressTotal = pricedCart
  .filter((item) => extractCategory(item) !="top")
  .reduce((sum, item) => sum + (item.discountprice ?? item.price ?? 0), 0);

// 🧠 decide base amount
let baseAmount = totalDiscountPrice;

// 🔥 MAIN CONDITION
if (memberType === "silver" && !onlyTop && hasDress) {
  baseAmount = dressTotal; // only dress pe discount lagega
}

// 🎯 final discount
const discount = isPercent
  ? Math.round((baseAmount * value) / 100)
  : value;

    setFirstcpn(couponToApply);
    setCouponDiscount(discount);
    setYppicode(true);
  }, [coupons, totalDiscountPrice, karocode, purchaseproduct, isCouponBlocked]);

  // Facebook Pixel — ✅ FIXED: purchaseproduct is an array, iterate correctly
  useEffect(() => {
    if (!window.fbq || !purchaseproduct?.length) return;
    window.fbq("track", "InitiateCheckout", {
      content_ids: purchaseproduct.map((p) => `SKU_${p._id}`),
      content_type: "product",
      contents: purchaseproduct.map((p) => ({
        id: `SKU_${p._id}`,
        name: p.title,
        quantity: p.qty ?? 1,
        item_price: p.discountprice ?? p.price,
      })),
      value: totalDiscountPrice,
      currency: "INR",
      num_items: purchaseproduct.length,
    });
  }, [purchaseproduct]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  const toggleSheet = useCallback(() => setShowSheet((s) => !s), []);

  /** Place order — chooses correct price based on payment mode */
  const handlePayNow = useCallback(() => {
    let finalAmount = payableAmount;
    let mode = "online";

    if (paymentmode === "cod") {
      finalAmount = payableAmount + COD_SURCHARGE;
      mode = "cod";
    } else if (isFarDelivery) {
      // Far delivery always shows UPI/online options with ₹20 off
      finalAmount = payableAmount - UPI_DISCOUNT;
    }

    orderplaced(pricedCart, deliveryAddress, walletToUse, finalAmount, timeslotlelo ?? "", mode);
  }, [
    payableAmount,
    paymentmode,
    isFarDelivery,
    pricedCart,
    deliveryAddress,
    walletToUse,
    timeslotlelo,
    orderplaced,
  ]);

  const handleOnlinePayment = useCallback(() => {
    orderplaced(
      pricedCart,
      deliveryAddress,
      walletToUse,
      payableAmount - UPI_DISCOUNT,
      timeslotlelo ?? "",
      "online"
    );
  }, [pricedCart, deliveryAddress, walletToUse, payableAmount, timeslotlelo, orderplaced]);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* Membership Toast */}
      {showMembershipToast && (
        <MembershipToast
          memberType={memberType}
          onClose={() => setShowMembershipToast(false)}
        />
      )}

      {/* Membership Badge */}
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
          {memberType === "gold" ? "🥇" : "🥈"}{" "}
          {memberType?.charAt(0).toUpperCase() + memberType?.slice(1)} Member —
          Special Prices Applied
        </div>
      )}

      {/* Address */}
      <NavLink to="/address/chek" className="navlink">
        <div className="address-section-checkoutbuy">
          <span>
            {deliveryAddress?.length > 0
              ? `${deliveryAddress[0]?.building}/${deliveryAddress[0]?.locality}, ${deliveryAddress[0]?.city}`
              : "No address available"}
          </span>
        </div>
      </NavLink>

      {/* Review Items */}
      <div className="review-item-section-checkoutbuy">
        <span onClick={toggleSheet}>Review item</span>
        <IoIosArrowForward onClick={toggleSheet} />
      </div>

      {/* Coupon */}
      {isCouponBlocked ? (
        // Silver member buying only tops — membership pricing already covers it; no coupon stacking
        <div
          className="coupons-section-checkoutbuy"
          style={{ opacity: 0.55, cursor: "not-allowed", pointerEvents: "none" }}
        >
          <span style={{ fontWeight: "600", color: "#888" }}>Coupon Not Applicable</span>
          <span style={{ fontSize: "11px", color: "#888", fontStyle: "italic" }}>
            Membership discount already applied.
          </span>
        </div>
      ) : (
        <div
          className="coupons-section-checkoutbuy"
          onClick={() => setYppicode(true)}
        >
          <span style={{ fontWeight: "600" }}>
            {firstcpn?.code ? `${firstcpn.code} Applied` : "Apply Coupon"}
          </span>
          <span style={{ color: "red", fontWeight: "800" }}>
            {couponDiscount ? `₹${couponDiscount}` : ""}
            <IoIosArrowForward style={{ color: "black" }} />
          </span>
        </div>
      )}

      {/* Order Details */}
      <div className="order-details-checkoutbuy">
        <h3>Order Details</h3>

        <div className="order-row-checkoutbuy">
          <span>MRP</span>
          <span>₹{totalMRP}.0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discount on MRP</span>
          <span>₹{totalMRP - totalDiscountPrice}.0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discounted Price</span>
          <span>₹{totalDiscountPrice}.0</span>
        </div>

        {/* Membership savings row */}
        {isMember && memberSavings > 0 && (
          <div className="order-row-checkoutbuy">
            <span>
              {memberType?.charAt(0).toUpperCase() + memberType?.slice(1)} Member Discount
            </span>
            <span style={{ color: "#16a34a", fontWeight: "700" }}>
              −₹{memberSavings}.0
            </span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="order-row-checkoutbuy">
            <span>Coupon Applied</span>
            <span>−₹{couponDiscount}.0</span>
          </div>
        )}

        <div className="order-row-checkoutbuy">
          <span>Wallet</span>
          <span className="text-green-600 font-semibold text-[16px]">
            −₹{mywalletAmount.toFixed(2)}
          </span>
        </div>

        <div className="order-row-checkoutbuy">
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span>Delivery Charges</span>
            {deliveryCharge > 0 && (
              <span style={{ fontSize: "10px", color: "#888" }}>
                {isMember ? "(Member flat rate)" : "(Distance-based fee)"}
              </span>
            )}
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
          🎉 Yay! You saved ₹{(walletToUse + couponDiscount + memberSavings).toFixed(2)} on the
          final amount
        </p>
      </div>

      {/* ── Far delivery (> 25 km): show payment method chooser ── */}
      {isFarDelivery && (
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

          {/* UPI Section */}
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
              <span style={{ fontWeight: "600", fontSize: "15px" }}>UPI payment</span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  background: "#fef3ea",
                  color: "#de4e0b",
                  padding: "2px 10px",
                  borderRadius: "4px",
                }}
              >
                enjoy ₹{UPI_DISCOUNT} off
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
                <span style={{ fontWeight: "700" }}>₹{payableAmount - UPI_DISCOUNT}</span>
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
              Pay online and save ₹{UPI_DISCOUNT}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              {[phonepay, paytm, googlepay].map((src, i) => (
                <div
                  key={i}
                  onClick={handleOnlinePayment}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "23%",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={src}
                    alt="UPI"
                    style={{ width: "100%", height: "30px", objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other Online Methods */}
          {["Credit / Debit Card", "Net Banking", "Wallets"].map((method, i) => (
            <div
              key={i}
              onClick={handleOnlinePayment}
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
                  background: "#fef3ea",
                  color: "#de4e0b",
                  padding: "2px 10px",
                  borderRadius: "4px",
                }}
              >
                enjoy ₹{UPI_DISCOUNT} off
              </span>
              <span style={{ color: "#1b7f3a", fontSize: "12px", fontWeight: "600" }}>
                ₹{payableAmount - UPI_DISCOUNT}
              </span>
            </div>
          ))}

          {/* COD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              marginTop: "6px",
              cursor: "pointer",
            }}
            onClick={() => setPaymentMode("cod")}
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
                style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value="cod"
                  checked={paymentmode === "cod"}
                  onChange={() => setPaymentMode("cod")}
                />
                <span style={{ fontWeight: "500" }}>Cash on delivery</span>
              </label>
              <span style={{ color: "#e53935", fontSize: "12px", fontWeight: "700" }}>
                ₹{payableAmount + COD_SURCHARGE}
              </span>
            </div>
            <p style={{ fontSize: "10px", fontWeight: "700", marginTop: "4px", color: "#555" }}>
              ₹{COD_SURCHARGE} extra charged for cash on delivery
            </p>
          </div>
        </div>
      )}

      {/* ── Pay Now / Time Slots ── */}
      {isLocalDelivery ? (
        <>
          <TimeSlots />
          <button
            className="pay-now-btn-checkoutbuy"
            onClick={() =>
              orderplaced(pricedCart, deliveryAddress, walletToUse, payableAmount, timeslotlelo ?? "", "online")
            }
          >
            Pay Now
          </button>
        </>
      ) : (
        <button className="pay-now-btn-checkoutbuy" onClick={handlePayNow}>
          {paymentmode === "cod" ? "Confirm Order" : "Pay Now"}
        </button>
      )}

      {/* Coupon Slideup Toast */}
      {yppicode && !isCouponBlocked && coupons?.length > 0 && (
        <Slideuptoast
          coupon={coupons}
          firstcpns={firstcpn}
          totalDiscountPrice={totalDiscountPrice}
          onClose={() => setYppicode(false)}
        />
      )}

      {/* Bottom Sheet — Review Items */}
      <div className="bottom-sheet" style={{ display: showSheet ? "block" : "none" }}>
        <p>Review item</p>
        <button onClick={toggleSheet} className="closed-button">
          ✖
        </button>
        {purchaseproduct.map((order, i) =>
          Array.isArray(order.bundle) && order.bundle.length > 0 ? (
            <BundleProduct
              key={i}
              source="checkout"
              originalPrice={order.bundle[0].price + (order.bundle[1]?.price ?? 300)}
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
                  <span className="item-price">
                    ₹{getMembershipPrice(order, isMember ? memberType : null)}
                    {isMember &&
                      getMembershipPrice(order, memberType) !==
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
                    Size: {order.size}&nbsp;&nbsp;Qty: {order.qty}
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