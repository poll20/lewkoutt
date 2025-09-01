import React, { useState } from 'react';

import Carousel from './Carasoul'
import "./Home.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./image/newme.jpg"
import img2 from "./image/newme2.jpg"
import img3 from "./image/newme3.jpg"
import img4 from "./image/newme4.jpg"
import Card from './Card'
import CardLayout from './Containercard'
import HorizontalScrollContainer from './HorizontalScrollContainer'
import CustomerLove from './CustomerLove'
import CategoriesLayout from './CategoriesLayout';
import VibeSticker from './VibeSticker';
import GlobalLoader from './GlobalLoader';
import OfferBanner from './OfferBanner';
import { useBio } from './BioContext';
import OtpLogin from './OtpLogin';
import SlideUpModal from './SlideupModel';


export default function Home() {

  const {productdata,showloginpage,setshowloginpage}=useBio()
    const [showModal, setShowModal] = useState(false);
    if(!productdata){
      return <p>loading....</p>
    }
    console.log("showloginpage",showloginpage)
    let image=[
        { image:img1, category: "top" },
        { image:img2, category: "bottom" },
        { image:img3, category: "top" },
        { image:img4, category: "bottom" },
        
      ] 
      
  return (
    <>
    <div className='home'>
      
       <OfferBanner/>
      <Carousel images={productdata}/>
      
      {/* <CardLayout /> */}
       <CategoriesLayout/>

     {/* <HorizontalScrollContainer/>  */}
     {/* <VibeSticker/> */}
     
     <CustomerLove/>
     {showloginpage==true?(
  <div>
    {/* <button onClick={() => setShowModal(true)}>Open SlideUp</button> */}

    <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
      <OtpLogin/>
    </SlideUpModal>
  </div>
):('')}

     </div>
    </>
  )
}
