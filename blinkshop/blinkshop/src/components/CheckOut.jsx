
// // import React, { useState, useEffect } from "react";
// // import "./CheckOut.css";
// // import { useBio } from "./BioContext";
// // import { useDashboard } from "./dashboardforadmin/DashboardContext";
// // import { IoIosArrowForward } from "react-icons/io";
// // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // import { useFirebaseAuth } from "./FirebaseContext";

// // import TimeSlots from "./TimeSlots";
// // import paytm from "./image/paytm.png";
// // import phonepay from "./image/phonepay.png";
// // import gpay from "./image/gpay.webp";
// // import upi from "./image/upi.jpeg";
// // import CouponCard from "./CouponCard";
// // import Slideuptoast from "./Slideuptoast";
// // import BundleProduct from "./BundleProduct";

// // const Checkout = () => {
// //   const { buydata, addresssetkro, orderplaced, walletkapesa, timeslotlelo, fetchCoupons, coupons, karocode, fetchDistance, distance } = useBio();
// //   const { userDetails } = useFirebaseAuth();
// //   const { recordMultipleSales } = useDashboard();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [showSheet, setShowSheet] = useState(false);
// //   const [showToast, setShowToast] = useState(false);
// //   const [firstcpn, setfirstcpn] = useState([]);
// //   const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
// //   const [yppicode, setyppicode] = useState(false);
// // const [showmethecpnval,setshowmethecpnval]=useState(0)
// //   const [selectedPayment, setSelectedPayment] = useState(
// //     localStorage.getItem("selectedPayment") || "UPI"
// //   );

// //   const [purchaseproduct, setpurchaseproduct] = useState(
// //     Array.isArray(JSON.parse(localStorage.getItem("purchaseproduct")))
// //       ? JSON.parse(localStorage.getItem("purchaseproduct"))
// //       : (Array.isArray(buydata) ? buydata : [])
// //   );

// //   const [buyDataState, setBuyDataState] = useState(
// //     JSON.parse(localStorage.getItem("buydata")) || buydata || []
// //   );

// //   const [deleveryaddress, setdeleveryadress] = useState(
// //     JSON.parse(localStorage.getItem("deleveryaddress")) || addresssetkro || []
// //   );

// //   const [mywalletSelectedOption, setMywalletSelectedOption] = useState("wallet");
// //   const [mywalletAmount, setMywalletAmount] = useState(walletkapesa || 0);
// //   const [mywalletDropdownOpen, setMywalletDropdownOpen] = useState(false);

// //   // Calculate total price and discount
// //   const totalDiscountPrice = purchaseproduct.reduce((sum, item) => {
// //     if (item.bundle && item?.bundle[0]?.bundletotalamount) {
// //       return sum + item?.bundle[0]?.bundletotalamount;
// //     }
// //     return sum + (item.discountprice || 0);
// //   }, 0);

// //   const totalPrice = purchaseproduct.reduce((sum, item) => {
// //     if (item.bundle && item?.bundle[0]?.bundletotalamount) {
// //       return sum + item?.bundle[0]?.bundletotalamount;
// //     }
// //     return sum + (item.price || 0);
// //   }, 0);

// //   // Wallet dropdown handler
// //   const handleSelect = (option) => {
// //     setMywalletSelectedOption(option);
// //     if (option === "wallet") {
// //       setMywalletAmount(userDetails.wallet.cashback || 0);
// //     } else {
// //       setMywalletAmount(userDetails?.wallet?.points ? userDetails?.wallet?.points * 2.5 : 0);
// //     }
// //     setMywalletDropdownOpen(false);
// //   };

// //   // Fetch coupons on product load
// //   useEffect(() => {
// //     if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
// //       fetchCoupons(purchaseproduct[0].cate, purchaseproduct[0].tag);
// //     }
// //   }, [purchaseproduct]);

// //   // Apply coupon logic
// //   useEffect(() => {
// //     let couponToApply;
// //     // setshowmethecpnval(couponToApply.discountValue)
// //     if (!karocode?.length) {
// //       couponToApply = coupons?.find(c => c.couponType === "First Order");
// //     } else {
// //       couponToApply = coupons?.find(c => c.code === karocode);
// //     }

// //     setfirstcpn(couponToApply || []);

