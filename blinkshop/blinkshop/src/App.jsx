import { LoadingProvider, useLoading } from "./components/LoadingContext";
import React, { useState, useEffect,Suspense  } from "react";
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

import Login from "./components/Login";

import UserProfile from "./components/UserProfile";

import Checkout from "./components/CheckOut";

import AddressList from "./components/AddressList";

import SearchComponent from "./components/SearchComponent";

import UserOrder from "./components/UserOrder";

import SizeChart from "./components/SizeChart";

import Filter from "./components/Filter";

import BottomUpSlidingList from "./components/BottomUpSlidingList";

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

import ReturnRequest from "./components/ReturnRequest";
import ReturnDataTable from "./components/dashboardforadmin/ReturnDataTable";
import Faq from "./components/Faq";
import AboutUs from "./components/AboutUs";

import OTPLogin from "./components/OtpLogin";
import MapWithAutocompelete from "./components/MapWithAutoCompelete";





import PopUpNotificationss from "./components/PopUpNotificationss";

import GlobalLoader from "./components/GlobalLoader";
import { FirebaseAuthProvider } from "./components/FirebaseContext";
import TermsAndConditions from "./components/TermsAndConditions";
import Moodcom from "./components/Moodcom";
import MoodMsgType from "./components/dashboardforadmin/MoodMsgType";
import MoodMagManager from "./components/dashboardforadmin/MoodMsgManager";
import UserActivity from "./components/dashboardforadmin/UserActivity";



import CouponForm from "./components/dashboardforadmin/CouponForm";
import ReviewProduct from "./components/ReviewProduct";
import SlotControl from "./components/dashboardforadmin/SlotControl";
import Bandle from "./components/dashboardforadmin/Bandle";




import OrderConfirmation from "./components/OrderConfimation";

import { OrderAlertProvider } from "./components/dashboardforadmin/OrderAlertProvider";
import PrivacyPolicy from "./components/PrivicyPolicy";


export default function App() {


  const [popupMessage, setPopupMessage] = useState("");
  
  
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


  const showPopup = (msg) => {
    console.log("msg agya na showpopup sehehehe",msg)
    setPopupMessage(msg);
  };

 


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
 const { setIsLoading,isLoading } = useLoading(); // ✅ add this inside the App component

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
        <div className="admin-ka-panel-container" >

          <DashNavbar />
          {/* <OfferBanner/> */}
          <GlobalAlert/>
          <OrderAlertProvider>
          <div className="admin-ka-panel-main">
                <Suspense fallback={<GlobalLoader />}>
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
            </Suspense>

          </div>
          </OrderAlertProvider>
        </div>
      ):( <div className="mainnn-contenttttttt">
        <div className="contenttt" >
          <Suspense fallback={<GlobalLoader />}>
        {console.log("Admin Route Status:", isAdminRoute)} {/* ✅ Debugging */}
          <Routes>
            {/* ✅ Normal Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="/productmodel/:section" element={<Card />} />
            <Route path="/searchresults" element={<Card />} />
            <Route path="/productdescription/:slug/:id/:coloring" element={<ProductDescription showPopup={showPopup}/>} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/searchme" element={<SearchComponent />} />
         
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/rentcompo" element={<BottomUpSlidingList />} />
            <Route path="/userorder" element={<UserOrder />} />
            <Route path="/address/:sec" element={<AddressList />} />
    
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
            {/* <Route path="/terms" element={<TermsAndConditions/>} /> */}
            
            <Route path="/return/:id" element={<ReturnRequest/>} />
            <Route path="/loginn" element={<OTPLogin/>} />
            <Route path="/mood" element={<Moodcom/>} />
     


            <Route path="/maps" element={<MapWithAutocompelete/>} />
            <Route path="/policy" element={<PrivacyPolicy email="" phone=""/>}/> 
           

              <Route path="/orderconfirm" element={<OrderConfirmation/>} />
            
            <Route path="/prdreview/:id/:avgrating" element={<ReviewProduct/>} />

        
          </Routes>
          </Suspense>
          </div>   
           
        </div>)}
      

     
      

    {/* {!isAdminRoute && !isabout && !isref  && !mood  &&  !searchme   && <div className="mainnn-contenttttttt"> <Footer /></div>} */}
    {/* ✅ Footer ab sirf tab show hoga jab loader OFF hai */}
      {!isLoading &&
        !isAdminRoute &&
        !isabout &&
        !isref &&
        !mood &&
        !searchme && (
          <div className="mainnn-contenttttttt">
            <Footer />
          </div>
        )}
    
    </>
  );
}

