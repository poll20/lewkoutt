import React, { useState, Suspense,useEffect } from "react";
import "./Home.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useBio } from "./BioContext";
import Carousel from "./Carasoul"
import CategoriesLayout from "./CategoriesLayout"
import OfferBanner from "./OfferBanner"
import OtpLogin from "./OtpLogin";
import SlideUpModal from "./SlideupModel";
import lben from "../components/image/lewkbner.webp"

export default function Home() {
  const { productdata, showloginpage, setshowloginpage,productfetch } = useBio();
  const [showModal, setShowModal] = useState(false);

  // if (!productdata) {
  //   return <p>Loading...</p>;
  // }
 useEffect(()=>{
  productfetch("home")
 },[productfetch])
  return (
    <div className="home">
      {/* <Suspense fallback={<p>Loading Home Content...</p>}> */}
        <OfferBanner />
        <Carousel images={productdata} />
        {/* <img src={lben} style={{width:"100%",height:"100px",marginTop:"10px"}}></img> */}
        <img
  src={lben}
  alt="lewkout banner"
  fetchpriority="high"
  style={{
    width: "100%",
    height: "auto",
    marginTop: "10px",
    display: "block",
  }}
  width="600"
  height="180"
/>


        <CategoriesLayout />
        {/* <CustomerLove /> */}

        {showloginpage && (
          <SlideUpModal
            show={showloginpage}
            onClose={() => setshowloginpage(false)}
          >
            <OtpLogin />
          </SlideUpModal>
        )}
      {/* </Suspense> */}
    </div>
  );
}
