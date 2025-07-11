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
import CouponCard from "./CouponCard";
import Slideuptoast from "./Slideuptoast";
import BundleProduct from "./BundleProduct";
const Checkout = () => {


 

const { buydata, addresssetkro,orderplaced,walletkapesa,timeslotlelo,fetchCoupons,coupons,karocode,fetchDistance,distance} = useBio();
// const{userDetails}=useAuth()
const{userDetails}=useFirebaseAuth()
const{recordMultipleSales}=useDashboard()
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Hook to detect navigation
  const [showSheet, setShowSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const[firstcode,setfirstcode]=useState('')
  const[firstcpn,setfirstcpn]=useState([])

const[amountafteraddcoupon,setamountafteraddcoupon]=useState()
const[yppicode,setyppicode]=useState(false)
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
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("🍿 Checking if product has category and tag (delayed) in checkout:", purchaseproduct);
    if (purchaseproduct[0]?.cate && purchaseproduct[0]?.tag) {
      console.log("📢 Calling fetchCoupons with checkout:", purchaseproduct[0].cate, purchaseproduct[0].tag);
      fetchCoupons(purchaseproduct[0].cate, purchaseproduct[0].tag);
    }
  }, 200);  // Delay by 200ms

  return () => clearTimeout(timer);
}, [purchaseproduct]);
 
  const toggleSheet = () => setShowSheet(!showSheet);
if(buydata){
  console.log("mera naam bhay",buydata)
  console.log("guggu babuu",purchaseproduct)
  
}
// const totalDiscountPrice = purchaseproduct.reduce((sum, item) => sum + item.discountprice, 0) ;
// const totalPrice = purchaseproduct.reduce((sum, item) => sum + item.price, 0);

const totalDiscountPrice = purchaseproduct.reduce((sum, item) => {
  if (item.bundle && item?.bundle[0]?.bundletotalamount) {
    return sum +item?.bundle[0]?.bundletotalamount;
  }
  return sum + (item.discountprice || 0);
}, 0);

const totalPrice = purchaseproduct.reduce((sum, item) => {
  if (item.bundle && item?.bundle[0]?.bundletotalamount) {
    return sum + item?.bundle[0]?.bundletotalamount;
  }
  return sum + (item.price || 0);
}, 0);


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

useEffect(()=>{
  fetchDistance(deleveryaddress)
},[])

