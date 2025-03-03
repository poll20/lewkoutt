import React,{useState} from 'react'
import img2 from "./image/img3.jpg";
import "./Cardforall.css"
import { NavLink } from 'react-router-dom';
// import { GoHeart } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { useBio } from './BioContext';
import HeartButton from './HeartButton';
export default function Cardforall(props) {

  let {handleClick,wishlistdata}=useBio()
  // console.log(handleClicks
if(!wishlistdata){
  return(<p>loading...</p>)
}
console.log("wishlist in coa",wishlistdata)
 return (
    <>
    
      <div className="product-card">
      {/* Image Section */}
      <div className="image-container">
      <NavLink to={`/productdescription/${props.id}`}>
        <img
          src={img2} // Replace with real image
          alt="Product"
          className="product-image"
        />
        </NavLink> 
        {/* Heart Icon */}
        <div className="heart-icon" onClick={()=>{handleClick(props.id)}} style={{height:'20px',width:"20px"}}><HeartButton cardid={props.id}/></div>
        {/* Rating */}
        <div className="rating">
          ⭐ 4.7 | 16
        </div>
      </div>

      {/* Details Section */}
      <div className="product-details" style={{maxHeight:'80px',paddingLeft:"8px"}}>
        <p className="product-title" style={{textAlign:"start"}}>{props.discription.length>30?(props.discription.slice(0,24)+`...`):(props.discription)}</p>
        <div className="product-pricing">
          <span className="current-price">₹{props.discountprice}</span>
          <span className="original-price">₹{props.price}</span>
          <span className="discount">{props.discount}</span>
          
        </div>
        {/* <div className="delivery-info" style={{fontSize:'.7rem',marginBottom:'10px'}}>⚡Fast Delivery</div> */}
      </div>
    </div> 
     
    </>
  )
}
