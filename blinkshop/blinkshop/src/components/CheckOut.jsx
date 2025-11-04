



//5



import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import { useBio } from "./BioContext";
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";

import TimeSlots from "./TimeSlots";
import Slideuptoast from "./Slideuptoast";
import BundleProduct from "./BundleProduct";

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
    karocode
  } = useBio();
  const { userDetails } = useFirebaseAuth();
  const location = useLocation();

  const [showSheet, setShowSheet] = useState(false);

  // Coupon state
  const [firstcpn, setfirstcpn] = useState(null);
  const [amountafteraddcoupon, setamountafteraddcoupon] = useState(0);
  const [yppicode, setyppicode] = useState(false);
 

  // Cart & address state
  const [purchaseproduct, setpurchaseproduct] = useState(
    () => JSON.parse(localStorage.getItem("checkoutCart")) || buydata || []
  );

  const [deleveryaddress, setdeleveryadress] = useState(
    () => JSON.parse(localStorage.getItem("checkoutAddress")) || addresssetkro || []
  );

  const [mywalletAmount, setMywalletAmount] = useState(
    () => JSON.parse(localStorage.getItem("checkoutWallet")) || walletkapesa || 0
  );

  const [deliveryCharge, setDeliveryCharge] = useState(
  () => JSON.parse(localStorage.getItem("checkoutDeliveryCharge")) || 0
);


  // Persist address if context changes
  useEffect(() => {
    if (addresssetkro?.length) {
      setdeleveryadress(addresssetkro);
      localStorage.setItem("checkoutAddress", JSON.stringify(addresssetkro));
    }
  }, [addresssetkro]);

  // Persist cart, wallet & address
  useEffect(() => localStorage.setItem("checkoutCart", JSON.stringify(purchaseproduct)), [purchaseproduct]);
  useEffect(() => localStorage.setItem("checkoutAddress", JSON.stringify(deleveryaddress)), [deleveryaddress]);
  useEffect(() => localStorage.setItem("checkoutWallet", JSON.stringify(mywalletAmount)), [mywalletAmount]);
useEffect(() => {
   fetchDistance(deleveryaddress)
  }, []);


 useEffect(() => {
  console.log("Distance updated:", distance);
  if (!distance) return;

  // 🔥 Convert "15.7 km" → 15.7 (number)
  const numericDistance = parseFloat(distance.toString().replace("km", "").trim());
  console.log("Parsed numeric distance:", numericDistance);

  if (isNaN(numericDistance)) return; // safety check

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
}, [distance]);


  // Clear checkout data on unmount (except navigating to address page)
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

  // Wallet calculation
  useEffect(() => {
    if (userDetails?.wallet?.cashback) {
      const availableWallet = userDetails.wallet.cashback;
      const tenPercentOfOrder = purchaseproduct.reduce(
        (sum, item) => sum + (item.discountprice || item.price || 0), 0
      ) * 0.1;
      setMywalletAmount(Math.min(availableWallet, tenPercentOfOrder));
    }
  }, [purchaseproduct, userDetails]);
    useEffect(() => {
    if (window.fbq && purchaseproduct) {
      window.fbq("track", "InitiateCheckout", {
        contents: [
          {
            id: purchaseproduct._id,
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

  // Total prices
  const totalDiscountPrice = purchaseproduct.reduce(
    (sum, item) => sum + (item.discountprice || item.price || 0), 0
  );
  const totalPrice = purchaseproduct.reduce((sum, item) => sum + (item.price || 0), 0);

  // Fetch coupons for first product
  useEffect(() => {
    if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
      // fetchCoupons(purchaseproduct[0]?.cate, purchaseproduct[0]?.tag);
      fetchCoupons("all","all");
      
    }
  }, [purchaseproduct]);

  // 👇 Add this effect near your other useEffects
useEffect(() => {
  const firstProduct = purchaseproduct?.[0];
  if (firstProduct?.cate && firstProduct?.tag) {
    console.log("🔁 Refetching coupons after returning to checkout...");
    // fetchCoupons(firstProduct.cate, firstProduct.tag);
    fetchCoupons("all","all");

  }
}, [location.pathname]);

  // Apply coupon safely
  useEffect(() => {
    if (!coupons?.length || !purchaseproduct?.length) return;

    let couponToApply;
    if (!karocode?.length) {
      couponToApply = coupons.find(c => c?.couponType === "First Order");
    } else {
      couponToApply = coupons.find(c => c?.code === karocode);
    }

    if (couponToApply) {
      const discountType = couponToApply?.discountType ?? "Flat";
      const discountValue = Number(couponToApply?.discountValue ?? 0);
      const discounted = discountType === "Percentage"
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
  const payableAmount = (amountAfterCoupon - walletToUse)+deliveryCharge;

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
          {firstcpn?.code ? `${firstcpn.code} Applied` : 'Apply Coupon'}
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

        <div className="order-row-checkoutbuy">
          <span style={{ display: 'flex', flexDirection: 'column' }}>
  <span>Delivery Charges</span>
  <span style={{ display: 'flex', flexDirection: 'column',fontSize:"10px" }}>{deliveryCharge?('(Distance-based delivery fee applied)'):('')}</span>
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
          🎉 Yay! You saved ₹{walletToUse + (amountafteraddcoupon || 0)}.0 on the final amount
        </p>
      </div>

      {/* Time Slots + Pay Now */}
      {city?.toLowerCase().includes("jaipur") && parseFloat(distance) < 25 ? (
        <>
          <TimeSlots />
          {/* <button
            className="pay-now-btn-checkoutbuy"
            disabled={!timeslotlelo}
            onClick={() => timeslotlelo && orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount, timeslotlelo)}
          >
            Pay Now
          </button> */}
          <button
  className="pay-now-btn-checkoutbuy"
  onClick={() => {
    if (!timeslotlelo) {
      alert("Please Select the Slot and Press on Confirm Slot.");
      return;
    }
    orderplaced(purchaseproduct, deleveryaddress, walletToUse, payableAmount, timeslotlelo);
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
      {/* {yppicode && firstcpn && (
        <Slideuptoast
          coupon={coupons}
          firstcpns={firstcpn}
          totalDiscountPrice={totalDiscountPrice}
          onClose={() => setyppicode(false)}
        />
      )} */}
      {yppicode && coupons?.length > 0 && (
  <Slideuptoast
    coupon={coupons}
    firstcpns={firstcpn}
    totalDiscountPrice={totalDiscountPrice}
    onClose={() => setyppicode(false)}
  />
)}
 {/* {yppicode && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setyppicode(false)} />} */}


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
