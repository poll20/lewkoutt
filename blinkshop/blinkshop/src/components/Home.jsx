import React, { useState, useEffect } from "react";
import "./Home.css";
import { useBio } from "./BioContext";
import Carousel from "./Carasoul";
import CategoriesLayout from "./CategoriesLayout";
import OfferBanner from "./OfferBanner";
import OtpLogin from "./OtpLogin";
import SlideUpModal from "./SlideupModel";
import QuickCategories from "./QuickCategories";

// import PromoStrip from "./Promostrip";

import TrustStrip from "./TrustStrip";
import PromoStrip from "./Promostrip";
import CustomerReviewCard from "./Customerreviewcard";
// import BottomNav from "./BottomNav";

export default function Home() {
  const { productdata, showloginpage, setshowloginpage, productfetch, fetchCarousel } = useBio();
  const [carousel, setCarousel] = useState([]);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const loadCarousel = async () => {
  //     try {
  //       const data = await fetchCarousel();
  //       setCarousel(data);
  //     } catch (error) {
  //       console.error("Carousel load failed:", error);
  //     }
  //   };
  //   loadCarousel();
  // }, [fetchCarousel]);

  return (
    <div className="home">
      <OfferBanner />

      {/* <Carousel images={carousel} /> */}
      <Carousel />

      {/* <QuickCategories images={carousel}/> */}
      <QuickCategories/>

      {/* <PromoStrip /> */}
      <CategoriesLayout page={page} setPage={setPage} />
      <TrustStrip />

      {showloginpage && (
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin />
        </SlideUpModal>
      )}

      {/* <BottomNav /> */}
      <CustomerReviewCard/>
    </div>
  );
}