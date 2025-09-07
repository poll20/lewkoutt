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
// const Home = React.lazy(() => import("./components/Home"));
import Card from "./components/Card";
// const Card = React.lazy(() => import("./components/Card"));
import ProductDescription from "./components/ProductDescription";
// const ProductDescription = React.lazy(() => import("./components/ProductDescription"));
import AddToCart from "./components/AddToCart";
// const AddToCart = React.lazy(() => import("./components/AddToCart"));
// import Signup from "./components/Signup";
import Login from "./components/Login";
// const Login = React.lazy(() => import("./components/Login"));
// import Wishlist from "./components/Wishlist";
import UserProfile from "./components/UserProfile";
// const UserProfile = React.lazy(() => import("./components/UserProfile"));
import Checkout from "./components/CheckOut";
// const Checkout = React.lazy(() => import("./components/CheckOut"));
import AddressList from "./components/AddressList";
// const AddressList = React.lazy(() => import("./components/AddressList"));
import SearchComponent from "./components/SearchComponent";
// const SearchComponent = React.lazy(() => import("./components/SearchComponent"));
import UserOrder from "./components/UserOrder";
// const UserOrder = React.lazy(() => import("./components/UserOrder"));
// import Refferal from "./components/Refferal";
import SizeChart from "./components/SizeChart";
// const SizeChart = React.lazy(() => import("./components/SizeChart"));
import Filter from "./components/Filter";
// const Filter = React.lazy(() => import("./components/Filter"));
import BottomUpSlidingList from "./components/BottomUpSlidingList";
// const BottomUpSlidingList = React.lazy(() => import("./components/BottomUpSlidingList"));

// ✅ Admin Dashboard Components
// import DashBoard from "./components/dashboardforadmin/DashBoard";
import DashNavbar from "./components/dashboardforadmin/DashNavbar";
import DahBoard from "./components/dashboardforadmin/DahBoard";
import AvailableProduct from "./components/dashboardforadmin/AvailableProduct";
// const AvailableProduct = React.lazy(() => import("./components/dashboardforadmin/AvailableProduct"));
import DashCategory from "./components/dashboardforadmin/DashCategory";
// const DashCategory = React.lazy(() => import("./components/dashboardforadmin/DashCategory"));
import LowStock from "./components/dashboardforadmin/LowStock";
import OutOfStock from "./components/dashboardforadmin/OutOfStock";
import AddData from "./components/dashboardforadmin/AddData";

// const LowStock = React.lazy(() => import("./components/dashboardforadmin/LowStock"));
// const OutOfStock = React.lazy(() => import("./components/dashboardforadmin/OutOfStock"));
// const AddData = React.lazy(() => import("./components/dashboardforadmin/AddData"));


import { DashboardProvider } from "./components/dashboardforadmin/DashboardContext";

// const RegisterUser = React.lazy(() => import("./components/dashboardforadmin/RegisterUser"));
// const NewArrival = React.lazy(() => import("./components/dashboardforadmin/NewArrival"));
// const Wallet = React.lazy(() => import("./components/Wallet"));
// const Ordersofusers = React.lazy(() => import("./components/dashboardforadmin/Ordersofusers"));
import RegisterUser from "./components/dashboardforadmin/RegisterUser";
import NewArrival from "./components/dashboardforadmin/NewArrival";
import GlobalAlert from "./components/dashboardforadmin/GlobalAlert";
import Wallet from "./components/Wallet";
import Ordersofusers from "./components/dashboardforadmin/Ordersofusers";
// import ShopkeeperDashboard from "./components/ShopKeeperDashboard";
import ReturnRequest from "./components/ReturnRequest";
import ReturnDataTable from "./components/dashboardforadmin/ReturnDataTable";
import Faq from "./components/Faq";
import AboutUs from "./components/AboutUs";
// // import MyLogin from "./components/MyLogin";
import OTPLogin from "./components/OtpLogin";
import MapWithAutocompelete from "./components/MapWithAutoCompelete";
// ✅ Lazy load (7 components)
// const ReturnRequest = React.lazy(() => import("./components/ReturnRequest"));
// const ReturnDataTable = React.lazy(() => import("./components/dashboardforadmin/ReturnDataTable"));
// const Faq = React.lazy(() => import("./components/Faq"));
// const AboutUs = React.lazy(() => import("./components/AboutUs"));
// const OTPLogin = React.lazy(() => import("./components/OtpLogin"));
// const MapWithAutocompelete = React.lazy(() => import("./components/MapWithAutoCompelete"));




