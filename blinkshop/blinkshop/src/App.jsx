// import { initGA } from "./analytics/ga4";
import { initGA, trackPageView } from "./analytics/g4a";

// import usePageTracking from "./analytics/usePageTracking";
import { LoadingProvider, useLoading } from "./components/LoadingContext";
import React, { useState, useEffect,Suspense  } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScollToTop";
import { AuthProvider } from "./components/AuthContext";
import { BioProvider, useBio } from "./components/BioContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
import Paymentmode from "./components/Paymentmode";
// import Returnexchange from "./components/ReturnExchange";

import ShippingDelivery from "./components/ShippingDelivery";
import Returnexchange from "./components/ReturnExchange";

// import Paymentmode from "./components/Paymentmode";
// import ReturnExchange from "./components/ReturnExchange";
// import ShippingDelivery from "./components/ShippingDelivery";
// import ProtectedRoutes from './components/ProtectedRoutes';


export default function App() {

  useEffect(() => {
  initGA(); // Initialize GA
}, []);
//  initGA();
//   usePageTracking();
  const [popupMessage, setPopupMessage] = useState("");
  
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const location=useLocation()
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
const {userdata}=useBio()
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isabout = location.pathname.startsWith("/aboutus");
  const address = location.pathname.startsWith("/address/");

  const isref = location.pathname.startsWith("/refferal");
  const mood = location.pathname.startsWith("/mood");
    const pd = location.pathname.startsWith("/productdescription");
        const searchme = location.pathname.startsWith("/searchme");


     
useEffect(() => {
  trackPageView(location.pathname + location.search);
}, [location]);

  
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
            
              <Route path="/admin" element={ <ProtectedRoutes>  <DahBoard /> </ProtectedRoutes>} />
              <Route path="/admin/available-products" element={<ProtectedRoutes> <AvailableProduct /> </ProtectedRoutes>} />
              <Route path="/admin/category" element={<ProtectedRoutes> <DashCategory /> </ProtectedRoutes>} />
              <Route path="/admin/lowstock" element={<ProtectedRoutes><LowStock/> </ProtectedRoutes>} />
              <Route path="/admin/outofstock" element={<ProtectedRoutes><OutOfStock/> </ProtectedRoutes>} />
              <Route path="/admin/adddata" element={<ProtectedRoutes> <AddData/> </ProtectedRoutes>} />
              <Route path="/admin/registeruser" element={<ProtectedRoutes><RegisterUser/></ProtectedRoutes>} />
              <Route path="/admin/newarrival" element={<ProtectedRoutes><NewArrival/></ProtectedRoutes>} />
              <Route path="/admin/userorder" element={<ProtectedRoutes><Ordersofusers/> </ProtectedRoutes>} />
              <Route path="/admin/returnmyorder" element={<ProtectedRoutes><ReturnDataTable/></ProtectedRoutes>} />
              <Route path="/admin/moodmsg" element={<ProtectedRoutes><MoodMsgType/></ProtectedRoutes>} />
              <Route path="/admin/moodmngr" element={<ProtectedRoutes><MoodMagManager/></ProtectedRoutes>} />
              <Route path="/admin/coupon" element={<ProtectedRoutes><CouponForm/></ProtectedRoutes>} />
              <Route path="/admin/useractivity/:id" element={<ProtectedRoutes><UserActivity/></ProtectedRoutes>} />

              <Route path="/admin/slots" element={<ProtectedRoutes><SlotControl/></ProtectedRoutes>} />
              {/* <Route path="/admin/bandle" element={<Bandle/>} /> */}
              <Route path="/admin/bandle" element={<ProtectedRoutes><Bandle/></ProtectedRoutes>} />



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
            <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
            
            <Route path="/return/:id" element={<ReturnRequest/>} />
            <Route path="/loginn" element={<OTPLogin/>} />
            <Route path="/mood" element={<Moodcom/>} />
            <Route path="/payment-mode" element={<Paymentmode/>} />
            <Route path="/return-exchange-refund" element={<Returnexchange/>} />
            <Route path="/shipping-delivery" element={<ShippingDelivery/>} />
           
            <Route path="/maps" element={<MapWithAutocompelete/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy email="" phone=""/>}/> 
           

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
        !address &&
        !searchme && (
          <div className="mainnn-contenttttttt">
            <Footer />
          </div>
        )}
    
    </>
  );
}

