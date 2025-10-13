// import React, { useState, useEffect ,useRef } from "react";
// import { Shield, Clock, RefreshCcw } from "lucide-react";
// import "./ProductDescription.css";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useBio } from "./BioContext";
// import { NavLink } from "react-router-dom";
// import HeartButton from "./HeartButton";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import Card from "./Card";
// import { useFirebaseAuth } from "./FirebaseContext";
// import { FaArrowLeft } from "react-icons/fa6";
// import StickyButton from "./StickyButton";
// import CouponCard from "./CouponCard";
// import BundleProduct from "./BundleProduct";
// import { useLoading } from "./LoadingContext";
// import SlideUpModal from "./SlideupModel";
// import OtpLogin from "./OtpLogin";

// const ProductDescription = (prop) => {
   
//  const apiUrl = import.meta.env.VITE_API_URL;
//   const [loading, setLoading] = useState(true);
// const [cartData, setCartData] = useState([]);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [qty, setqty] = useState(1);
//   const [count, setCount] = useState(1);
//   const [cartItems, setCartItems] = useState([]);  
//   const [wishlist, setWishlist] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [popupImage, setPopupImage] = useState("");
//   const [Selectedcolor,setSelectedcolor]=useState([])
//   const [colorid,setcolorid]=useState()
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//    const [isOpen, setIsOpen] = useState(false);
// const[product,setproduct]=useState([])

// const[mainProductt,setmainprodutt]=useState([])

// const imageRef = useRef();
// const targetRef = useRef(null);

//   let { id,coloring} = useParams();
//   console.log("fwff",id,coloring)
//   let navigate=useNavigate()
//   let {handleClick,productdata,handleAddToCart,takebuydata, productdataonlydetail,fetchCoupons,coupons,getbundeldata,getBundleColorData,showloginpage,setshowloginpage}=useBio()
//   let {setIsLoading}=useLoading()
//   const { user,userDetails } = useFirebaseAuth()
//   const [showModal, setShowModal] = useState(false);

//   const visibleCoupons = coupons.slice(0, 2);
//   const hasMore = coupons.length > 2;

// const fetchProductFromBackend = async (clr) => {
//   console.log("🔥 clrchange", clr);

//   try {
//     setIsLoading(true);
//     // const res = await fetch(`${apiUrl}/product/${colorid !== undefined ? colorid : id}`);
//     const res = await fetch(`${apiUrl}/product/${id}`);

//     const data = await res.json();

//     console.log("🔥 Product data from backend:", data);
//     setmainprodutt(data);

//     let mainProduct;
//     let variantProduct;

//     if (data.productdetails && data.productdetails.length > 0) {
//       mainProduct = data.productdetails[0];

//       const defaultVariant =
//         mainProduct.colors.find((e) => e.color === clr) ||
//         mainProduct.colors.find((e) => e.color === data.defaultColor) ||
//         mainProduct.colors[0];

//       console.log("samosa variant", defaultVariant);

//       setSelectedcolor(defaultVariant.color);
//       setcolorid(defaultVariant._id);

//       if (defaultVariant) {
//         setproduct({
//           ...defaultVariant,
//           price: mainProduct.price,
//           discountprice: mainProduct.discountprice,
//           shopname: data.shopname,
//           shopaddress: data.shopaddress,
//           discount: mainProduct.discount,
//           cate: mainProduct.cate,
//           material: mainProduct.material,
//           neckline: mainProduct.neckline,
//           occasion: mainProduct.occasion,
//           printtype: mainProduct.printtype,
//           ratingCount: mainProduct.ratingCount,
//           image:
//             mainProduct?.image?.length > 0
//               ? mainProduct?.image[0]
//               : mainProduct?.image,
//         });
//       }
//     } else if (data.productdetails.length === 0 && data.colors) {
//       variantProduct = {
//         ...data,
//         colors: [data.colors[0]],
//       };

//       setproduct({
//         ...variantProduct.colors[0],
//         price: variantProduct.price,
//         discountprice: variantProduct.discountprice,
//         shopname: variantProduct.shopname,
//         shopaddress: variantProduct.shopaddress,
//         discount: variantProduct.discount,
//         cate: variantProduct.cate,
//         material: variantProduct.material,
//         neckline: variantProduct.neckline,
//         occasion: variantProduct.occasion,
//         printtype: variantProduct.printtype,
//         image:
//           variantProduct?.image?.length > 0
//             ? variantProduct?.image[0]
//             : variantProduct?.image,
//       });
//     }
//   } catch (err) {
//     console.error("❌ Error fetching product:", err);
//   } finally {
//     setIsLoading(false);
//   }
// };

// // 🔥 KEY FIX: Reset all states when URL params change
// // useEffect(() => {
// //   console.log("🔥 URL Params changed, resetting component state");
  
