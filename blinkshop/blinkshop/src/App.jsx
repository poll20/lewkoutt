// import React, { useState, useEffect } from 'react'
// import ResponsiveNavbar from './components/Navbar'
// import {  useParams } from "react-router-dom";
// import "./App.css"
// import "./components/Card.css"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Footer from './components/Footer';
// import Card from './components/Card';
// import ProductDescription from './components/ProductDescription';
// import "./components/Card.css"
// import AddToCart from './components/AddToCart';
// import Signup from './components/Signup';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import ScrollToTop from './components/ScollToTop';
// import LoginButton from './components/Login';
// import { BioProvider } from './components/BioContext';
// import Wishlist from './components/Wishlist';
// import UserProfile from './components/UserProfile';
// import FilterComponent from './components/FilterComponent';
// import BottomUpSlidingList from './components/BottomUpSlidingList';
// import { AuthProvider } from './components/AuthContext';
// import UserOrder from './components/UserOrder';
// import AddressList from './components/AddressList';
// import Refferal from './components/Refferal';
// import SizeChart from './components/SizeChart';
// import Filter from './components/Filter';
// import HeartButton from './components/HeartButton';
// import Checkout from './components/CheckOut';
// import SearchCoponent from './components/SearchComponent';


// export default function App() {
  

//   let [cartdata, setcartdata] = useState([])
//   let [cartitem, setcartitem] = useState([])
//   let {admin}=useParams()
//   let fetchdata = async () => {
//     try {
//       let cartitem = await fetch("http://localhost:3000/cart");
//       let cartitemjson = await cartitem.json();
//       setcartdata(cartitemjson); // Assuming setcartdata is your state updater function
//       // console.log("Cart data:", cartitemjson);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     }
//   };
 

//   let addtocartitemm = async () => {
//     try {
//       let res = await fetch("http://localhost:3000/addtocart");
//       let cartitem = await res.json();
//       setcartitem(cartitem); // Assuming setcartitem is your state updater function
//       // console.log('lolo',cartitem)
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   // Using `useEffect` to fetch data when the component mounts
//   useEffect(() => {
//     fetchdata(); // Fetch cart data
//     addtocartitemm(); // Add item to the cart
//   }, []);

  
//   return (
//     <>

//       <div className="body">
//         <AuthProvider>
//           <BioProvider>
//             <Router>
//               <ScrollToTop />
//               <ResponsiveNavbar />
//               {/* <FilterComponent/> */}
//               <div className="main-content">
//               <Routes>
//                 {/* <Route path='/' element={<Home />}></Route>
//                 <Route path='/card' element={<Card />}></Route> */}

//                 {/* <Route path='/productmodel/:section' element={<Card />}></Route>
//                 <Route path='/productdescription/:id' element={<ProductDescription />}></Route> */}

//                 {/* <Route path='/cart' element={
//                  <div className='shop-cart-heading'><BioProvider addtocartitem={cartitem} cartitem={cartdata}><AddToCart /></BioProvider>
//                  </div>}>
//                  </Route> */}
                
