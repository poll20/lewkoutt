import React,{useState} from 'react'
import img2 from "./image/img3.jpg";
import "./Cardforall.css"
import { NavLink } from 'react-router-dom';
// import { GoHeart } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { useBio } from './BioContext';
import HeartButton from './HeartButton';
import Toast from './Toast';

export default function Cardforall(props) {

  const [showToast, setShowToast] = useState(false);
  let {handleClick,wishlistdata}=useBio()
  console.log("propd",props)
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
        
      <NavLink to={props.section!='bundel'?(`/productdescription/${props.id._id}`):(`/productdescription/${props.id}`)}>
        <img
  src={
    props.section != "bundel"
      ?( props?.id?.image?.[0] || "fallback.jpg")
      : (props.image || "fallback.jpg")
  }
  alt="Product"
  className="product-image"
/>
        </NavLink> 
        {/* Heart Icon */}
        <div className="heart-icon"  onClick={(e)=>{ e.stopPropagation();  handleClick(props.id,props.id.colors?.[0]?._id),setShowToast(true)}} style={{height:'20px',width:"20px",}}><HeartButton cardid={props.id.colors?.[0]?._id} w={15} h={15} dw={30} dh={30} dmt={-8} dml={-8}/></div>
        {/* Rating */}
        
        {/* <div className="rating" style={{display:!props.id.colors[0].ratingCount==0?('flex'):('none')}}>
          {
          `⭐ ${props.id.colors[0].avgRating} | ${props.id.colors[0].ratingCount}`
          }
          
        </div> */}
        {props.section != "bundel" &&
  props?.id?.colors?.[0]?.ratingCount > 0 && (
    <div className="rating" style={{ display: "flex" }}>
      {`⭐ ${props.id.colors[0].avgRating} | ${props.id.colors[0].ratingCount}`}
    </div>
)}

      </div>

      {/* Details Section */}
      <div className="product-details" style={{maxHeight:'80px',paddingLeft:"8px",backgroundColor:"white"}}>
        <span className="product-title" style={{textAlign:"start",fontFamily: "'Oswald', sans-serif",fontWeight:"400",fontSize:"15px"}}>{props.discription?.length>30?(props.discription?.slice(0,24)+`...`):(props.discription)}</span>
        <div className="product-pricing">
          <span className="current-price" style={{ fontFamily: "'Oswald', sans-serif" }}>₹{props.discountprice}</span>
          <span className="original-price"style={{ fontFamily: "'Oswald', sans-serif" }}>₹{props.price}</span>
          <span className="discount" style={{ fontFamily: "'Oswald', sans-serif" }}>{props.discount}</span>
          
        </div>
        {/* <div className="delivery-info" style={{fontSize:'.7rem',marginBottom:'10px'}}>⚡Fast Delivery</div> */}
      </div>
      {/* {showToast && (
        <Toast
          message="Item added from your wishlist"
          onClose={() => setShowToast(false)}
        />
      )} */}
    </div> 
     
    </>
  )
}