// //   // Reset all states to initial values
// //   setproduct([]);
// //   setmainprodutt([]);
// //   setSelectedcolor([]);
// //   setcolorid(undefined);
// //   setSelectedSize("");
// //   setQuantity(1);
// //   setCurrentImageIndex(0);
// //   setIsOpen(false);
// //   setIsPopupOpen(false);
// //   setPopupImage("");
  
// //   // Fetch new product data
// //   fetchProductFromBackend(coloring);
// // }, [id, coloring]); // 🔥 This will trigger whenever URL changes

// useEffect(() => {
//   // Reset state immediat/ely
//   // setproduct(null);
//   // setmainprodutt(null);
//   // setSelectedcolor([]);
//   // setcolorid(undefined);
//   // setSelectedSize("");
//   // setQuantity(1);
//   // setCurrentImageIndex(0);
//   // setIsOpen(false);
//   // setIsPopupOpen(false);
//   // setPopupImage("");

//   // Fetch new product after reset
//   fetchProductFromBackend(coloring);
// }, [id]);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     console.log("🍿 Checking if product has category and tag (delayed):", product);
//     if (product?.cate && product?.tag) {
//       console.log("📢 Calling fetchCoupons with:", product.cate, product.tag);
//       fetchCoupons(product.cate, product.tag);
//     }
//   }, 200);

//   return () => clearTimeout(timer);
// }, [product]);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     if (product?.bundel?.length>0) {
//       console.log("📢 Calling getBundleColorData:", product.bundel);
//       getBundleColorData(product.bundel);
//     }
//   }, 1000);
//   return () => clearTimeout(timer);
// }, [product]);

//   const notify = () => toast("Plese Login For Add Items In Cart");

//   const incrementQuantity = () => setQuantity(quantity + 1);
//   const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

//  let handleclick = async (id,quantity,selectedSize) => {

//    console.log("oi3nt",id,quantity,selectedSize)

//  if (selectedSize.length==0) {
//   prop.showPopup("Please Selete a Size")
//       return;
//     }
//    try {
//     if (Array.isArray(id)) {
//       id = id[0];
//     }
  