//                 <Route path='/' element={<Home />}></Route>
//                 <Route path='/card' element={<Card />}></Route>
//                 <Route path='/productmodel/:section' element={<Card />}></Route>
//                 <Route path='/productdescription/:id' element={<ProductDescription />}></Route>
//                 <Route path='/cart' element={
//                  <div className='shop-cart-heading'><BioProvider addtocartitem={cartitem} cartitem={cartdata}><AddToCart /></BioProvider>
//                  </div>}>
//                  </Route>
//                 <Route path='/login' element={<Login />}></Route>
//                 <Route path='/searchme' element={<SearchCoponent />}></Route>
//                 <Route path='/createaccount' element={<Signup />}></Route>
//                 <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
//                 <Route path='/rentcompo' element={<BottomUpSlidingList />}></Route>
//                 <Route path='/userorder' element={<UserOrder />}></Route>
//                 <Route path='/address' element={<AddressList />}></Route>
//                 <Route path='/refferal' element={<Refferal />}></Route>
//                 <Route path='/sizechart/:cate' element={<SizeChart />}></Route>
//                 <Route path='/store/:store' element={<Card />}></Route>
//                 <Route path='/rent/:rent' element={<Card />}></Route>
//                 <Route path='/wishlist/:wish' element={<Card />}></Route>
//                 <Route path='/bestsalling/:bestsale' element={<Card />}></Route>
//                 <Route path='/filter' element={<Filter />}></Route>
//                 <Route path='/checkout' element={<Checkout />}></Route>
//                </Routes>
//           </div>
//           <Footer /> 
//           </Router>
//           </BioProvider>
//         </AuthProvider>
//       </div>
//     </>
//   )
// }
import { LoadingProvider, useLoading } from "./components/LoadingContext";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScollToTop";
import { AuthProvider } from "./components/AuthContext";
import { BioProvider, useBio } from "./components/BioContext";
import "./App.css"
// ✅ Normal Website Components
import Home from "./components/Home";
import Card from "./components/Card";
import ProductDescription from "./components/ProductDescription";
import AddToCart from "./components/AddToCart";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import UserProfile from "./components/UserProfile";
import Checkout from "./components/CheckOut";
import AddressList from "./components/AddressList";
import SearchComponent from "./components/SearchComponent";
import UserOrder from "./components/UserOrder";
import Refferal from "./components/Refferal";
import SizeChart from "./components/SizeChart";
import Filter from "./components/Filter";
import BottomUpSlidingList from "./components/BottomUpSlidingList";

// ✅ Admin Dashboard Components
// import DashBoard from "./components/dashboardforadmin/DashBoard";
import DashNavbar from "./components/dashboardforadmin/DashNavbar";
import DahBoard from "./components/dashboardforadmin/DahBoard";
import AvailableProduct from "./components/dashboardforadmin/AvailableProduct";
import DashCategory from "./components/dashboardforadmin/DashCategory";
import LowStock from "./components/dashboardforadmin/LowStock";
import OutOfStock from "./components/dashboardforadmin/OutOfStock";
import AddData from "./components/dashboardforadmin/AddData";
import { DashboardProvider } from "./components/dashboardforadmin/DashboardContext";
import RegisterUser from "./components/dashboardforadmin/RegisterUser";
import NewArrival from "./components/dashboardforadmin/NewArrival";
import GlobalAlert from "./components/dashboardforadmin/GlobalAlert";
import Wallet from "./components/Wallet";
import Ordersofusers from "./components/dashboardforadmin/Ordersofusers";
import ShopkeeperDashboard from "./components/ShopKeeperDashboard";
import ReturnRequest from "./components/ReturnRequest";
import ReturnDataTable from "./components/dashboardforadmin/ReturnDataTable";
import Faq from "./components/Faq";
import AboutUs from "./components/AboutUs";
import MyLogin from "./components/MyLogin";
import OTPLogin from "./components/OtpLogin";
import MapWithAutocompelete from "./components/MapWithAutoCompelete";
// import Toast from "./components/Toast";
import PopUpNotificationss from "./components/PopUpNotificationss";

import GlobalLoader from "./components/GlobalLoader";
import { FirebaseAuthProvider } from "./components/FirebaseContext";
import TermsAndConditions from "./components/TermsAndConditions";
import Moodcom from "./components/Moodcom";
import MoodMsgType from "./components/dashboardforadmin/MoodMsgType";
import MoodMagManager from "./components/dashboardforadmin/MoodMsgManager";
import UserActivity from "./components/dashboardforadmin/UserActivity";
import OfferBanner from "./components/OfferBanner";
import Coupon from "./components/dashboardforadmin/CouponForm";
import CouponForm from "./components/dashboardforadmin/CouponForm";
import ReviewProduct from "./components/ReviewProduct";
import SlotControl from "./components/dashboardforadmin/SlotControl";
import Bandle from "./components/dashboardforadmin/Bandle";