// import Toast from "./components/Toast";
import PopUpNotificationss from "./components/PopUpNotificationss";

import GlobalLoader from "./components/GlobalLoader";
import { FirebaseAuthProvider } from "./components/FirebaseContext";
import TermsAndConditions from "./components/TermsAndConditions";
import Moodcom from "./components/Moodcom";
import MoodMsgType from "./components/dashboardforadmin/MoodMsgType";
import MoodMagManager from "./components/dashboardforadmin/MoodMsgManager";
import UserActivity from "./components/dashboardforadmin/UserActivity";


// const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions"));
// const Moodcom = React.lazy(() => import("./components/Moodcom"));
// const MoodMsgType = React.lazy(() => import("./components/dashboardforadmin/MoodMsgType"));
// const MoodMagManager = React.lazy(() => import("./components/dashboardforadmin/MoodMsgManager"));
// const UserActivity = React.lazy(() => import("./components/dashboardforadmin/UserActivity"));


// import OfferBanner from "./components/OfferBanner";
// import Coupon from "./components/dashboardforadmin/CouponForm";
import CouponForm from "./components/dashboardforadmin/CouponForm";
import ReviewProduct from "./components/ReviewProduct";
import SlotControl from "./components/dashboardforadmin/SlotControl";
import Bandle from "./components/dashboardforadmin/Bandle";
// ✅ Lazy loaded selected components
// const CouponForm = React.lazy(() => import("./components/dashboardforadmin/CouponForm"));
// const ReviewProduct = React.lazy(() => import("./components/ReviewProduct"));
// const SlotControl = React.lazy(() => import("./components/dashboardforadmin/SlotControl"));
// const Bandle = React.lazy(() => import("./components/dashboardforadmin/Bandle"));


// import OtpLogin from "./components/OtpLogin";
import OrderConfirmation from "./components/OrderConfimation";
// import ComingSoon from "./components/ComingSoon";
import { OrderAlertProvider } from "./components/dashboardforadmin/OrderAlertProvider";
import PrivacyPolicy from "./components/PrivicyPolicy";
// import CitySelection from "./components/CitySelection";
// const PrivacyPolicy = React.lazy(() => import("./components/PrivicyPolicy"));

export default function App() {
  // const [cartData, setCartData] = useState([]);
  // const [cartItem, setCartItem] = useState([]);
    // const hostname = window.location.hostname;

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


  const showPopup = (msg) => {
    console.log("msg agya na showpopup sehehehe",msg)
    setPopupMessage(msg);
  };

  //    if (hostname !== "localhost" && hostname !== "lewkout.netlify.app") {
  //   // deployed site ke liye
  //   return <ComingSoon/>;
  // }


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
            <Route path="/productdescription/:id/:coloring" element={<ProductDescription showPopup={showPopup}/>} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/searchme" element={<SearchComponent />} />
            {/* <Route path="/createaccount" element={<Signup />} /> */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/rentcompo" element={<BottomUpSlidingList />} />
            <Route path="/userorder" element={<UserOrder />} />
            <Route path="/address/:sec" element={<AddressList />} />
            {/* <Route path="/refferal" element={<Refferal />} /> */}
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
            {/* <Route path="/shopkeeper" element={<ShopkeeperDashboard />} /> */}
            <Route path="/return/:id" element={<ReturnRequest/>} />
            <Route path="/loginn" element={<OTPLogin/>} />
            <Route path="/mood" element={<Moodcom/>} />
            {/* <Route path="/cityselection" element={<CitySelection/>} /> */}


            <Route path="/maps" element={<MapWithAutocompelete/>} />
            <Route path="/privicy" element={<PrivacyPolicy email="" phone=""/>}/> 
           

              <Route path="/orderconfirm" element={<OrderConfirmation/>} />
            
            <Route path="/prdreview/:id/:avgrating" element={<ReviewProduct/>} />

            

            {/* { toastmsg.length>0?(<Toast message={toastmsg}  />):('')
        
      }
   */}
          
  
          </Routes>
          </Suspense>
          </div>   
           
        </div>)}
      

     
      

      {!isAdminRoute && !isabout && !isref  && !mood  &&  !searchme && <div className="mainnn-contenttttttt"> <Footer /></div>}
    
    
    </>
  );
}

