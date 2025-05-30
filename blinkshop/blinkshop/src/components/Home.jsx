import React from 'react'
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
export default function Home() {

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
      <Carousel images={image}/>
      
      <CardLayout />
       <CategoriesLayout/>

     {/* <HorizontalScrollContainer/>  */}
     <VibeSticker/>
     
     <CustomerLove/>
     </div>
    </>
  )
}
