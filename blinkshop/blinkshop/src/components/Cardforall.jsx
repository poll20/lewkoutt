// import React,{useState} from 'react'
// import "./Cardforall.css"
// import { NavLink } from 'react-router-dom';
// import { cloudinaryImg } from "../utils/cloudinariimg";

// import { useBio } from './BioContext';
// import HeartButton from './HeartButton';
// import { slugify } from './Slugify';
// // import Toast from './Toast';

// export default function Cardforall(props) {

//   const [showToast, setShowToast] = useState(false);
//   let {handleClick,wishlistdata,fetchCoupons,coupons,productdataonlydetail}=useBio()
//   console.log("propd",props)
//   // console.log(handleClicks
// if(!wishlistdata){
//   return(<p>loading...</p>)
//   // Utils file ya component ke andar ek slugify fn bna lo

// }



// console.log("wishlist in coa",wishlistdata)
//  return (
//     <>
    
//       <div className="product-card" style={{boxShadow:"0 2px 8px rgba(0, 0, 0, 0.1)"}}>
//       {/* Image Section */}
//       <div className="image-container">
        
//       <NavLink to={props.section !== "bundel"
//   ? `/productdescription/${slugify(props?.discription)}/${props?.id?._id || props?.id}/${props?.defaultcolor}`
//   : `/productdescription/${slugify(props?.discription)}/${props?.id}/${props?.defaultcolor}`}>
//         <img
//         style={{height:"300px"}}
//   src={
//     props.section != "bundel"
//       ?cloudinaryImg(
//           props?.id?.image?.[0] || props?.image || "fallback.jpg",
//           300
//         )
//       : cloudinaryImg(props.image || "fallback.jpg", 300)
//   }
//   alt={props.discription || "Product"}
//   className="product-image"
//   loading="lazy" // Lazy loading for better performance
// />
//         </NavLink> 
//         {/* Heart Icon */}
//         <div className="heart-icon"  onClick={(e)=>{ e.stopPropagation();  handleClick(props.id,props.id.colors?.[0]?._id),setShowToast(true)}} style={{height:'20px',width:"20px",}}><HeartButton cardid={props.id.colors?.[0]?._id} w={15} h={15} dw={30} dh={30} dmt={-8} dml={-8}/></div>
//         {/* Rating */}
        
//         {/* <div className="rating" style={{display:!props.id.colors[0].ratingCount==0?('flex'):('none')}}>
//           {
//           `⭐ ${props.id.colors[0].avgRating} | ${props.id.colors[0].ratingCount}`
//           }
          
//         </div> */}
//         {/* {props.section != "bundel" &&
//   props?.id?.colors?.[0]?.ratingCount > 0 && (
//     <div className="rating" style={{ display: "flex" }}>
//       {`⭐ ${props.id.colors[0].avgRating} | ${props.id.colors[0].ratingCount}`}
//     </div>
// )} */}

//       </div>

//       {/* Details Section */}
//       <div className="product-detailsss" style={{maxHeight:'80px',paddingLeft:"8px",backgroundColor:"white"}}>
//         <span className="product-title" style={{textAlign:"start",fontFamily: "Oswald",fontWeight:"600",fontSize:"15px"}}>{props.discription?.length>15?(props.discription?.slice(0,18)+`...`):(props.discription)}</span>
//         {
//           props.coupons.length==0?( <div className="product-pricing">
//           <span className="original-price"style={{ fontFamily: "Oswald" }}>₹{props.price}</span>

//           <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{props.discountprice}</span>
//           {/* <span className="original-price"style={{ fontFamily: "Oswald" }}>₹{props.price}</span> */}
//           <span className="discount" style={{ fontFamily: "Oswald", color: "red" }}>{props.discount}% off</span>
          
//         </div>):( <div className="product-pricing" style={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent: 'start',gap:"0px"}}>
//           <div style={{display:"flex",gap:"5px"}}>
//           <span className="original-price"style={{ fontFamily: "Oswald" }}>₹{props.price}</span>

