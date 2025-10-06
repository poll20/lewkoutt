import React,{useState} from 'react'
import "./Cardforall.css"
import { NavLink } from 'react-router-dom';

import { useBio } from './BioContext';
import HeartButton from './HeartButton';
import { slugify } from './Slugify';
// import Toast from './Toast';

export default function Cardforall(props) {

  const [showToast, setShowToast] = useState(false);
  let {handleClick,wishlistdata}=useBio()
  console.log("propd",props)
  // console.log(handleClicks
if(!wishlistdata){
  return(<p>loading...</p>)
  // Utils file ya component ke andar ek slugify fn bna lo

}


console.log("wishlist in coa",wishlistdata)
 return (
    <>
    
      <div className="product-card" style={{boxShadow:"0 2px 8px rgba(0, 0, 0, 0.1)"}}>
      {/* Image Section */}
      <div className="image-container">
        
      <NavLink to={props.section !== "bundel"
  ? `/productdescription/${slugify(props?.discription)}/${props?.id?._id || props?.id}/${props?.defaultcolor}`
  : `/productdescription/${slugify(props?.discription)}/${props?.id}/${props?.defaultcolor}`}>
        <img
        style={{height:"300px"}}
  src={
    props.section != "bundel"
      ?( props?.id?.image?.[0] || props?.image || "fallback.jpg")
      : (props.image || "fallback.jpg")
  }
  alt={props.discription || "Product"}
  className="product-image"
  loading="lazy" // Lazy loading for better performance
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
        {/* {props.section != "bundel" &&
  props?.id?.colors?.[0]?.ratingCount > 0 && (
    <div className="rating" style={{ display: "flex" }}>
      {`⭐ ${props.id.colors[0].avgRating} | ${props.id.colors[0].ratingCount}`}
    </div>
)} */}

      </div>

      {/* Details Section */}
      <div className="product-details" style={{maxHeight:'80px',paddingLeft:"8px",backgroundColor:"white"}}>
        <span className="product-title" style={{textAlign:"start",fontFamily: "Oswald",fontWeight:"700",fontSize:"15px"}}>{props.discription?.length>15?(props.discription?.slice(0,18)+`...`):(props.discription)}</span>
        <div className="product-pricing">
          <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{props.discountprice}</span>
          <span className="original-price"style={{ fontFamily: "Oswald" }}>₹{props.price}</span>
          <span className="discount" style={{ fontFamily: "Oswald" }}>{props.discount}% off</span>
          
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