useEffect(() => {
  console.log("dekhte h gusse kya inske andar",karocode)
  if(karocode?.length==0)
  {
  if (coupons && Array.isArray(coupons)) {
    const firstOrderCoupon = coupons.find(c => c.couponType === "First Order" );
    setfirstcpn(firstOrderCoupon)
    console.log("dekhte h gusse kya inske andar",firstOrderCoupon)
    if (firstOrderCoupon) {
      const original = totalDiscountPrice .toFixed(2);
      console.log("dekhte h gusse kya inske andar",original)
      let discounted;

      // Check if discount is percentage or flat
      if (firstOrderCoupon.discountType === "Percentage") {
        const discountAmount = (totalDiscountPrice  * firstOrderCoupon.discountValue) / 100;
        console.log("final amount kya h ",discountAmount)
        setamountafteraddcoupon(discountAmount)
        discounted = (totalDiscountPrice  - discountAmount).toFixed(2);
      } else {
        // default to flat discount
        discounted = (totalDiscountPrice  - firstOrderCoupon.discountValue).toFixed(2);
        setamountafteraddcoupon(discounted)
        console.log("final amount kya h ",discountAmount)
      }
      setyppicode(true)
// setTimeout(()=>{
//             setyppicode(false)
//           },5000)
      // const toast = document.createElement("div");
      
    }
  }
}
else{
  if (coupons && Array.isArray(coupons)) {
    const firstOrderCoupon = coupons.find(c => c.code === karocode );
    setfirstcpn(firstOrderCoupon)
    console.log("dekhte h gusse kya inske andar",firstOrderCoupon)
    if (firstOrderCoupon) {
      const original = totalDiscountPrice .toFixed(2);
      console.log("dekhte h gusse kya inske andar",original)
      let discounted;

      // Check if discount is percentage or flat
      if (firstOrderCoupon.discountType === "Percentage") {
        const discountAmount = (totalDiscountPrice  * firstOrderCoupon.discountValue) / 100;
        console.log("final amount kya h ",discountAmount)
        setamountafteraddcoupon(discountAmount)
        discounted = (totalDiscountPrice  - discountAmount).toFixed(2);
      } else {
        // default to flat discount
        discounted = (totalDiscountPrice  - firstOrderCoupon.discountValue).toFixed(2);
        console.log("final amount kya h ",discountAmount)
        setamountafteraddcoupon(discounted)
      }
setyppicode(true)
// setTimeout(()=>{
//             setyppicode(false)
//           },5000)
      
    }
  }
}
}, [coupons, totalDiscountPrice,karocode,firstcpn]);



  return (
    <div className="checkout-container-checkoutbuy">
      <h2 className="checkout-title-checkoutbuy">Checkout</h2>

      {/* Address Section */}
      <NavLink to='/address/chek' className="navlink">
      <div className="address-section-checkoutbuy">
      <span>
  {deleveryaddress.length > 0
    ? `${deleveryaddress[0].building}/${deleveryaddress[0].locality}, ${deleveryaddress[0].city}`
    : "No address available"}
    {/* <IoIosArrowForward onClick={()=>{setShowSheet(true)}}></IoIosArrowForward> */}
</span>

      </div>
      </NavLink>

      {/* Review Item Section */}
      <div className="review-item-section-checkoutbuy">
        <span onClick={()=>{setShowSheet(true)}}>Review item</span>
        <IoIosArrowForward onClick={()=>{setShowSheet(true)}}></IoIosArrowForward>
        {/* <p>₹1,899</p> */}
      </div>

      {/* Coupons Section */}
      <div className="coupons-section-checkoutbuy" onClick={() => setShowToast(true)}>
        {/* <span style={{fontWeight:"600"}}>`{firstcpn?.code} Applied`</span> */}
        <span style={{fontWeight:"600"}}>{firstcpn?.code?(`${firstcpn?.code} Applied`):('Apply Coupon')}</span>

        
        {/* <span style={{color:"red",fontWeight:"800"}}>₹{amountafteraddcoupon} <IoIosArrowForward style={{color:"black"}}/></span> */}
        <span style={{color:"red",fontWeight:"800"}}>{amountafteraddcoupon?(`₹${amountafteraddcoupon}`):('') }<IoIosArrowForward style={{color:"black"}}/></span>

        
        
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
          <div style={{ fontWeight: 'bold' }}><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice):(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)}.0</p> </div>
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
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice):(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={discountBadge}>Get 5% discount</div>
        <div style={method}>
          <span>👛 Pay via Wallets</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice):(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={discountBadge}>Get 5% discount</div>
        <div style={method}>
          <span>🏦 Pay via Netbanking</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice):(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div>

      {/* <div style={{ position: 'relative' }}>
        <div style={codBadge}>₹59 COD fee added</div>
        <div style={method}>
          <span>💵 Cash on Delivery</span>
          <span><p>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice):(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)}.0 ›</p></span>
        </div>
      </div> */}
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

         <div className="order-row-checkoutbuy">
          <span>Discounted Price</span>
          {/* <span>-₹{purchaseproduct[0].price-purchaseproduct[0].discountprice}</span> */}
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice):(totalDiscountPrice)}.0</span>
        </div>
        {
          firstcpn?.code || karocode?(<div className="order-row-checkoutbuy">
          <span>Amount After Coupon {firstcpn?.code ||karocode} Applied</span>
          {/* <span>-₹{purchaseproduct[0].price-purchaseproduct[0].discountprice}</span> */}
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].price-purchaseproduct[0].discountprice):(Math.round((totalDiscountPrice)-amountafteraddcoupon) || totalPrice-totalDiscountPrice)}.0</span>
        </div>):('')
        }
         
        
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
          <span>₹{purchaseproduct.length==1?(purchaseproduct[0].discountprice-amountafteraddcoupon || purchaseproduct[0].discountprice)-mywalletAmount:(totalDiscountPrice-amountafteraddcoupon || totalDiscountPrice)-mywalletAmount}.0</span>
        </div>
        <p className="discount-text-checkoutbuy">🎉 Yay! You saved ₹{purchaseproduct.length==1?(Math.abs(amountafteraddcoupon+mywalletAmount) || purchaseproduct[0].price-purchaseproduct[0].discountprice+mywalletAmount):(Math.abs(amountafteraddcoupon+mywalletAmount) || totalPrice-totalDiscountPrice+mywalletAmount)}.0 on the final amount</p>
      </div>

     {deleveryaddress[0].city=="Jaipur"?(<TimeSlots/>):('') }

    {timeslotlelo?(<button className="pay-now-btn-checkoutbuy" onClick={()=>{orderplaced(purchaseproduct,deleveryaddress);/*setTimeout(()=>{recordMultipleSales(purchaseproduct)},300)*/ }} >Pay Now</button>):('')}


