import React, { useState,useEffect } from "react";
import "./CheckOut.css";
import { useBio } from "./BioContext";
import img1 from "./image/img3.jpg"
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import { IoIosArrowForward } from "react-icons/io";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import TimeSlots from "./TimeSlots"
import { useFirebaseAuth } from "./FirebaseContext";
// import phonepay from "./image/phonepay"
import paytm from "./image/paytm.png"
import phonepay from "./image/phonepay.png"
import gpay from "./image/gpay.webp"
import upi from "./image/upi.jpeg"
const Checkout = () => {


 

const { buydata, addresssetkro,orderplaced,walletkapesa,timeslotlelo} = useBio();
// const{userDetails}=useAuth()
const{userDetails}=useFirebaseAuth()
const{recordMultipleSales}=useDashboard()
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Hook to detect navigation
  const [showSheet, setShowSheet] = useState(false);
  // ✅ Load Data from Local Storage on Page Load
  const [selectedPayment, setSelectedPayment] = useState(
    localStorage.getItem("selectedPayment") || "UPI"
  );

  // const [purchaseproduct, setpurchaseproduct] = useState(
  //   JSON.parse(localStorage.getItem("purchaseproduct")) || buydata || []
  // );
  const [purchaseproduct, setpurchaseproduct] = useState(
    Array.isArray(JSON.parse(localStorage.getItem("purchaseproduct"))) 
      ? JSON.parse(localStorage.getItem("purchaseproduct")) 
      : (Array.isArray(buydata) ? buydata : [])
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
    localStorage.setItem("purchaseproduct", JSON.stringify(Array.isArray(purchaseproduct)));
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
  // useEffect(() => {
  //   let storedBuyData = JSON.parse(localStorage.getItem("buydata"));
    
  //   if (!buydata || buydata.length === 0) {
  //     console.log("Restoring buydata from LocalStorage:", storedBuyData);
  //     setpurchaseproduct(storedBuyData || []);
  //   } else {
  //     console.log("buydata from Context:", buydata);
  //   }
  // }, [buydata]);

  useEffect(() => {
    let storedBuyData = JSON.parse(localStorage.getItem("buydata"));
    
    if (!buydata || buydata.length === 0) {
      console.log("Restoring buydata from LocalStorage:", storedBuyData);
      setpurchaseproduct(Array.isArray(storedBuyData) ? storedBuyData : []);
    } else {
      console.log("buydata from Context:", buydata);
      setpurchaseproduct(Array.isArray(buydata) ? buydata : []);
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
  console.log("guggu babuu",purchaseproduct)
  
}
const totalDiscountPrice = purchaseproduct.reduce((sum, item) => sum + item.discountprice, 0);
const totalPrice = purchaseproduct.reduce((sum, item) => sum + item.price, 0);

const [mywalletSelectedOption, setMywalletSelectedOption] = useState("wallet");
const [mywalletAmount, setMywalletAmount] = useState(walletkapesa || 0);
const [mywalletDropdownOpen, setMywalletDropdownOpen] = useState(false);

const handleSelect = (option) => {
  setMywalletSelectedOption(option);
  if (option === "wallet") {
    setMywalletAmount(userDetails.wallet.cashback || 0);
  } else {
    setMywalletAmount(userDetails?.wallet?.points ? userDetails?.wallet?.points * 2.5 : 0); // 1 point = 2.5 Rs
  }
  setMywalletDropdownOpen(false); // Select karte hi dropdown band ho jayega
};


const paymentContainer = {
  background: '#fff',
  padding: '16px',
  fontFamily: 'sans-serif',
  maxWidth: '480px',
  margin: 'auto',
  borderRadius: '10px',
};

const sectionTitle = {
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '8px',
};

const discountNote = {
  color: 'purple',
  fontSize: '14px',
  marginBottom: '16px',
};

const upiBox = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
  position: 'relative',
};

const badge = {
  position: 'absolute',
  top: '-10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#00c389',
  color: 'white',
  fontSize: '12px',
  padding: '2px 10px',
  borderRadius: '12px',
};

const upiIcons = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '12px',
  marginBottom: '12px',
};

const phnupiIcon = {
  
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#f3e9fb',
  padding: '6px',
};
const gpayupiIcon = {
  
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#fdecec',
  padding: '6px',
};
const paytmupiIcon = {
  
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#e8f3fd',
  padding: '6px',
};
const anyupiIcon = {
  
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  backgroundColor: '#e8f8f3',
  padding: '6px',
};

const payBox = {
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
};

const input = {
  flex: 1,
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const payBtn = {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 16px',
  cursor: 'pointer',
};

const method = {
  position: 'relative',
  backgroundColor: 'black',
  color: 'white',
  padding: '16px',
  marginBottom: '12px',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '16px',
};

const discountBadge = {
  position: 'absolute',
  top: '-10px',
  left: '90px',
  backgroundColor: '#00c389',
  color: 'white',
  fontSize: '12px',
  padding: '2px 10px',
  borderRadius: '12px',
  zIndex: 1,

};

const codBadge = {
  position: 'absolute',
  top: '-10px',
  left: '90px',
  backgroundColor: '#e53935',
  color: 'white',
  fontSize: '12px',
  padding: '2px 10px',
  borderRadius: '12px',
  zIndex: 1,

};

const icon = {
  marginRight: '8px',
};


  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* Address Section */}
      <NavLink to='/address' className="navlink">
      <div className="address-section-checkoutbuy">
      <p>
  {deleveryaddress.length > 0
    ? `${deleveryaddress[0].building}/${deleveryaddress[0].locality}, ${deleveryaddress[0].city}`
    : "No address available"}
    {/* <IoIosArrowForward onClick={()=>{setShowSheet(true)}}></IoIosArrowForward> */}
</p>

      </div>
      </NavLink>

      {/* Review Item Section */}
      <div className="review-item-section-checkoutbuy">
        <p onClick={()=>{setShowSheet(true)}}>Review item</p>
        <IoIosArrowForward onClick={()=>{setShowSheet(true)}}></IoIosArrowForward>
        {/* <p>₹1,899</p> */}
      </div>

      {/* Coupons Section */}
      <div className="coupons-section-checkoutbuy">
        <p>View coupons</p>
        <IoIosArrowForward/>
      </div>

      {/* Payment Options */}
      {/* <div className="payment-options-checkoutbuy">
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
            <p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0</p>
          </label>
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="Credit/Debit Card"
              checked={selectedPayment === "Credit/Debit Card"}
              onChange={() => setSelectedPayment("Credit/Debit Card")}
            />
            <span>Credit/Debit Card</span>
            <p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0</p>
          </label>
          <label className="payment-option-checkoutbuy">
            <input
              type="radio"
              value="Net Banking"
              checked={selectedPayment === "Net Banking"}
              onChange={() => setSelectedPayment("Net Banking")}
            />
            <span>Net Banking</span>
            <p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.00</p>
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
            <p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice +30):(totalDiscountPrice + 30)}.0</p>
          </label>
        </div>
      </div> */}
<div style={paymentContainer}>
      <div style={sectionTitle}>Payment Options</div>
      <div style={discountNote}>Additional 5% discount upto 20 on Prepaid Orders</div>

      {/* UPI Section */}
      <div style={upiBox}>
        <div style={badge}>Get 5% discount</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>UPI</div>
          <div style={{ fontWeight: 'bold' }}><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0</p> </div>
        </div>

        <div style={upiIcons} >
          <img style={phnupiIcon} src={phonepay} alt="PhonePe"/>
          <img style={gpayupiIcon} src={gpay} alt="GPay" />
          <img style={paytmupiIcon} src={paytm} alt="Paytm" />
          <img style={anyupiIcon} src={upi} alt="Paytm" />
          {/* <img style={upiIcon} src= alt="Any UPI" /> */}
        </div>

        <div style={payBox}>
          <input style={input} type="text" placeholder="Enter your UPI ID" />
          <button style={payBtn}>Pay</button>
        </div>
      </div>

      {/* Other Methods */}
      <div style={{ position: 'relative' }}>
        <div style={discountBadge}>Get 5% discount</div>
        <div style={method}>
          <span>💳 Pay via Card</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={discountBadge}>Get 5% discount</div>
        <div style={method}>
          <span>👛 Pay via Wallets</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={discountBadge}>Get 5% discount</div>
        <div style={method}>
          <span>🏦 Pay via Netbanking</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={codBadge}>₹59 COD fee added</div>
        <div style={method}>
          <span>💵 Cash on Delivery</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>
    </div>
      {/* Order Details */}
      <div className="order-details-checkoutbuy">
        <h3>Order Details</h3>
        <div className="order-row-checkoutbuy">
          <span>MRP</span>
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].price):(totalPrice)}.0</span>
        </div>
        <div className="order-row-checkoutbuy">
          <span>Discount on MRP</span>
          {/* <span>-₹{purchaseproduct[0].price-purchaseproduct[0].discountprice}</span> */}
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].price-purchaseproduct[0].discountprice):(totalPrice-totalDiscountPrice)}.0</span>
        </div>
        
        {/* <div className="order-row-checkoutbuy">
          <span>Wallet Money</span>
          <span>{`₹${walletkapesa?(walletkapesa):(0)}`}</span>
        </div> */}
        <div className="order-row-checkoutbuy relative">
      <span>Wallet Money</span>
      <span>{`₹${mywalletAmount}`}</span>

      <div className="relative">
        <button
         style={{color:"white"}}
          className="border px-3 py-1 rounded bg-gray-200"
          onClick={() => setMywalletDropdownOpen(!mywalletDropdownOpen)}
        >
          {mywalletSelectedOption === "wallet" ? "Wallet Money" : "Points"}
        </button>

        {mywalletDropdownOpen && (
          <div className="absolute bg-white border rounded shadow-md mt-1 w-full">
            <p
              className="px-3 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect("wallet")}
            >
              Wallet Money
            </p>
            <p
              className="px-3 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect("points")}
            >
              Points
            </p>
          </div>
        )}
      </div>
    </div>
        
        <div className="order-row-checkoutbuy">
          <span>Shipping Fee (Non Refundable)</span>
          <span>₹0</span>
        </div>
        <div className="order-row-checkoutbuy payable-row-checkoutbuy">
          <span>Payable amount</span>
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice)-mywalletAmount:(totalDiscountPrice)-mywalletAmount}.0</span>
        </div>
        <p className="discount-text-checkoutbuy">🎉 Yay! You saved ₹{purchaseproduct.length==1?(purchaseproduct[0].price-purchaseproduct[0].discountprice+mywalletAmount):(totalPrice-totalDiscountPrice+mywalletAmount)}.0 on the final amount</p>
      </div>

      <TimeSlots/>

    {timeslotlelo?(<button className="pay-now-btn-checkoutbuy" onClick={()=>{orderplaced(purchaseproduct,deleveryaddress);setTimeout(()=>{recordMultipleSales(purchaseproduct)},300) }} >Pay Now</button>):('')}


{/* review buy data */}
<div className="bottom-sheet" style={{display:showSheet?('block'):('none')}}>
<p>Review item</p>
<button onClick={()=>{setShowSheet(false)}} className="closed-button">
          ✖
        </button>

        {
          purchaseproduct.map((e)=>(
            <>
            {/* <div className="sheet-header">
        <p className="item-price">₹{e.discountprice}</p>
        </div> */}
      <div className="sheet-content">
        <div className="item-info">
          
          <img
            src={img1} // Replace with your product image URL
            alt="Product"
            className="product-image-sheet"
          />
          <div className="item-details">
            <span className="item-price">₹{e.discountprice}</span>
            <h4>{e.description}</h4>
            <p>Size: {e.size} &nbsp;&nbsp; Qty: {e.qty}</p>
            <p className="delivery-info">
              Deliver by <span className="delivery-date">60 minute delivery</span>
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