import OtpLogin from "./components/OtpLogin";
import OrderConfirmation from "./components/OrderConfimation";
import ComingSoon from "./components/ComingSoon";
import { OrderAlertProvider } from "./components/dashboardforadmin/OrderAlertProvider";
// import { OrderAlertProvider } from "./components/OrderAlertProvider";
// import { useOrderAlert } from "./components/OrderAlertProvider";
// import { OrderAlertProvider } from "./OrderAlertContext";
// import BundleProduct from "./components/BundleProduct";

export default function App() {
  // const [cartData, setCartData] = useState([]);
  // const [cartItem, setCartItem] = useState([]);
    const hostname = window.location.hostname;

  const [popupMessage, setPopupMessage] = useState("");
  
  const { setIsLoading } = useLoading(); // ✅ add this inside the App component
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/shopkeeper");
// const navigate=useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   useEffect(() => {
//   const setVh = () => {
//     const vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//   };

//   setVh();

//   window.addEventListener('resize', setVh);
//   window.addEventListener('orientationchange', setVh);

//   return () => {
//     window.removeEventListener('resize', setVh);
//     window.removeEventListener('orientationchange', setVh);
//   };
// }, []);

  // useEffect(() => {
  //   // const fetchData = async () => {
    
  //   //   try {
  //   //     let cartRes = await fetch(`http://localhost:3000/cart`);
  //   //     let cartJson = await cartRes.json();
  //   //     setCartData(cartJson);
  //   //   } catch (error) {
  //   //     console.error("Error fetching cart data:", error);
  //   //   }
    
  //   // };

  //   const fetchCartItems = async () => {
  //     try {
  //       let res = await fetch("http://localhost:3000/addtocart");
  //       let cartJson = await res.json();
  //       setCartItem(cartJson);
  //     } catch (error) {
  //       console.error("Error fetching add-to-cart data:", error);
  //     }
  //   };

  //   // fetchData();
  //   fetchCartItems();
  // }, []);
  useEffect(() => {
    console.log("GlobalLoader triggered..."); // Debug
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  
  // useEffect(() => {
  //   const keepAlive = setInterval(() => {
  //     fetch("https://lewkoutt.onrender.com/ping")
  //       .then((res) => console.log("Keeping Server Alive"))
  //       .catch((err) => console.error(err));
  //   }, 300000); // 5 min

  //   return () => clearInterval(keepAlive); // Cleanup when unmounting
  // }, []);
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
  //   script.async = true;
  //   script.defer = true;
  //   document.head.appendChild(script);
  // }, []);
  const showPopup = (msg) => {
    console.log("msg agya na showpopup sehehehe",msg)
    setPopupMessage(msg);
  };

     if (hostname !== "localhost" || "lewkout.netlify.app") {
    // deployed site ke liye
    return <ComingSoon/>;
  }


  if (!isMobile && !isAdminRoute) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>This site is only accessible on mobile devices.</h2>
        <p>Please open it on a mobile phone or resize your browser to mobile width.</p>
      </div>
    );
  }
  return (
    <FirebaseAuthProvider showPopup={showPopup}>
    <AuthProvider>
    <DashboardProvider>
    
      <BioProvider  showPopup={showPopup} >
        <Router>
          <ScrollToTop />
          {/* {popupMessage && (
    <PopUpNotificationss
      message={popupMessage}
      onClose={() => setPopupMessage("")}
    />
  )} */}
  <div id="popup-wrapper">
  {popupMessage && (
    <PopUpNotificationss
      message={popupMessage}
      onClose={() => setPopupMessage("")}
    />
  )}
</div>
          <Layout showPopup={showPopup}/>
        </Router>
      </BioProvider>
    
    </DashboardProvider>
    </AuthProvider>
    </FirebaseAuthProvider>
  
  );
}