// //     if (couponToApply) {
// //       let discounted;
// //       if (couponToApply.discountType === "Percentage") {
// //         const discountAmount = (totalDiscountPrice * couponToApply.discountValue) / 100;
// //         discounted = discountAmount;
// //         console.log("final amount kya h ", couponToApply.discountValue);
// //     // setshowmethecpnval(couponToApply.discountValue)

// //       } else {
// //         discounted = couponToApply.discountValue;
// //         console.log("final amount kya h ", couponToApply.discountValue);

// //       }
// //       setamountafteraddcoupon(discounted);
// //       setyppicode(true);
// //     }
// //   }, [coupons, totalDiscountPrice, karocode,showmethecpnval]);
// //   // 🟢 Auto apply wallet money (10% of order total)
// // useEffect(() => {
// //   if (userDetails?.wallet?.cashback) {
// //     const availableWallet = userDetails.wallet.cashback;
// //     const tenPercentOfOrder = totalDiscountPrice * 0.1;
// //     const walletToApply = Math.min(availableWallet, tenPercentOfOrder);
// //     setMywalletAmount(walletToApply);
// //   }
// // }, [totalDiscountPrice, userDetails]);


// //   const toggleSheet = () => setShowSheet(!showSheet);

// //   const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();

// //   // ✅ NEW FIX: Wallet cannot exceed remaining amount after coupon
// //   const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
// //   const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
// //   const payableAmount = amountAfterCoupon - walletToUse;

// //   return (
// //     <div className="checkout-container-checkoutbuy">
// //       <h2 className="checkout-title-checkoutbuy">Checkout</h2>

// //       {/* Address Section */}
// //       <NavLink to='/address/chek' className="navlink">
// //         <div className="address-section-checkoutbuy">
// //           <span>
// //             {deleveryaddress?.length > 0
// //               ? `${deleveryaddress[0]?.building}/${deleveryaddress[0]?.locality}, ${deleveryaddress[0]?.city}`
// //               : "No address available"}
// //           </span>
// //         </div>
// //       </NavLink>

// //       {/* Review Items */}
// //       <div className="review-item-section-checkoutbuy">
// //         <span onClick={toggleSheet}>Review item</span>
// //         <IoIosArrowForward onClick={toggleSheet}></IoIosArrowForward>
// //       </div>

// //       {/* Coupons */}
// //       <div className="coupons-section-checkoutbuy" onClick={() => setyppicode(true)}>
// //         <span style={{ fontWeight: "600" }}>
// //           {firstcpn?.code ? `${firstcpn?.code} Applied` : 'Apply Coupon'}
// //         </span>
// //         <span style={{ color: "red", fontWeight: "800" }}>
// //           {amountafteraddcoupon ? `₹${amountafteraddcoupon}` : ''} 
// //           <IoIosArrowForward style={{ color: "black" }} />
// //         </span>
// //       </div>

// //       {/* Payment Options Section */}
// //       {/* <div style={{ background: '#fff', padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: 'auto', borderRadius: '10px' }}>
// //         <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Payment Options</div>
// //         <div style={{ color: 'purple', fontSize: '14px', marginBottom: '16px' }}>Additional 5% discount upto 20 on Prepaid Orders</div>

      
// //         <div style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '16px', marginBottom: '16px', position: 'relative' }}>
// //           <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#00c389', color: 'white', fontSize: '12px', padding: '2px 10px', borderRadius: '12px' }}>Get 5% discount</div>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <div style={{ fontWeight: 'bold' }}>UPI</div>
// //             <div style={{ fontWeight: 'bold' }}>₹{payableAmount}.0</div>
// //           </div>
// //         </div>
// //       </div> */}

// //       {/* Order Details */}
// //       <div className="order-details-checkoutbuy">
// //         <h3>Order Details</h3>
// //         <div className="order-row-checkoutbuy">
// //           <span>MRP</span>
// //           <span>₹{totalPrice}.0</span>
// //         </div>
// //         <div className="order-row-checkoutbuy">
// //           <span>Discount on MRP</span>
// //           <span>₹{totalPrice - totalDiscountPrice}.0</span>
// //         </div>
// //         <div className="order-row-checkoutbuy">
// //           <span>Discounted Price</span>
// //           <span>₹{totalDiscountPrice}.0</span>
// //         </div>
        
         
        
        
       
        
// //         {amountafteraddcoupon ? (
// //           <div className="order-row-checkoutbuy">
// //             <span>Coupon Applied</span>
// //             <span>₹{amountafteraddcoupon }.0</span>
// //           </div>
// //         ) : null}

