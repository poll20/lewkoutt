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
export default function Home() {
    const products = [
        { id: 1, image: 'https://via.placeholder.com/150', price: '$50', description: 'Product 1' },
        { id: 2, image: 'https://via.placeholder.com/150', price: '$60', description: 'Product 2' },
        { id: 3, image: 'https://via.placeholder.com/150', price: '$70', description: 'Product 3' },
        { id: 4, image: 'https://via.placeholder.com/150', price: '$80', description: 'Product 4' },
        { id: 5, image: 'https://via.placeholder.com/150', price: '$90', description: 'Product 5' },
        { id: 6, image: 'https://via.placeholder.com/150', price: '$100', description: 'Product 6' },
      
      ];
    let image=  [
        { image:img1, category: "top" },
        { image:img2, category: "bottom" },
        { image:img3, category: "top" },
        { image:img4, category: "bottom" },
        
      ] 
  return (
    <>
    <div className='home'>
      <Carousel images={image}/>
      <CardLayout />
       <CategoriesLayout/>

     {/* <HorizontalScrollContainer/>  */}
     <CustomerLove/>
     </div>
    </>
  )
}
