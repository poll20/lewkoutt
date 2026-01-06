import React, { useState, Suspense,useEffect } from "react";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
      <Suspense fallback={<p>Loading Home Content...</p>}>
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
      </Suspense>
    </div>
  );
}

// import React, { useState, useEffect, Suspense } from "react";
// import "./Home.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useBio } from "./BioContext";

// import Carousel from "./Carasoul";
// import CategoriesLayout from "./CategoriesLayout";
// import OfferBanner from "./OfferBanner";
// import OtpLogin from "./OtpLogin";
// import SlideUpModal from "./SlideupModel";
// import lben from "../components/image/lewkbner.webp";

// const apiUrl = import.meta.env.VITE_API_URL;

// export default function Home() {
//   const { showloginpage, setshowloginpage } = useBio();

//   const [homeData, setHomeData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ HOME API CALL (BioContext se bahar)
//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/productmodel?operation=home`);
//         const data = await res.json();
//         setHomeData(data);
//       } catch (err) {
//         console.error("❌ Home API error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

//   if (loading) return <p>Loading home...</p>;

//   return (
//     <div className="home">
//       <Suspense fallback={<p>Loading Home Content...</p>}>
//         <OfferBanner />

//         {/* ✅ Carousel ko sirf homeData */}
//         <Carousel images={homeData} />

//         <img
//           src={lben}
//           alt="lewkout banner"
//           fetchpriority="high"
//           width="600"
//           height="180"
//           style={{
//             width: "100%",
//             height: "auto",
//             marginTop: "10px",
//             display: "block",
//           }}
//         />

//         {/* ✅ CategoriesLayout ko bhi wahi data */}
//         <CategoriesLayout data={homeData} />

//         {showloginpage && (
//           <SlideUpModal
//             show={showloginpage}
//             onClose={() => setshowloginpage(false)}
//           >
//             <OtpLogin />
//           </SlideUpModal>
//         )}
//       </Suspense>
//     </div>
//   );
// }