// //         {/* Wallet */}
// //         {/* <div className="order-row-checkoutbuy relative">
// //           <span>Wallet Money</span>
// //           <span>₹{walletToUse}</span>
// //           <div className="relative">
// //             <button
// //               style={{ color: "white" }}
// //               className="border px-3 py-1 rounded bg-gray-200"
// //               onClick={() => setMywalletDropdownOpen(!mywalletDropdownOpen)}
// //             >
// //               {mywalletSelectedOption === "wallet" ? "Wallet Money" : "Points"}
// //             </button>

// //             {mywalletDropdownOpen && (
// //               <div className="absolute bg-white border rounded shadow-md mt-1 w-full">
// //                 <p className="px-3 py-1 cursor-pointer hover:bg-gray-100" onClick={() => handleSelect("wallet")}>Wallet Money</p>
// //                 <p className="px-3 py-1 cursor-pointer hover:bg-gray-100" onClick={() => handleSelect("points")}>Points</p>
// //               </div>
// //             )}
// //           </div>
// //         </div> */}
// //         {/* 💰 Wallet Section (Auto-applied 10%) */}

// //   <div className="order-row-checkoutbuy">
// //     <span className="">
// //       Wallet
// //     </span>
   
  
// //    <span className="text-green-600 font-semibold text-[16px]">
// //       ₹{mywalletAmount.toFixed(2)}
// //     </span>
// // </div>

        

// //         <div className="order-row-checkoutbuy payable-row-checkoutbuy">
// //           <span>Payable amount</span>
// //           <span>₹{payableAmount}.0</span>
// //         </div>

// //         <p className="discount-text-checkoutbuy">
// //           🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
// //         </p>
// //       </div>

// //       {/* Time Slots + Pay Now */}
// //       {city && city.includes("jaipur") ? (
// //         <>
// //           <TimeSlots />
// //           <button
// //             className="pay-now-btn-checkoutbuy"
// //             disabled={!timeslotlelo}
// //             onClick={() => {
// //               if (timeslotlelo) orderplaced(purchaseproduct, deleveryaddress, walletToUse,payableAmount);
// //             }}
// //           >
// //             Pay Now
// //           </button>
// //         </>
// //       ) : (
// //         <button
// //           className="pay-now-btn-checkoutbuy"
// //           onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse,payableAmount)}
// //         >
// //           Pay Now
// //         </button>
// //       )}

// //       {/* Coupon Toast */}
// //       {yppicode && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setyppicode(false)} />}

// //       {/* Bottom Sheet */}
// //       <div className="bottom-sheet" style={{ display: showSheet ? 'block' : 'none' }}>
// //         <p>Review item</p>
// //         <button onClick={toggleSheet} className="closed-button">✖</button>
// //         {purchaseproduct.map((order, i) => (
// //           Array.isArray(order.bundle) && order.bundle.length > 0 ? (
// //             <BundleProduct
// //               key={i}
// //               source="checkout"
// //               originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
// //               totalPrice={1000}
// //               products={[
// //                 { ...order.bundle[0] },
// //                 { ...order.bundle[1] }
// //               ]}
// //             />
// //           ) : (
// //             <div key={i} className="sheet-content">
// //               <div className="item-info">
// //                 <img src={order.image} alt="Product" className="product-image-sheet" loading="lazy" />
// //                 <div className="item-details">
// //                   <span className="item-price">₹{order.discountprice}</span>
// //                   <h4>{order.description}</h4>
// //                   <p>Size: {order.size} &nbsp;&nbsp; Qty: {order.qty}</p>
// //                   <p className="delivery-info">
// //                     Deliver by <span className="delivery-date">{timeslotlelo || '60 minute delivery'}</span>
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout;





















//2





// import React, { useState, useEffect } from "react";
// import "./CheckOut.css";
// import { useBio } from "./BioContext";
// import { useDashboard } from "./dashboardforadmin/DashboardContext";
// import { IoIosArrowForward } from "react-icons/io";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useFirebaseAuth } from "./FirebaseContext";