//           <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{props.discountprice}</span>
//           {/* <span className="original-price"style={{ fontFamily: "Oswald" }}>₹{props.price}</span> */}
//           <span className="discount" style={{ fontFamily: "Oswald", color: "red" }}>{props.discount}% off</span>
//           </div>
         
// <span
//   className="current-price"
//   style={{ fontFamily: "Oswald", color: "rgb(52 195 52)" }}
// >
//   Get it For ₹
//   {props?.coupons[0]?.discountType === "fixed"
//     ? Math.floor(props?.discountprice - props?.coupons[0]?.discountValue)
//     : Math.floor(
//         props?.discountprice -
//         (props?.discountprice * props?.coupons[0]?.discountValue) / 100
//       )}
// </span>


          
//         </div>)
//         }
       
//         {/* <div className="delivery-info" style={{fontSize:'.7rem',marginBottom:'10px'}}>⚡Fast Delivery</div> */}
//       </div>
//       {/* {showToast && (
//         <Toast
//           message="Item added from your wishlist"
//           onClose={() => setShowToast(false)}
//         />
//       )} */}
//     </div> 
     
//     </>
//   )
// }



import React, { useState } from "react";
import "./Cardforall.css";
import { NavLink } from "react-router-dom";
import { cloudinaryImg } from "../utils/cloudinariimg";
import { useBio } from "./BioContext";
import HeartButton from "./HeartButton";
import { slugify } from "./Slugify";

export default function Cardforall(props) {
  const [pressed, setPressed] = useState(false);
  const { handleClick, wishlistdata, coupons } = useBio();

  if (!wishlistdata) return <p className="pcard-loading">loading...</p>;

  const { id, discription, price, discountprice, discount, defaultcolor, section, image } = props;
  const cardCoupons = props.coupons || [];

  const slug = slugify(discription);
  const productId = id?._id || id;
  const imgSrc = section !== "bundel"
    ? cloudinaryImg(id?.image?.[0] || image || "fallback.jpg", 500)
    : cloudinaryImg(image || "fallback.jpg", 500);
  const linkTo = section !== "bundel"
    ? `/productdescription/${slug}/${productId}/${defaultcolor}`
    : `/productdescription/${slug}/${id}/${defaultcolor}`;

  /* Coupon final price */
  const coupon = cardCoupons[0];
  const couponPrice = coupon
    ? coupon.discountType === "fixed"
      ? Math.floor(discountprice - coupon.discountValue)
      : Math.floor(discountprice - (discountprice * coupon.discountValue) / 100)
    : null;

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPressed(true);
    handleClick(id, id?.colors?.[0]?._id);
    setTimeout(() => setPressed(false), 300);
  };

  return (
    <div className="pcard">
      {/* ── Image area ── */}
      <div className="pcard-img-wrap">
        <NavLink to={linkTo} className="pcard-img-link">
          <img
            src={imgSrc}
            alt={discription || "Product"}
            className="pcard-img"
            loading="lazy"
            decoding="async"
          />
        </NavLink>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="pcard-badge">{discount}% off</div>
        )}

        {/* Heart */}
        <button
          className={`pcard-heart ${pressed ? "pcard-heart--pressed" : ""}`}
          onClick={handleHeartClick}
          aria-label="Add to wishlist"
        >
          <HeartButton
            cardid={id?.colors?.[0]?._id}
            w={14}
            h={14}
            dw={28}
            dh={28}
            dmt={-8}
            dml={-8}
          />
        </button>
      </div>

      {/* ── Info area ── */}
      <div className="pcard-info">
        <NavLink to={linkTo} className="pcard-name-link">
          <span className="pcard-name">
            {discription?.length > 18
              ? discription.slice(0, 18) + "…"
              : discription}
          </span>
        </NavLink>

        <div className="pcard-pricing">
          <span className="pcard-price">₹{discountprice}</span>
          <span className="pcard-og">₹{price}</span>
        </div>

        {/* {couponPrice !== null && (
          <div className="pcard-coupon">
            Get it for ₹{couponPrice}
          </div>
        )} */}
      </div>
    </div>
  );
}