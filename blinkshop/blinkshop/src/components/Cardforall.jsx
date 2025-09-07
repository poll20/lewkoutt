import React,{useState} from 'react'
import "./Cardforall.css"
import { NavLink } from 'react-router-dom';
// import { GoHeart } from "react-icons/go";
// import { GoHeart } from "react-icons/go";
import { useBio } from './BioContext';
import HeartButton from './HeartButton';
// import Toast from './Toast';

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
    
      <div className="product-card" style={{boxShadow:"0 2px 8px rgba(0, 0, 0, 0.1)"}}>
      {/* Image Section */}
      <div className="image-container">
        
      <NavLink to={props.section!='bundel'?(`/productdescription/${props?.id?._id || props?.id}/${props?.defaultcolor}`):(`/productdescription/${props?.id}/${props?.defaultcolor}`)}>
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
        <span className="product-title" style={{textAlign:"start",fontFamily: "'Oswald', sans-serif",fontWeight:"400",fontSize:"15px"}}>{props.discription?.length>15?(props.discription?.slice(0,24)+`...`):(props.discription)}</span>
        <div className="product-pricing">
          <span className="current-price" style={{ fontFamily: "'Oswald', sans-serif" }}>₹{props.discountprice}</span>
          <span className="original-price"style={{ fontFamily: "'Oswald', sans-serif" }}>₹{props.price}</span>
          <span className="discount" style={{ fontFamily: "'Oswald', sans-serif" }}>{props.discount}% off</span>
          
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



// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useBio } from './BioContext';
// import HeartButton from './HeartButton';

// export default function Cardforall(props) {
//   const [showToast, setShowToast] = useState(false);
//   const { handleClick, wishlistdata } = useBio();

//   if (!wishlistdata) {
//     return (
//       <div style={{
//         padding: '20px',
//         textAlign: 'center',
//         color: '#666',
//         fontFamily: "'Inter', sans-serif"
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   const cardStyle = {
//     backgroundColor: 'white',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//     transition: 'all 0.3s ease-in-out',
//     cursor: 'pointer',
//     position: 'relative',
//     width: '100%',
//     maxWidth: '160px'
//   };

//   const imageContainerStyle = {
//     position: 'relative',
//     width: '100%',
//     height: '180px',
//     overflow: 'hidden'
//   };

//   const productImageStyle = {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 0.3s ease-in-out'
//   };

//   const heartIconStyle = {
//     position: 'absolute',
//     top: '8px',
//     right: '8px',
//     width: '32px',
//     height: '32px',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease-in-out',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
//   };

//   const ratingStyle = {
//     position: 'absolute',
//     bottom: '8px',
//     left: '8px',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     color: 'white',
//     padding: '4px 8px',
//     borderRadius: '8px',
//     fontSize: '12px',
//     fontWeight: '500'
//   };

//   const detailsStyle = {
//     padding: '12px',
//     backgroundColor: 'white'
//   };

//   const titleStyle = {
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: '8px',
//     fontFamily: "'Inter', sans-serif",
//     lineHeight: '1.3',
//     display: '-webkit-box',
//     WebkitLineClamp: 2,
//     WebkitBoxOrient: 'vertical',
//     overflow: 'hidden'
//   };

//   const pricingContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//     marginBottom: '6px'
//   };

//   const currentPriceStyle = {
//     fontSize: '16px',
//     fontWeight: '700',
//     color: '#FF6B9D',
//     fontFamily: "'Inter', sans-serif"
//   };

//   const originalPriceStyle = {
//     fontSize: '12px',
//     color: '#999',
//     textDecoration: 'line-through',
//     fontFamily: "'Inter', sans-serif"
//   };

//   const discountStyle = {
//     fontSize: '11px',
//     color: '#22C55E',
//     fontWeight: '600',
//     backgroundColor: '#DCFCE7',
//     padding: '2px 6px',
//     borderRadius: '4px',
//     fontFamily: "'Inter', sans-serif"
//   };

//   const deliveryInfoStyle = {
//     fontSize: '11px',
//     color: '#FF6B9D',
//     fontWeight: '500',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px'
//   };

//   return (
//     <div 
//       style={cardStyle}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-8px)';
//         e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 107, 157, 0.15)';
//         const img = e.currentTarget.querySelector('img');
//         if (img) img.style.transform = 'scale(1.1)';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
//         const img = e.currentTarget.querySelector('img');
//         if (img) img.style.transform = 'scale(1)';
//       }}
//     >
//       {/* Image Section */}
//       <div style={imageContainerStyle}>
//         <NavLink 
//           to={
//             props.section !== 'bundel' 
//               ? `/productdescription/${props?.id?._id || props?.id}/${props?.defaultcolor}`
//               : `/productdescription/${props?.id}/${props?.defaultcolor}`
//           }
//         >
//           <img
//             src={
//               props.section !== "bundel"
//                 ? (props?.id?.image?.[0] || props?.image || "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg")
//                 : (props.image || "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg")
//             }
//             alt={props.discription || "Product"}
//             style={productImageStyle}
//           />
//         </NavLink>
        
//         {/* Heart Icon */}
//         <div 
//           style={heartIconStyle}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleClick(props.id, props.id.colors?.[0]?._id);
//             setShowToast(true);
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'scale(1.1)';
//             e.currentTarget.style.backgroundColor = '#FF6B9D';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
//           }}
//         >
//           <HeartButton 
//             cardid={props.id.colors?.[0]?._id} 
//             w={15} 
//             h={15} 
//             dw={20} 
//             dh={20} 
//             dmt={0} 
//             dml={0}
//           />
//         </div>

//         {/* Rating */}
//         {props.section !== "bundel" &&
//           props?.id?.colors?.[0]?.ratingCount > 0 && (
//             <div style={ratingStyle}>
//               ⭐ {props.id.colors[0].avgRating} ({props.id.colors[0].ratingCount})
//             </div>
//         )}
//       </div>

//       {/* Details Section */}
//       <div style={detailsStyle}>
//         <div style={titleStyle}>
//           {props.discription?.length > 25 
//             ? props.discription?.slice(0, 25) + '...' 
//             : props.discription}
//         </div>
        
//         <div style={pricingContainerStyle}>
//           <span style={currentPriceStyle}>₹{props.discountprice}</span>
//           <span style={originalPriceStyle}>₹{props.price}</span>
//           <span style={discountStyle}>{props.discount}% off</span>
//         </div>
        
//         <div style={deliveryInfoStyle}>
//           <span>⚡</span>
//           <span>Fast Delivery</span>
//         </div>
//       </div>
//     </div>
//   );
// }