// import TimeSlots from "./TimeSlots";
// import paytm from "./image/paytm.png";
// import phonepay from "./image/phonepay.png";
// import gpay from "./image/gpay.webp";
// import upi from "./image/upi.jpeg";
// import CouponCard from "./CouponCard";
// import Slideuptoast from "./Slideuptoast";
// import BundleProduct from "./BundleProduct";

// const Checkout = () => {
//   const { buydata, addresssetkro, orderplaced, walletkapesa, timeslotlelo, fetchCoupons, coupons, karocode } = useBio();
//   const { userDetails } = useFirebaseAuth();
//   const { recordMultipleSales } = useDashboard();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [showSheet, setShowSheet] = useState(false);
//   // const [firstcpn, setfirstcpn] = useState([]);
//   // const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
//   // ✅ Coupon state (localStorage synced)
// const [firstcpn, setfirstcpn] = useState(() => {
//   const storedCoupon = JSON.parse(localStorage.getItem("firstcpn"));
//   return storedCoupon || [];
// });

// const [amountafteraddcoupon, setamountafteraddcoupon] = useState(() => {
//   const storedAmount = JSON.parse(localStorage.getItem("amountafteraddcoupon"));
//   return storedAmount || 0;
// });
//   const [yppicode, setyppicode] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(
//     localStorage.getItem("selectedPayment") || "UPI"
//   );

//   // 🟢 Cart state synced with localStorage
//   const [purchaseproduct, setpurchaseproduct] = useState([]);
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("purchaseproduct"));
//     if (Array.isArray(storedProducts) && storedProducts.length) {
//       setpurchaseproduct(storedProducts);
//     } else if (Array.isArray(buydata) && buydata.length) {
//       setpurchaseproduct(buydata);
//       localStorage.setItem("purchaseproduct", JSON.stringify(buydata));
//     }
//   }, [buydata]);

//   useEffect(() => {
//     localStorage.setItem("purchaseproduct", JSON.stringify(purchaseproduct));
//   }, [purchaseproduct]);

//   // Delivery address state
//   const [deleveryaddress, setdeleveryadress] = useState([]);
//   useEffect(() => {
//     const storedAddress = JSON.parse(localStorage.getItem("deleveryaddress"));
//     if (storedAddress && storedAddress.length) {
//       setdeleveryadress(storedAddress);
//     } else if (addresssetkro && addresssetkro.length) {
//       setdeleveryadress(addresssetkro);
//       localStorage.setItem("deleveryaddress", JSON.stringify(addresssetkro));
//     }
//   }, [addresssetkro]);

//   // Wallet
//   const [mywalletAmount, setMywalletAmount] = useState(walletkapesa || 0);
//   useEffect(() => {
//     if (userDetails?.wallet?.cashback) {
//       const availableWallet = userDetails.wallet.cashback;
//       const tenPercentOfOrder = purchaseproduct.reduce((sum, item) => sum + (item.discountprice || item.price || 0), 0) * 0.1;
//       const walletToApply = Math.min(availableWallet, tenPercentOfOrder);
//       setMywalletAmount(walletToApply);
//     }
//   }, [purchaseproduct, userDetails]);

//   const toggleSheet = () => setShowSheet(!showSheet);
//   const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();

//   // Total prices
//   const totalDiscountPrice = purchaseproduct.reduce((sum, item) => sum + (item.discountprice || item.price || 0), 0);
//   const totalPrice = purchaseproduct.reduce((sum, item) => sum + (item.price || 0), 0);





//   // Fetch coupons
//   useEffect(() => {
//     if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
//       fetchCoupons(purchaseproduct[0].cate, purchaseproduct[0].tag);
//     }
//   }, [purchaseproduct]);

//   // Apply coupon logic
//   // useEffect(() => {
//   //   let couponToApply;
//   //   if (!karocode?.length) {
//   //     couponToApply = coupons?.find(c => c.couponType === "First Order");
//   //   } else {
//   //     couponToApply = coupons?.find(c => c.code === karocode);
//   //   }

//   //   setfirstcpn(couponToApply || []);
//   //   if (couponToApply) {
//   //     const discounted = couponToApply.discountType === "Percentage"
//   //       ? (totalDiscountPrice * couponToApply.discountValue) / 100
//   //       : couponToApply.discountValue;
//   //     setamountafteraddcoupon(discounted);
//   //     setyppicode(true);
//   //   }
//   // }, [coupons, totalDiscountPrice, karocode]);
//   // / Apply coupon logic
// useEffect(() => {
//   let couponToApply;

