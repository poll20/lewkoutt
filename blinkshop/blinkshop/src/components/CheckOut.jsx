import React, { useState,useEffect } from "react";
import "./Checkout.css";
import { useBio } from "./BioContext";
import img1 from "./image/img3.jpg"
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
const Checkout = () => {
const { buydata, addresssetkro,orderplaced } = useBio();
const{recordMultipleSales}=useDashboard()
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Hook to detect navigation
  const [showSheet, setShowSheet] = useState(false);
  // ✅ Load Data from Local Storage on Page Load
  const [selectedPayment, setSelectedPayment] = useState(
    localStorage.getItem("selectedPayment") || "UPI"
  );

  const [purchaseproduct, setpurchaseproduct] = useState(
    JSON.parse(localStorage.getItem("purchaseproduct")) || buydata || []
  );

  const [buyDataState, setBuyDataState] = useState(
    JSON.parse(localStorage.getItem("buydata")) || buydata || []
  );

    const [deleveryaddress,setdeleveryadress] = useState(
    JSON.parse(localStorage.getItem("deleveryaddress")) || addresssetkro || []
  );

  

  // ✅ Step 1: Update Local Storage Whenever Data Changes
  useEffect(() => {
    localStorage.setItem("selectedPayment", selectedPayment);
  }, [selectedPayment]);

  useEffect(() => {
    localStorage.setItem("purchaseproduct", JSON.stringify(purchaseproduct));
  }, [purchaseproduct]);

  useEffect(() => {
    localStorage.setItem("buydata", JSON.stringify(buyDataState));
  }, [buyDataState]);


  useEffect(() => {
    localStorage.setItem("deleveryaddress", JSON.stringify(deleveryaddress));
  }, [deleveryaddress]);
  // ✅ Step 2: Set Data on Component Mount
  // useEffect(() => {
  //   if (buydata) {
  //     setpurchaseproduct(buydata);
  //     setBuyDataState(buydata);
  //   }
  // }, [buydata]);

    

  // useEffect(() => {
  //   if (location.state && location.state.buydata) {
  //     setpurchaseproduct(location.state.buydata);
  //     setBuyDataState(location.state.buydata);
  //   }
  // }, [location.state]);
  useEffect(() => {
    let storedBuyData = JSON.parse(localStorage.getItem("buydata"));
    
    if (!buydata || buydata.length === 0) {
      console.log("Restoring buydata from LocalStorage:", storedBuyData);
      setpurchaseproduct(storedBuyData || []);
    } else {
      console.log("buydata from Context:", buydata);
    }
  }, [buydata]);

  // ✅ Step 3: Reset Local Storage When User Leaves Checkout Page
  useEffect(() => {
    const handleRouteChange = () => {
      console.log("User left checkout page, resetting checkout data...");

      // ❌ Clear only checkout-related data (not entire local storage)
      localStorage.removeItem("selectedPayment");
      localStorage.removeItem("purchaseproduct");
      localStorage.removeItem("buydata");
      localStorage.removeItem("deleveryaddress");
    };

    // Listen for navigation away from checkout
    return () => handleRouteChange(); // Cleanup when component unmounts
  }, [navigate]);

 
  const toggleSheet = () => setShowSheet(!showSheet);
if(buydata){
  console.log("mera naam bhay",buydata)
}

  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* Address Section */}
      <div className="address-section-checkoutbuy">
        <p>{deleveryaddress[0].building}/{deleveryaddress[0].locality}, {deleveryaddress[0].city}</p>
      </div>

      {/* Review Item Section */}
      <div className="review-item-section-checkoutbuy">
        <p onClick={()=>{setShowSheet(true)}}>Review item</p>
        <IoIosArrowForward></IoIosArrowForward>
        {/* <p>₹1,899</p> */}
      </div>

      {/* Coupons Section */}
      <div className="coupons-section-checkoutbuy">
        <p>View coupons</p>
        <IoIosArrowForward/>
      </div>

      {/* Payment Options */}
      <div className="payment-options-checkoutbuy">
        <h3>Payment Options</h3>
        <div className="payment-methods-checkoutbuy">
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="UPI"
              checked={selectedPayment === "UPI"}
              onChange={() => setSelectedPayment("UPI")}
            />
            <span>UPI via</span>
            <p>₹{purchaseproduct[0].discountprice}.0</p>
          </label>
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="Credit/Debit Card"
              checked={selectedPayment === "Credit/Debit Card"}
              onChange={() => setSelectedPayment("Credit/Debit Card")}
            />
            <span>Credit/Debit Card</span>
            <p>₹{purchaseproduct[0].discountprice}.0</p>
          </label>
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="Net Banking"
              checked={selectedPayment === "Net Banking"}
              onChange={() => setSelectedPayment("Net Banking")}
            />
            <span>Net Banking</span>
            <p>₹{purchaseproduct[0].discountprice}.0</p>
          </label>
        </div>

        <div className="cod-option-checkoutbuy">
          <h3>Pay on Delivery Options</h3>
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="COD"
              checked={selectedPayment === "COD"}
              onChange={() => setSelectedPayment("COD")}
            />
            <span>COD (Cash on Delivery)</span>
            <p>₹{purchaseproduct[0].discountprice + 30}.0</p>
          </label>
        </div>
      </div>

      {/* Order Details */}
      <div className="order-details-checkoutbuy">
        <h3>Order Details</h3>
        <div className="order-row-checkoutbuy">
          <span>MRP</span>
          <span>₹{purchaseproduct[0].price}</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discount on MRP</span>
          <span>-₹{purchaseproduct[0].price-purchaseproduct[0].discountprice}</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Wallet Money</span>
          <span>₹0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Shipping Fee (Non Refundable)</span>
          <span>₹0</span>
        </div>
        <div className="order-row-checkoutbuy payable-row-checkoutbuy">
          <span>Payable amount</span>
          <span>₹{purchaseproduct[0].discountprice}</span>
        </div>
        <p className="discount-text-checkoutbuy">🎉 Yay! You saved ₹{purchaseproduct[0].price-purchaseproduct[0].discountprice} on the final amount</p>
      </div>

      <button className="pay-now-btn-checkoutbuy" onClick={()=>{orderplaced(purchaseproduct,deleveryaddress);setTimeout(()=>{recordMultipleSales(purchaseproduct)},300) }}>Pay Now</button>


{/* review buy data */}
<div className="bottom-sheet" style={{display:showSheet?('block'):('none')}}>
<p>Review item</p>
<button onClick={()=>{setShowSheet(false)}} className="close-button">
          ✖
        </button>

        {
          purchaseproduct.map((e)=>(
            <>
            <div className="sheet-header">
        <p className="item-price">₹{e.discountprice}</p>
        </div>
      <div className="sheet-content">
        <div className="item-info">
          
          <img
            src={img1} // Replace with your product image URL
            alt="Product"
            className="product-image-sheet"
          />
          <div className="item-details">
            <h4>{e.description}</h4>
            <p>Size: {e.size} &nbsp;&nbsp; Qty: {e.qty}</p>
            <p className="delivery-info">
              Deliver by <span className="delivery-date">16 Feb - 17 Feb</span>
            </p>
          </div>
        </div>
      </div>
      </>
          ))
        }
      
    </div>   

    </div>
  );
};

export default Checkout;