{
  yppicode ? (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // ensure exact centering
        background: "#00c389",
        zIndex: "9999",
        borderRadius: "12px",
        padding: "10px",
        maxWidth: "90%",
        width: "300px",
        color: "#1a1a1a",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div style={{ fontSize: "40px" }}>🎉</div>
      <div style={{ fontSize: "12px", marginBottom: "8px" }}>
        '{firstcpn.code}' Applied
      </div>
      <div style={{ fontSize: "16px", color: "#1a1a1a" }}>
        YAY! You saved ₹{(totalDiscountPrice * firstcpn.discountValue) / 100}
      </div>
      <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
        Your coupon is successfully applied
      </div>
      <div style={{ marginTop: "12px" }}>
        <span
          style={{
            fontSize: "14px",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={() => setyppicode(false)}
        >
          okay, got it
        </span>
      </div>
    </div>
  ) : (
    ""
  )
}

{/* review buy data */}
<div className="bottom-sheet" style={{display:showSheet?('block'):('none')}}>
<p>Review item</p>
<button onClick={()=>{setShowSheet(false)}} className="closed-button">
          ✖
        </button>

       {purchaseproduct.map((order, i) => (
  <>
    {Array.isArray(order.bundle) && order.bundle.length > 0 ? (
  
      <BundleProduct
        source="checkout"
        originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
        totalPrice={1000}
        products={[
          {
            userid: order.bundle[0]?.userId,
            productId: order.bundle[0].productId,
            title: order.bundle[0].title,
            image: order.bundle[0].image,
            color: order.bundle[0].color,
            original: order.bundle[0].original,
            price: order.bundle[0].price,
            sizes: order.bundle[0].sizes,
          },
          {
            userid: order.bundle[1]?.userId,
            productId: order.bundle[1]?.productId,
            title: order.bundle[1]?.title,
            image: order.bundle[1]?.image,
            color: order.bundle[1]?.color,
            original: order.bundle[1]?.original || 500,
            price: order.bundle[1]?.price || 300,
            sizes: order.bundle[1]?.sizes,
          },
        ]}
      />
      
    ) : (
      <div key={i} className="sheet-content">
        <div className="item-info">
          <img
            src={order.image}
            alt="Product"
            className="product-image-sheet"
          />
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
    )}
  </>
))}

      
    </div>   
{showToast && <Slideuptoast coupon={coupons} firstcpns={firstcpn} totalDiscountPrice={totalDiscountPrice} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default Checkout;