//   if (!karocode?.length) {
//     couponToApply = coupons?.find(c => c.couponType === "First Order");
//   } else {
//     couponToApply = coupons?.find(c => c.code === karocode);
//   }

//   if (couponToApply) {
//     const discounted = couponToApply.discountType === "Percentage"
//       ? (totalDiscountPrice * couponToApply.discountValue) / 100
//       : couponToApply.discountValue;

//     setfirstcpn(couponToApply);
//     setamountafteraddcoupon(discounted);
    
//     // ✅ Save in localStorage
//     localStorage.setItem("firstcpn", JSON.stringify(couponToApply));
//     localStorage.setItem("amountafteraddcoupon", JSON.stringify(discounted));

//     setyppicode(true);
//   } else {
//     // Reset if no coupon
//     setfirstcpn([]);
//     setamountafteraddcoupon(0);
//     localStorage.removeItem("firstcpn");
//     localStorage.removeItem("amountafteraddcoupon");
//   }
// }, [coupons, totalDiscountPrice, karocode]);

//   const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
//   const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
//   const payableAmount = amountAfterCoupon - walletToUse;


// // ✅ Cleanup localStorage when user leaves the page
// // ✅ Cleanup localStorage ONLY when user leaves Checkout (not on reload)
// // useEffect(() => {
// //   return () => {
// //     // Current path
// //     const currentPath = location.pathname;

// //     // Agar user "checkout" page se hat gaya aur "address" page par nahi gaya
// //     // (jaise home, cart, orders, etc.), tabhi cleanup karna
// //     if (!currentPath.includes("/checkout") && !currentPath.includes("/address")) {
// //       localStorage.removeItem("purchaseproduct");
// //       localStorage.removeItem("firstcpn");
// //       localStorage.removeItem("amountafteraddcoupon");
// //     }
// //   };
// // }, [location.pathname]);
// useEffect(() => {
//   const handleBeforeUnload = () => {
//     // Agar user page band kare ya site se nikal jaaye
//     localStorage.removeItem("purchaseproduct");
//     localStorage.removeItem("firstcpn");
//     localStorage.removeItem("amountafteraddcoupon");
//   };

//   // ✅ Sirf tabhi add karo jab user checkout par hai
//   if (location.pathname.includes("/checkout")) {
//     window.addEventListener("pagehide", handleBeforeUnload);
//     window.addEventListener("visibilitychange", () => {
//       if (document.visibilityState === "hidden") {
//         handleBeforeUnload();
//       }
//     });
//   }

//   // ✅ Clean up listeners
//   return () => {
//     window.removeEventListener("pagehide", handleBeforeUnload);
//     window.removeEventListener("visibilitychange", handleBeforeUnload);
//   };
// }, [location.pathname]);



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
//           {firstcpn?.code ? `${firstcpn?.code} Applied` : 'Apply Coupon'}
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

//         <div className="order-row-checkoutbuy payable-row-checkoutbuy">
//           <span>Payable amount</span>
//           <span>₹{payableAmount}.0</span>
//         </div>

//         <p className="discount-text-checkoutbuy">
//           🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
//         </p>
//       </div>

//       {/* Time Slots + Pay Now */}
//       {city && city.includes("jaipur") ? (
//         <>
//           <TimeSlots />
//           <button
//             className="pay-now-btn-checkoutbuy"
//             disabled={!timeslotlelo}
//             onClick={() => {
//               if (timeslotlelo) orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount);
//             }}
//           >
//             Pay Now
//           </button>
//         </>
//       ) : (
//         <button
//           className="pay-now-btn-checkoutbuy"
//           onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount)}
//         >
//           Pay Now
//         </button>
//       )}

//       {/* Coupon Toast */}
//       {yppicode && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setyppicode(false)} />}

//       {/* Bottom Sheet */}
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
















//3







// import React, { useState, useEffect } from "react";
// import "./CheckOut.css";
// import { useBio } from "./BioContext";
// import { IoIosArrowForward } from "react-icons/io";
// import { NavLink, useLocation } from "react-router-dom";
// import { useFirebaseAuth } from "./FirebaseContext";