// ✅ Separate Layout Component to Hide Navbar & Footer on Admin Routes
function Layout({ showPopup }) {
  const location = useLocation();
 

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isabout = location.pathname.startsWith("/aboutus");
  const isref = location.pathname.startsWith("/refferal");
  const mood = location.pathname.startsWith("/mood");
    const pd = location.pathname.startsWith("/productdescription");
        const searchme = location.pathname.startsWith("/searchme");


     

  
  return (
    <>
    <GlobalLoader/>
      {!isAdminRoute && <ResponsiveNavbar pd={pd}/>}
      {isAdminRoute ? (
        <div className="admin-ka-panel-container">

          <DashNavbar />
          {/* <OfferBanner/> */}
          <GlobalAlert/>
          <OrderAlertProvider>
          <div className="admin-ka-panel-main">
              
            <Routes>
            
              <Route path="/admin" element={<DahBoard />} />
              <Route path="/admin/available-products" element={<AvailableProduct />} />
              <Route path="/admin/category" element={<DashCategory />} />
              <Route path="/admin/lowstock" element={<LowStock/>} />
              <Route path="/admin/outofstock" element={<OutOfStock/>} />
              <Route path="/admin/adddata" element={<AddData/>} />
              <Route path="/admin/registeruser" element={<RegisterUser/>} />
              <Route path="/admin/newarrival" element={<NewArrival/>} />
              <Route path="/admin/userorder" element={<Ordersofusers/>} />
              <Route path="/admin/returnmyorder" element={<ReturnDataTable/>} />
              <Route path="/admin/moodmsg" element={<MoodMsgType/>} />
              <Route path="/admin/moodmngr" element={<MoodMagManager/>} />
              <Route path="/admin/coupon" element={<CouponForm/>} />
              <Route path="/admin/useractivity/:id" element={<UserActivity/>} />

              <Route path="/admin/slots" element={<SlotControl/>} />
              {/* <Route path="/admin/bandle" element={<Bandle/>} /> */}
              <Route path="/admin/bandle" element={<Bandle/>} />



            </Routes>
            

          </div>
          </OrderAlertProvider>
        </div>
      ):( <div className="mainnn-contenttttttt">
        <div className="contenttt" >
        {console.log("Admin Route Status:", isAdminRoute)} {/* ✅ Debugging */}
          <Routes>
            {/* ✅ Normal Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="/productmodel/:section" element={<Card />} />
            <Route path="/searchresults" element={<Card />} />
            <Route path="/productdescription/:id/:coloring" element={<ProductDescription showPopup={showPopup}/>} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/searchme" element={<SearchComponent />} />
            <Route path="/createaccount" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/rentcompo" element={<BottomUpSlidingList />} />
            <Route path="/userorder" element={<UserOrder />} />
            <Route path="/address/:sec" element={<AddressList />} />
            <Route path="/refferal" element={<Refferal />} />
            <Route path="/sizechart/:cate" element={<SizeChart />} />
            <Route path="/store/:store" element={<Card />} />
            <Route path="/rent/:rent" element={<Card />} />
            <Route path="/wishlist/:wish" element={<Card />} />
            <Route path="/bestsalling/:bestsale" element={<Card />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/faq" element={<Faq/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/terms" element={<TermsAndConditions/>} />
            <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
            <Route path="/return/:id" element={<ReturnRequest/>} />
            <Route path="/loginn" element={<OTPLogin/>} />
            <Route path="/mood" element={<Moodcom/>} />
            <Route path="/maps" element={<MapWithAutocompelete/>} />
              <Route path="/orderconfirm" element={<OrderConfirmation/>} />
            
            <Route path="/prdreview/:id/:avgrating" element={<ReviewProduct/>} />

            

            {/* { toastmsg.length>0?(<Toast message={toastmsg}  />):('')
        
      }
   */}
          
  
          </Routes>
          </div>   
           
        </div>)}
      

     
      

      {!isAdminRoute && !isabout && !isref  && !mood  &&  !searchme && <div className="mainnn-contenttttttt"> <Footer /></div>}
    
    
    </>
  );
}