//       handleAddToCart(id,quantity,selectedSize)
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   if (!product || product.length==0) {
//     return <p>Loading...</p>;
//   }

// // console.log("lplp",product)

//   const sizes=product?.sizes?.map((e)=>(e.size)) 

//   let handleqty=(e)=>{
// setqty(e.target.value)
// console.log("qty is",qty)
//   }
  
//   const handleImageClick = (image) => {
//     setPopupImage(image);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setPopupImage("");
//   };

// console.log("sq",selectedSize,quantity)

// let buydata=(data,siz,qtys)=>{  
// console.log("kop",data,siz,qtys)
//   if(user){
//     if(siz){
//     console.log("buydatanini",data,siz,qtys)
//     data.size=siz
//     data.qty=qtys
//     console.log("buydata",data)
//     let finalData = Array.isArray(data) ? data : [data];
//     takebuydata(finalData)
// navigate("/address/prd")
//     }
//     else{
//       prop.showPopup("Please Selete a Size")
//     }
//   }
//   else{
//     alert("please login in")
//   }
// }

// let cate=product.cate

// const handleNext = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product?.sizes[0]?.image.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product?.sizes[0].image.length - 1 : prevIndex - 1
//     );
//   };

//   const handleThumbnailClick = (index) => {
//     setCurrentImageIndex(index);
//   };

// if(getbundeldata){
//   console.log("bundle data in prdd",getbundeldata)
// }

//   return (
//     <>
          
//     <div className="container">
      
//       <div className="product-page">
        
//         {/* Image Slider Section */}
        
//         <div className="image-slider">
          
//           {product?.sizes?.[0]?.image?.map((image, index) => (
//             <div key={index} className="image-slide">
//                 <button
//           onClick={handlePrev}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 10,
//           }}
//         >
//           ◀
//         </button>
        
         
//               <img
//                 src={product?.sizes[0]?.image[currentImageIndex]}
//                 alt={product.title || "dress"}
//                 onClick={() => handleImageClick(image[0])}
//                 style={{ cursor: "pointer" }}
//                 loading="lazy"
//               />
//                <button
//           onClick={handleNext}
//           style={{
//             position: "absolute",
//             right: 0,
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 10,
//           }}
//         >
//           ▶
//         </button>
         
//             </div>
           
//           ))}
//         </div>
       
//       </div>
     
//       {/* Popup Modal */}
//       {isPopupOpen && (
//         <div className="popup" onClick={closePopup} style={{backgroundColor:"black"}}>
//           <div className="image-slider" >
//           {product?.sizes[0]?.image.map((image, index) => (
//             <div key={index} className="image-slide" style={{minHeight:"100vh"}}  >
//               <img
//                 src={image}
//                 alt={`Product ${index + 1}`}
//                 onClick={() => handleImageClick(image[0])}
//                 style={{ cursor: "pointer" }}
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//         </div>
//       )}
//     </div>
//     <FaArrowLeft size={50} onClick={()=>{navigate(-1)}} style={{position:"absolute",top:"24px",left:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}/>
//        <svg xmlns="http://www.w3.org/2000/svg"onClick={()=>{navigate("/cart")}} style={{position:"absolute",top:"24px",right:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
// </svg>
// <svg onClick={()=>{navigate('/searchme')}} style={{position:"absolute",top:"24px",right:"60px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
// </svg>

// {/* Mobile Thumbnail Strip */}
//           <div style={{ 
//             display: 'flex', 
//             gap: '0.5rem', 
//             padding: '1rem',
//             overflowX: 'auto',
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none'
//           }}>
//             {product?.sizes[0]?.image.map((img, index) => (
//               <div 
//                 key={index} 
//                 onClick={() => setCurrentImageIndex(index)}
//                 style={{
//                   minWidth: '60px',
//                   height: '80px',
//                   borderRadius: '8px',
//                   overflow: 'hidden',
//                   cursor: 'pointer',
//                   border: currentImageIndex === index ? '2px solid #667eea' : '2px solid transparent',
//                   opacity: currentImageIndex === index ? 1 : 0.7
//                 }}
//               >
//                 <img 
//                   src={img} 
//                   alt={`Product view ${index + 1}`}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover'
//                   }}
//                   loading="lazy"
//                 />
//               </div>
//             ))}
//           </div>
        

//     <div className="details-sectionnn">
//           <div style={{display:"flex"}}>
//             <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"start"}}>
//           <span className="product-description" style={{fontFamily: 'Nunito,sans-serif',fontSize:"24px",color:"black",marginTop:"5px",fontWeight:"bolder",}} >{product?.title?.slice(0,1).toUpperCase()+product?.title?.slice(1)}</span>
//           <span style={{fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}><FaIndianRupeeSign/><span  > {product.discountprice} </span> <span style={{marginLeft:"2px"}}className="original-price"><FaIndianRupeeSign/> {product.price} </span><span style={{marginLeft:"5px",color:"white",padding:"2px 5px",borderRadius:"90px",background:"rgb(241, 90, 41",fontSize:"11px"}}>{product.discount}% off</span></span>
//           <span
//       style={{
//         display: 'flex',
//         alignItems: 'stat',
//         gap: '5px',
//       marginTop:"5px",
//       color:"orange",
//       fontWeight: 'bold',
//       paddingBottom: '4px ',
//       fontSize: '18px',
//       textAlign:"center"
//      }}
//     >
//     </span>
//           </div>
//           <div className="icons" onClick={() => handleClick(product,product?._id)} style={{display:"flex",alignItems:"center",justifyContent:"center", background:"white",width:"33px",height:"33px",borderRadius:"100%",position:"absolute",right:"17px",bottom:"120px"}}>
          
// <HeartButton   cardid={product?._id} w={23} h={23} mt={6} dw={45} dh={45} dmt={-7} dml={-7} pdml={4}

// />

// </div>
//         </div>
       
          
//          <div className="webkitscroll" style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "start",overflowX:"scroll",marginTop:"8px" }}>
//       <div style={{ display: "flex", gap: "8px" }}>
//         {visibleCoupons.map(coupon => (
//           <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
//         ))}
//         {hasMore && (
//           <span 
//             style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginTop: "8px" }}
//             onClick={() => setShowModal(true)}
//           >
//             Show More
//           </span>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4 style={{marginBottom:"10px"}}>Available Coupons</h4>
//             <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//               {coupons.map(coupon => (
//                 <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
//               ))}
//             </div>
//             <button onClick={() => setShowModal(false)} style={{ marginTop: "15px" }}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>

// <div
//   className="sizes"
//   style={{
//    fontSize:"14px", fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif",display:"flex",alignItems:"start",justifyContent:"start"
//   }}
// >
//   <label>Colors: </label>
//   {mainProductt && mainProductt.productdetails?.length > 0 ? (
//     mainProductt.productdetails[0].colors?.length === 1 ? (
//       <label>
//         {mainProductt.productdetails[0].colors[0].color.toUpperCase()}
//       </label>
//     ) : (
//       mainProductt.productdetails[0].colors?.map((color) => (
//         <div
//           key={color._id}
//           style={{
//             border:
//               Selectedcolor === color.color
//                 ? "1px solid black"
//                 : "1px solid #ccc",
//             borderRadius: "100%",
//           }}
//         >
//           <button
//             style={{
//               background: color.color,
//               borderRadius: "100%",
//               width: "20px",
//               height: "20px",
//               margin: "5px",
//               border:
//                 Selectedcolor === color.color
//                   ? "2px solid black"
//                   : "1px solid #ccc",
//             }}
//             className={`colour-btn ${
//               Selectedcolor === color.color ? "clractive" : ""
//             }`}
//             onClick={() => {
//               const clr = color.color;
//               const cid = color._id;
//               setSelectedcolor(clr);
//               setcolorid(cid);
//               console.log("clrrrrr", clr);
//               fetchProductFromBackend(clr);
//             }}
//           ></button>
//         </div>
//       ))
//     )
//   ) : (
//     <p>No colors available</p>
//   )}
// </div>

//           <div   className="size-options" style={{gap:"5px",padding:'2px 0',border:"1px solid white"}}>
//             <div className="sizes" style={{display:"flex",alignItems:"center",justifyContent:"start",gap:"5px",padding:"5px",borderRadius:"10px"}}>
// <label>Size</label>
//               {sizes.map((size) => (
//                 <button
//                 style={{borderRadius:"30px",width:"50px"}}
//                   key={size}
//                   className={`size-btn ${selectedSize === size ? "active" : ""}` }
//                   onClick={() => setSelectedSize(size)}>
//                   <span>{size.toUpperCase()}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//             <div
//       style={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "25px 0",
//         backgroundColor: "#f5f5f5",
//         borderRadius: "8px",
//         fontSize: "10px",
//         fontWeight: "500",
//         fontFamily: 'Nunito,sans-serif',
//         marginTop: "14px",
//         fontWeight:"800",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           flex: 1,
//           gap:"5px",
//         }}
//       >
//         <Shield size={22} />
//         <span style={{ marginTop: "5px" }}>Secure Payments</span>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           flex: 1,
//           textAlign: "center",
//           gap:"5px",
//         }}
//       >
//         <Clock size={22} />
//         <span >
//           Genuine products
//         </span>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           flex: 1,
//           gap:"5px",
//         }}
//       >
//         <RefreshCcw size={22} />
//         <span style={{ marginTop: "5px" }}>Return Available</span>
//       </div>
//     </div>

//  <div className="prd-ka-dropdown-container" style={{marginTop:"4px"}}>
//       <div
//         className="prd-ka-dropdown-item"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>Description</span>
//         <span className="prd-ka-dropdown-arrow">›</span>
//       </div>
//       {isOpen && (
//         <div className="prd-ka-dropdown-description">
//           <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Print type</span>
//             <span className="prd-ka-dropdown-value">{product?.printtype}</span>
//           </div>
//           <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Color</span>
//             <span className="prd-ka-dropdown-value">{product?.color}</span>
//           </div>
//           <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Fabric</span>
//             <span className="prd-ka-dropdown-value">{product?.material?(product.material):("Cotton")}</span>
//           </div>

//           <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Occasion</span>
//             <span className="prd-ka-dropdown-value">{product?.occasion?(product.occasion):("Party")}</span>
//           </div>
//            <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Nackline</span>
//             <span className="prd-ka-dropdown-value">{product?.neckline?(product.neckline):("Rounded")}</span>
//           </div>
//            {/* <div className="prd-ka-dropdown-row">
//             <span className="prd-ka-dropdown-label">Style type</span>
//             <span className="prd-ka-dropdown-value">{product?.styletype?(product.styletype):("")}</span>
//           </div> */}
//         </div>
//       )}

//       <NavLink to={`/sizechart/${product.cate}`} className="prd-ka-dropdown-item navlink">
//         <span>Size Guide</span>
//         <span className="prd-ka-dropdown-arrow">›</span>
//       </NavLink>
//     </div>

//     {
//       getbundeldata && getbundeldata.length>0?( <BundleProduct
//       source="productdescription"
//   originalPrice={product.discountprice + (getbundeldata[0]?.discountprice || 300)}
//   totalPrice={getbundeldata[0]?.bundelprice}
//   products={[
//     {  userid:userDetails?._id,
//       productId:product._id,
//       title:product.title,
//       image: product.image,
//       color: product.color,
//       original: product.price,
//       price: product.discountprice,
//       sizes: product.sizes,
//       bundelprice:getbundeldata[0]?.bundelprice
//     },
//     { userid:userDetails?._id,  
//       productId:getbundeldata[0]?._id,
//       title: getbundeldata[0]?.title,
//       image: getbundeldata[0]?.sizes[0]?.image[0],
//       color: getbundeldata[0]?.color,
//       original: getbundeldata[0]?.price || 500,
//       price: getbundeldata[0]?.discountprice || 300,
//       sizes: getbundeldata[0]?.sizes,
//       bundelprice:getbundeldata[0]?.bundelprice
//     },
//   ]}
// />
// ):('')
//     }

//   <StickyButton
//   onAddToCart={() => handleclick(product, quantity, selectedSize)}
//   onBuyNow={() => buydata(product, selectedSize, quantity)}
//   targetRef={targetRef}
// />

//         </div>
    
//     <div  ref={targetRef} style={{border:"1px solid gray",display:"flex",alignItems:"center",flexDirection:"column"}}>
//      <div style={{display:"flex",width:"100%",alignItems:'center',gap:'10px'}}>  
//       <p style={{fontSize:"20px",paddingLeft:"10px"}}>Similer To</p>
//       <p style={{color:"green",marginTop:"3px"}}>{product.title}</p>
//       </div>
//     <Card  category={cate}/>
//     </div>
    
//     {showloginpage==true?(
//       <div>
//         <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
//           <OtpLogin/>
//         </SlideUpModal>
//       </div>
//     ):('')}
    
//     </>
//   );
// };

// export default ProductDescription;



import React, { useState, useEffect, useRef } from "react";
import { Shield, Clock, RefreshCcw } from "lucide-react";
import "./ProductDescription.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useBio } from "./BioContext";
import { NavLink } from "react-router-dom";
import HeartButton from "./HeartButton";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Card from "./Card";
import { useFirebaseAuth } from "./FirebaseContext";
import { FaArrowLeft } from "react-icons/fa6";
import StickyButton from "./StickyButton";
import CouponCard from "./CouponCard";
import BundleProduct from "./BundleProduct";
import { useLoading } from "./LoadingContext";
import SlideUpModal from "./SlideupModel";
import OtpLogin from "./OtpLogin";

// Example: ProductDescription.js
// import { trackEvent, setUserProperties } from "../analytics/ga4";
const ProductDescription = (prop) => {
   
 const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
const [cartData, setCartData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setqty] = useState(1);
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);  
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [Selectedcolor,setSelectedcolor]=useState([])
  const [colorid,setcolorid]=useState()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [isOpen, setIsOpen] = useState(false);
const[product,setproduct]=useState([])
const[mainProductt,setmainprodutt]=useState([])

// Touch/swipe functionality states
const [touchStartX, setTouchStartX] = useState(0);
const [touchEndX, setTouchEndX] = useState(0);
const [popupTouchStartX, setPopupTouchStartX] = useState(0);
const [popupTouchEndX, setPopupTouchEndX] = useState(0);
const [popupCurrentIndex, setPopupCurrentIndex] = useState(0);

const imageRef = useRef();
const targetRef = useRef(null);

  let { id,coloring} = useParams();
  console.log("fwff",id,coloring)
  let navigate=useNavigate()
  let {handleClick,productdata,handleAddToCart,takebuydata, productdataonlydetail,fetchCoupons,coupons,getbundeldata,getBundleColorData,showloginpage,setshowloginpage}=useBio()
  let {setIsLoading}=useLoading()
  const { user,userDetails } = useFirebaseAuth()
  const [showModal, setShowModal] = useState(false);

  const visibleCoupons = coupons.slice(0, 2);
  const hasMore = coupons.length > 2;



  
const fetchProductFromBackend = async (clr) => {
  console.log("🔥 clrchange", clr);

  try {
    setIsLoading(true);
    // const res = await fetch(`${apiUrl}/product/${colorid !== undefined ? colorid : id}`);
    const res = await fetch(`${apiUrl}/product/${id}`);

    const data = await res.json();

    console.log("🔥 Product data from backend:", data);
    setmainprodutt(data);

    let mainProduct;
    let variantProduct;

    if (data.productdetails && data.productdetails.length > 0) {
      mainProduct = data.productdetails[0];

      const defaultVariant =
        mainProduct.colors.find((e) => e.color === clr) ||
        mainProduct.colors.find((e) => e.color === data.defaultColor) ||
        mainProduct.colors[0];

      console.log("samosa variant", defaultVariant);

      setSelectedcolor(defaultVariant.color);
      setcolorid(defaultVariant._id);

      if (defaultVariant) {
        setproduct({
          ...defaultVariant,
          price: mainProduct.price,
          discountprice: mainProduct.discountprice,
          shopname: data.shopname,
          shopaddress: data.shopaddress,
          discount: mainProduct.discount,
          cate: mainProduct.cate,
          material: mainProduct.material,
          neckline: mainProduct.neckline,
          occasion: mainProduct.occasion,
          printtype: mainProduct.printtype,
          ratingCount: mainProduct.ratingCount,
          image:
            mainProduct?.image?.length > 0
              ? mainProduct?.image[0]
              : mainProduct?.image,
        });
      }
    } else if (data.productdetails.length === 0 && data.colors) {
      variantProduct = {
        ...data,
        colors: [data.colors[0]],
      };

      setproduct({
        ...variantProduct.colors[0],
        price: variantProduct.price,
        discountprice: variantProduct.discountprice,
        shopname: variantProduct.shopname,
        shopaddress: variantProduct.shopaddress,
        discount: variantProduct.discount,
        cate: variantProduct.cate,
        material: variantProduct.material,
        neckline: variantProduct.neckline,
        occasion: variantProduct.occasion,
        printtype: variantProduct.printtype,
        image:
          variantProduct?.image?.length > 0
            ? variantProduct?.image[0]
            : variantProduct?.image,
      });
    }
  } catch (err) {
    console.error("❌ Error fetching product:", err);
  } finally {
    setIsLoading(false);
  }
};

//  useEffect(() => {
//     setUserProperties({
//       user_id: userDetails?._id?._id || "guest",
//       user_type: userDetails?.role || "guest",
//       device_type: window.innerWidth <= 768 ? "mobile" : "desktop",
//     });

//     trackEvent({
//       category: "Product",
//       action: "View",
//       label: product.name,
//       value: product.price,
//     });
//   }, [product, userDetails]);


useEffect(() => {
  fetchProductFromBackend(coloring);
}, [id]);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     console.log("🍿 Checking if product has category and tag (delayed):", product);
//     if (product?.cate && product?.tag) {
//       console.log("📢 Calling fetchCoupons with:", product.cate, product.tag);
//       fetchCoupons(loading,product.cate, product.tag);
//     }
//   }, 200);

//   return () => clearTimeout(timer);
// }, [product]);

useEffect(() => {
  if (product?.cate && product?.tag) {
    // fetchCoupons ko async bana ke loading handle karein
    const fetchAndSetCoupons = async () => {
      try {
        setIsLoading(true); // optional, agar loading spinner chahiye
        await fetchCoupons(false, product.cate, product.tag); // false ya product-specific flag
      } catch (err) {
        console.error("Error fetching coupons:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetCoupons();
  }
}, [product]);

useEffect(() => {
  const timer = setTimeout(() => {
    if (product?.bundel?.length>0) {
      console.log("📢 Calling getBundleColorData:", product.bundel);
      getBundleColorData(product.bundel);
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [product]);

  const notify = () => toast("Plese Login For Add Items In Cart");

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

 let handleclick = async (id,quantity,selectedSize) => {

   console.log("oi3nt",id,quantity,selectedSize)

 if (selectedSize.length==0) {
  prop.showPopup("Please Selete a Size")
      return;
    }
   try {
    if (Array.isArray(id)) {
      id = id[0];
    }
  
      handleAddToCart(id,quantity,selectedSize)
    } catch (e) {
      console.log(e);
    }
  };

  if (!product || product.length==0) {
    return <p></p>;
  }

  const sizes=product?.sizes?.map((e)=>(e.size)) 

  let handleqty=(e)=>{
setqty(e.target.value)
console.log("qty is",qty)
  }
  
  const handleImageClick = (image, index) => {
    setPopupImage(image);
    setPopupCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupImage("");
    setPopupCurrentIndex(0);
  };

console.log("sq",selectedSize,quantity)

let buydata=(data,siz,qtys)=>{  
console.log("kop",data,siz,qtys)
  if(user){
    if(siz){
    console.log("buydatanini",data,siz,qtys)
    data.size=siz
    data.qty=qtys
    console.log("buydata",data)
    let finalData = Array.isArray(data) ? data : [data];
    takebuydata(finalData)
navigate("/address/prd")
    }
    else{
      setshowloginpage(true)
    }
  }
  else{
    alert("please login in")
  }
}

let cate=product.cate

const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.sizes[0]?.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.sizes[0].image.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Touch handlers for main image slider
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const threshold = 50;

    if (distance > threshold && currentImageIndex < product?.sizes[0]?.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }

    if (distance < -threshold && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }

    // Reset values
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Touch handlers for popup
  const handlePopupTouchStart = (e) => {
    setPopupTouchStartX(e.targetTouches[0].clientX);
  };

  const handlePopupTouchMove = (e) => {
    setPopupTouchEndX(e.targetTouches[0].clientX);
  };

  const handlePopupTouchEnd = () => {
    if (!popupTouchStartX || !popupTouchEndX) return;
    
    const distance = popupTouchStartX - popupTouchEndX;
    const threshold = 50;

    if (distance > threshold && popupCurrentIndex < product?.sizes[0]?.image.length - 1) {
      setPopupCurrentIndex(popupCurrentIndex + 1);
    }

    if (distance < -threshold && popupCurrentIndex > 0) {
      setPopupCurrentIndex(popupCurrentIndex - 1);
    }

    // Reset values
    setPopupTouchStartX(0);
    setPopupTouchEndX(0);
  };

if(getbundeldata){
  console.log("bundle data in prdd",getbundeldata)
}

  return (
    <>
          
    <div className="container">
      
      <div className="product-page">
        
        {/* Image Slider Section */}
        
        <div className="image-slider">
          
          {product?.sizes?.[0]?.image?.map((image, index) => (
            <div key={index} className="image-slide">
              <img
                src={product?.sizes[0]?.image[currentImageIndex]}
                alt={product.title || "dress"}
                onClick={() => handleImageClick(image, currentImageIndex)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: "pointer", touchAction: "pan-y" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
       
      </div>
     
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup"  style={{backgroundColor:"black"}}>
          <div className="image-slider">
            <div className="image-slide" style={{minHeight:"100vh"}}>
              <img
                src={product?.sizes[0]?.image[popupCurrentIndex]}
                alt={`Product ${popupCurrentIndex + 1}`}
                onTouchStart={handlePopupTouchStart}
                onTouchMove={handlePopupTouchMove}
                onTouchEnd={handlePopupTouchEnd}
                onClick={() =>closePopup()}
                style={{ cursor: "pointer", touchAction: "pan-y" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
    <FaArrowLeft  size={50} onClick={()=>{navigate(-1)}} style={{position:"absolute",top:"24px",left:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}/>
       <svg xmlns="http://www.w3.org/2000/svg"onClick={()=>{navigate("/cart")}} style={{position:"absolute",top:"24px",right:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
<svg onClick={()=>{navigate('/searchme')}} style={{position:"absolute",top:"24px",right:"60px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

{/* Mobile Thumbnail Strip */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            padding: '1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {product?.sizes[0]?.image.map((img, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  minWidth: '60px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid black' : '2px solid transparent',
                  opacity: currentImageIndex === index ? 1 : 0.7
                }}
              >
                <img 
                  src={img} 
                  alt={`Product view ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        

    <div className="details-sectionnn">
          <div style={{display:"flex"}}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"start"}}>
          <span className="product-description" style={{fontFamily: "Oswald",fontSize:"24px",color:"black",marginTop:"5px",}} >{product?.title?.slice(0,1).toUpperCase()+product?.title?.slice(1)}</span>
          <span style={{fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{marginLeft:"2px"}}className="original-price"><FaIndianRupeeSign/> {product.price} </span><span  > <FaIndianRupeeSign/>{product.discountprice} </span> <span style={{marginLeft:"5px",color:"white",padding:"2px 5px",borderRadius:"90px",background:"rgb(90, 186, 89,1)",fontSize:"11px",color:"white",fontWeight:"bold"}}>{product.discount}% off</span></span>
          <span
      style={{
        display: 'flex',
        alignItems: 'stat',
        gap: '5px',
      marginTop:"5px",
      color:"orange",
      fontWeight: 'bold',
      paddingBottom: '4px ',
      fontSize: '18px',
      textAlign:"center"
     }}
    >
    </span>
          </div>
          <div className="icons" onClick={() => handleClick(product,product?._id)} style={{display:"flex",alignItems:"center",justifyContent:"center", background:"white",width:"33px",height:"33px",borderRadius:"100%",position:"absolute",right:"17px",bottom:"120px"}}>
          
<HeartButton   cardid={product?._id} w={23} h={23} mt={6} dw={45} dh={45} dmt={-7} dml={-7} pdml={4}

/>

</div>
        </div>
       
          
         <div className="webkitscroll" style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "start",overflowX:"scroll",marginTop:"8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        {visibleCoupons?.map(coupon => (
          <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
        ))}
        {hasMore && (
          <span 
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginTop: "8px" }}
            onClick={() => setShowModal(true)}
          >
            Show More
          </span>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 style={{marginBottom:"10px"}}>Available Coupons</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {coupons.map(coupon => (
                <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
              ))}
            </div>
            <button onClick={() => setShowModal(false)} style={{ marginTop: "15px" }}>Close</button>
          </div>
        </div>
      )}
    </div>

<div
  className="sizes"
  style={{
   fontSize:"14px", fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif",display:"flex",alignItems:"start",justifyContent:"start"
  }}
>
  <label>Colors: </label>
  {mainProductt && mainProductt.productdetails?.length > 0 ? (
    mainProductt.productdetails[0].colors?.length === 1 ? (
      <label>
        {mainProductt.productdetails[0].colors[0].color.toUpperCase()}
      </label>
    ) : (
      mainProductt.productdetails[0].colors?.map((color) => (
        <div
          key={color._id}
          style={{
            border:
              Selectedcolor === color.color
                ? "1px solid black"
                : "1px solid #ccc",
            borderRadius: "100%",
          }}
        >
          <button
            style={{
              background: color.color,
              borderRadius: "100%",
              width: "20px",
              height: "20px",
              margin: "5px",
              border:
                Selectedcolor === color.color
                  ? "2px solid black"
                  : "1px solid #ccc",
            }}
            className={`colour-btn ${
              Selectedcolor === color.color ? "clractive" : ""
            }`}
            onClick={() => {
              const clr = color.color;
              const cid = color._id;
              setSelectedcolor(clr);
              setcolorid(cid);
              console.log("clrrrrr", clr);
              fetchProductFromBackend(clr);
            }}
          ></button>
        </div>
      ))
    )
  ) : (
    <p>No colors available</p>
  )}
</div>

          <div   className="size-options" style={{gap:"5px",padding:'2px 0',border:"1px solid white",}}>
            <div className="sizes" style={{display:"flex",alignItems:"center",justifyContent:"start",gap:"5px",paddingTop:"5px",borderRadius:"10px"}}>
<label>Size:</label>
              {sizes.map((size) => (
                <button
                style={{borderRadius:"30px",width:"50px"}}
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}` }
                  onClick={() => setSelectedSize(size)}>
                  <span>{size.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

            <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 0",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        fontSize: "10px",
        fontWeight: "500",
        fontFamily: 'Nunito,sans-serif',
        marginTop: "14px",
        fontWeight:"800",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          gap:"5px",
        }}
      >
        <Shield size={22} />
        <span style={{ marginTop: "5px" }}>Secure Payments</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          textAlign: "center",
          gap:"5px",
        }}
      >
        <Clock size={22} />
        <span >
          Genuine products
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          gap:"5px",
        }}
      >
        <RefreshCcw size={22} />
        <span style={{ marginTop: "5px" }}>Return Available</span>
      </div>
    </div>

 <div className="prd-ka-dropdown-container" style={{marginTop:"4px"}}>
      <div
        className="prd-ka-dropdown-item"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Description</span>
        <span className="prd-ka-dropdown-arrow">›</span>
      </div>
      {isOpen && (
        <div className="prd-ka-dropdown-description">
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Print type</span>
            <span className="prd-ka-dropdown-value">{product?.printtype}</span>
          </div>
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Color</span>
            <span className="prd-ka-dropdown-value">{product?.color}</span>
          </div>
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Fabric</span>
            <span className="prd-ka-dropdown-value">{product?.material?(product.material):("Cotton")}</span>
          </div>

          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Occasion</span>
            <span className="prd-ka-dropdown-value">{product?.occasion?(product.occasion):("Party")}</span>
          </div>
           <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Neckline</span>
            <span className="prd-ka-dropdown-value">{product?.neckline?(product.neckline):("Rounded")}</span>
          </div>
           {/* <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Style type</span>
            <span className="prd-ka-dropdown-value">{product?.styletype?(product.styletype):("")}</span>
          </div> */}
        </div>
      )}

      <NavLink to={`/sizechart/${product.cate}`} className="prd-ka-dropdown-item navlink">
        <span>Size Guide</span>
        <span className="prd-ka-dropdown-arrow">›</span>
      </NavLink>
    </div>

    {
      getbundeldata && getbundeldata.length>0?( <BundleProduct
      source="productdescription"
  originalPrice={product.discountprice + (getbundeldata[0]?.discountprice || 300)}
  totalPrice={getbundeldata[0]?.bundelprice}
  products={[
    {  userid:userDetails?._id,
      productId:product._id,
      title:product.title,
      image: product.image,
      color: product.color,
      original: product.price,
      price: product.discountprice,
      sizes: product.sizes,
      bundelprice:getbundeldata[0]?.bundelprice
    },
    { userid:userDetails?._id,  
      productId:getbundeldata[0]?._id,
      title: getbundeldata[0]?.title,
      image: getbundeldata[0]?.sizes[0]?.image[0],
      color: getbundeldata[0]?.color,
      original: getbundeldata[0]?.price || 500,
      price: getbundeldata[0]?.discountprice || 300,
      sizes: getbundeldata[0]?.sizes,
      bundelprice:getbundeldata[0]?.bundelprice
    },
  ]}
/>
):('')
    }

  <StickyButton
  onAddToCart={() => handleclick(product, quantity, selectedSize)}
  onBuyNow={() => buydata(product, selectedSize, quantity)}
  targetRef={targetRef}
/>

        </div>
    
    <div  ref={targetRef} style={{border:"1px solid gray",display:"flex",alignItems:"center",flexDirection:"column"}}>
     <div style={{display:"flex",width:"90%",alignItems:'center',flexDirection:"column",alignItems:"start",marginTop:"7px"}}>  
      <span style={{fontSize:"15px",fontFamily: 'Nunito,sans-serif',fontWeight:"bold"}}>Similar To</span>
      <span style={{ fontFamily: "Oswald",color: '#888',fontSize:"0.9rem"}}>{product.title}</span>
      </div>
      <div>
    <Card  category={cate}/>
    </div>
    </div>
    
    {showloginpage==true?(
      <div>
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin/>
        </SlideUpModal>
      </div>
    ):('')}
    
    </>
  );
};

export default ProductDescription;