// import TimeSlots from "./TimeSlots";
// import CouponCard from "./CouponCard";
// import Slideuptoast from "./Slideuptoast";
// import BundleProduct from "./BundleProduct";

// const Checkout = () => {
//   const { buydata, addresssetkro, orderplaced, walletkapesa, timeslotlelo, fetchCoupons, coupons, karocode, setkarocode } = useBio();
//   const { userDetails } = useFirebaseAuth();
//   const location = useLocation();

//   const [showSheet, setShowSheet] = useState(false);

//   // ✅ Coupons persisted
//   const [firstcpn, setfirstcpn] = useState(() => {
//     return JSON.parse(localStorage.getItem("firstcpn")) || [];
//   });
//   const [amountafteraddcoupon, setamountafteraddcoupon] = useState(() => {
//     return JSON.parse(localStorage.getItem("amountafteraddcoupon")) || 0;
//   });

//   const [yppicode, setyppicode] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(
//     localStorage.getItem("selectedPayment") || "UPI"
//   );

//   // ✅ Purchase products persisted
//   const [purchaseproduct, setpurchaseproduct] = useState(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("purchaseproduct"));
//     if (Array.isArray(storedProducts) && storedProducts.length) return storedProducts;
//     if (Array.isArray(buydata) && buydata.length) return buydata;
//     return [];
//   });

//   useEffect(() => {
//     localStorage.setItem("purchaseproduct", JSON.stringify(purchaseproduct));
//   }, [purchaseproduct]);

//   // ✅ Delivery address persisted
//   const [deleveryaddress, setdeleveryadress] = useState(() => {
//     const storedAddress = JSON.parse(localStorage.getItem("deleveryaddress"));
//     if (storedAddress && storedAddress.length) return storedAddress;
//     if (addresssetkro && addresssetkro.length) return addresssetkro;
//     return [];
//   });

//   // ✅ Sync whenever context updates
//   useEffect(() => {
//     if (addresssetkro && addresssetkro.length) {
//       setdeleveryadress(addresssetkro);
//       localStorage.setItem("deleveryaddress", JSON.stringify(addresssetkro));
//     }
//   }, [addresssetkro]);

//   // Wallet logic
//   const [mywalletAmount, setMywalletAmount] = useState(walletkapesa || 0);
//   useEffect(() => {
//     if (userDetails?.wallet?.cashback) {
//       const availableWallet = userDetails.wallet.cashback;
//       const tenPercentOfOrder = purchaseproduct.reduce(
//         (sum, item) => sum + (item.discountprice || item.price || 0),
//         0
//       ) * 0.1;
//       const walletToApply = Math.min(availableWallet, tenPercentOfOrder);
//       setMywalletAmount(walletToApply);
//     }
//   }, [purchaseproduct, userDetails]);

//   const toggleSheet = () => setShowSheet(!showSheet);
//   const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();

//   // Total prices
//   const totalDiscountPrice = purchaseproduct.reduce(
//     (sum, item) => sum + (item.discountprice || item.price || 0),
//     0
//   );
//   const totalPrice = purchaseproduct.reduce(
//     (sum, item) => sum + (item.price || 0),
//     0
//   );

//   // Fetch coupons
//   useEffect(() => {
//     if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
//       fetchCoupons(purchaseproduct[0].cate, purchaseproduct[0].tag);
//     }
//   }, [purchaseproduct]);

//   // Apply coupon logic + persist
//   useEffect(() => {
//     let couponToApply;
//     if (!karocode?.length) {
//       couponToApply = coupons?.find(c => c.couponType === "First Order");
//     } else {
//       couponToApply = coupons?.find(c => c.code === karocode);
//     }

//     if (couponToApply) {
//       const discounted =
//         couponToApply.discountType === "Percentage"
//           ? (totalDiscountPrice * couponToApply.discountValue) / 100
//           : couponToApply.discountValue;

//       setfirstcpn(couponToApply);
//       setamountafteraddcoupon(discounted);
//       localStorage.setItem("firstcpn", JSON.stringify(couponToApply));
//       localStorage.setItem("amountafteraddcoupon", JSON.stringify(discounted));
//       setyppicode(true);
//     } else {
//       setfirstcpn([]);
//       setamountafteraddcoupon(0);
//       localStorage.removeItem("firstcpn");
//       localStorage.removeItem("amountafteraddcoupon");
//     }
//   }, [coupons, totalDiscountPrice, karocode]);

//   const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
//   const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
//   const payableAmount = amountAfterCoupon - walletToUse;

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
//           {firstcpn?.code ? `${firstcpn?.code} Applied` : 'Apply Coupon'}
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

//         <div className="order-row-checkoutbuy payable-row-checkoutbuy">
//           <span>Payable amount</span>
//           <span>₹{payableAmount}.0</span>
//         </div>

//         <p className="discount-text-checkoutbuy">
//           🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
//         </p>
//       </div>

//       {/* Time Slots + Pay Now */}
//       {city && city.includes("jaipur") ? (
//         <>
//           <TimeSlots />
//           <button
//             className="pay-now-btn-checkoutbuy"
//             disabled={!timeslotlelo}
//             onClick={() => {
//               if (timeslotlelo) orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount);
//             }}
//           >
//             Pay Now
//           </button>
//         </>
//       ) : (
//         <button
//           className="pay-now-btn-checkoutbuy"
//           onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount)}
//         >
//           Pay Now
//         </button>
//       )}

//       {/* Coupon Toast */}
//       {yppicode && (
//         <Slideuptoast
//           coupon={coupons}
//           firstcpns={firstcpn}
//           totalDiscountPrice={totalDiscountPrice}
//           onClose={() => setyppicode(false)}
//         />
//       )}

//       {/* Bottom Sheet */}
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






//4
import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import { useBio } from "./BioContext";
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";

import TimeSlots from "./TimeSlots";
import CouponCard from "./CouponCard";
import Slideuptoast from "./Slideuptoast";
import BundleProduct from "./BundleProduct";

const Checkout = () => {
  const { buydata, addresssetkro, orderplaced, walletkapesa, timeslotlelo, fetchCoupons, coupons, karocode } = useBio();
  const { userDetails } = useFirebaseAuth();
  const { recordMultipleSales } = useDashboard();
  const location = useLocation();
  const navigate = useNavigate();

  const [showSheet, setShowSheet] = useState(false);

  // Coupon state
  const [firstcpn, setfirstcpn] = useState([]);
  const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
  const [yppicode, setyppicode] = useState(false);

  // Cart & address state from localStorage or context
  const [purchaseproduct, setpurchaseproduct] = useState(
    () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
  );

  const [deleveryaddress, setdeleveryadress] = useState(
    () => JSON.parse(localStorage.getItem("checkoutAddress")) || addresssetkro || []
  );

  const [mywalletAmount, setMywalletAmount] = useState(
    () => JSON.parse(localStorage.getItem("checkoutWallet")) || walletkapesa || 0
  );

  // Persist to localStorage

useEffect(() => {
  if (addresssetkro?.length) {
    setdeleveryadress(addresssetkro);
    localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
  }
}, [addresssetkro]);


  useEffect(() => {
    localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct));
  }, [purchaseproduct]);

  useEffect(() => {
    localStorage.setItem("checkoutAddress", JSON.stringify(deleveryaddress));
  }, [deleveryaddress]);

  useEffect(() => {
    localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount));
  }, [mywalletAmount]);

  // Clear checkout data on unmount (user leaves page)
  // Clear checkout data on unmount (except when going to address page)
useEffect(() => {
  return () => {
    if (location.pathname !== "/address/chek") {
      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("checkoutAddress");
      localStorage.removeItem("checkoutWallet");
      localStorage.removeItem("checkoutCoupon"); // if you store coupon too
    }
  };
}, [location.pathname]);


  // Wallet calculation
  useEffect(() => {
    if (userDetails?.wallet?.cashback) {
      const availableWallet = userDetails.wallet.cashback;
      const tenPercentOfOrder =
        purchaseproduct.reduce((sum, item) => sum + (item.discountprice || item.price || 0), 0) * 0.1;
      const walletToApply = Math.min(availableWallet, tenPercentOfOrder);
      setMywalletAmount(walletToApply);
    }
  }, [purchaseproduct, userDetails]);

  const toggleSheet = () => setShowSheet(!showSheet);
  const city = deleveryaddress?.[0]?.city?.toString().trim().toLowerCase();

  // Total prices
  const totalDiscountPrice = purchaseproduct.reduce((sum, item) => sum + (item.discountprice || item.price || 0), 0);
  const totalPrice = purchaseproduct.reduce((sum, item) => sum + (item.price || 0), 0);

  // Fetch coupons
  useEffect(() => {
    if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
      fetchCoupons(purchaseproduct[0].cate, purchaseproduct[0].tag);
    }
  }, [purchaseproduct]);

  // Apply coupon logic
  useEffect(() => {
    let couponToApply;

    if (!karocode?.length) {
      couponToApply = coupons?.find(c => c.couponType === "First Order");
    } else {
      couponToApply = coupons?.find(c => c.code === karocode);
    }

    if (couponToApply) {
      const discounted = couponToApply.discountType === "Percentage"
        ? (totalDiscountPrice * couponToApply.discountValue) / 100
        : couponToApply.discountValue;

      setfirstcpn(couponToApply);
      setamountafteraddcoupon(discounted);
      setyppicode(true);
    } else {
      // Reset if no coupon
      setfirstcpn([]);
      setamountafteraddcoupon(0);
    }
  }, [coupons, totalDiscountPrice, karocode]);

  const amountAfterCoupon = totalDiscountPrice - (amountafteraddcoupon || 0);
  const walletToUse = Math.min(mywalletAmount, amountAfterCoupon);
  const payableAmount = amountAfterCoupon - walletToUse;

  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* Address Section */}
      <NavLink to='/address/chek' className="navlink">
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
        <IoIosArrowForward onClick={toggleSheet}></IoIosArrowForward>
      </div>

      {/* Coupons */}
      <div className="coupons-section-checkoutbuy" onClick={() => setyppicode(true)}>
        <span style={{ fontWeight: "600" }}>
          {firstcpn?.code ? `${firstcpn?.code} Applied` : 'Apply Coupon'}
        </span>
        <span style={{ color: "red", fontWeight: "800" }}>
          {amountafteraddcoupon ? `₹${amountafteraddcoupon}` : ''} 
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
        {amountafteraddcoupon ? (
          <div className="order-row-checkoutbuy">
            <span>Coupon Applied</span>
            <span>₹{amountafteraddcoupon}.0</span>
          </div>
        ) : null}

        <div className="order-row-checkoutbuy">
          <span>Wallet</span>
          <span className="text-green-600 font-semibold text-[16px]">₹{mywalletAmount.toFixed(2)}</span>
        </div>

        <div className="order-row-checkoutbuy payable-row-checkoutbuy">
          <span>Payable amount</span>
          <span>₹{payableAmount}.0</span>
        </div>

        <p className="discount-text-checkoutbuy">
          🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
        </p>
      </div>

      {/* Time Slots + Pay Now */}
      {city && city.includes("jaipur") ? (
        <>
          <TimeSlots />
          <button
            className="pay-now-btn-checkoutbuy"
            disabled={!timeslotlelo}
            onClick={() => {
              if (timeslotlelo) orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount,timeslotlelo);
            }}
          >
            Pay Now
          </button>
        </>
      ) : (
        <button
          className="pay-now-btn-checkoutbuy"
          onClick={() => orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount)}
        >
          Pay Now
        </button>
      )}

      {/* Coupon Toast */}
      {yppicode && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setyppicode(false)} />}

      {/* Bottom Sheet */}
      <div className="bottom-sheet" style={{ display: showSheet ? 'block' : 'none' }}>
        <p>Review item</p>
        <button onClick={toggleSheet} className="closed-button">✖</button>
        {purchaseproduct.map((order, i) => (
          Array.isArray(order.bundle) && order.bundle.length > 0 ? (
            <BundleProduct
              key={i}
              source="checkout"
              originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
              totalPrice={1000}
              products={[{ ...order.bundle[0] }, { ...order.bundle[1] }]}
            />
          ) : (
            <div key={i} className="sheet-content">
              <div className="item-info">
                <img src={order.image} alt="Product" className="product-image-sheet" loading="lazy" />
                <div className="item-details">
                  <span className="item-price">₹{order.discountprice}</span>
                  <h4>{order.description}</h4>
                  <p>Size: {order.size} &nbsp;&nbsp; Qty: {order.qty}</p>
                  <p className="delivery-info">
                    Deliver by <span className="delivery-date">{timeslotlelo || '60 minute delivery'}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Checkout;
