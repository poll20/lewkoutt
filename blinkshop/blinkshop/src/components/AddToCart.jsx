

import React, { useState,useEffect} from 'react';
import './AddToCart.css';
import { useBio } from './BioContext';
import EmptyCart from './EmptyCart';
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import BundleProduct from './BundleProduct';
import Cardforall from './Cardforall';
import { color } from 'framer-motion';
import { slugify } from './Slugify';

const AddToCart = () => {
  const navigate = useNavigate();
  const { addtocartitem, addtocartdatas, removefromaddtocart, addtowishlistonly, takebuydata,recommendations, getRecommendationsFromCart } = useBio();
  const [choosebuy,setchoosebuy]=useState([])
  const [popup, setPopup] = useState(false);
  const [popupbreakup,setpopupbreakup]=useState(false)
  const [popupProductId, setPopupProductId] = useState(null);
  const [wowalaprd, setwowalaprd] = useState(null);
 const[totalprice,settotalprice]=useState(0)
 const[discounttotal,settotaldiscountprice]=useState(0)

  
 const [isChecked, setIsChecked] = useState(false);
 const[cprice,setcprice]=useState(0)
  
  

   useEffect(() => {
    getRecommendationsFromCart(); // Jab cart open ho ya mount ho
  }, [])

  const openPopup = (id,prd) => {
    setPopup(true);
    setPopupProductId(id); // Save the specific product ID for the popup
    setwowalaprd(prd)
  };



  const closePopup = () => {
    setPopup(false);
    setPopupProductId(null);
  };

 
  const handlechoosebuy = (order, isChecked) => {
    if (isChecked) {
      // Add item to the choosebuy list
      console.log("order kya mila",order)
      setchoosebuy((prev) => [...prev, order]);
    } else {
      // Remove item from the choosebuy list
      setchoosebuy((prev) => prev.filter((item) => item._id !== order._id));
    }
  };


useEffect(() => {
  const total = choosebuy.reduce((acc, item) => acc + ( item.price || item.bundle[0].bundletotalamount ), 0);
  const discounttotal = choosebuy.reduce((acc, item) => acc + ( item.discountprice || item.bundle[0].bundletotalamount ), 0);

  const ct=choosebuy.reduce((acc,item)=>acc +( item.price || item.bundle[0].bundletotalamount ) ,0)
  settotalprice(total);
  settotaldiscountprice(discounttotal);

  setcprice(ct);
}, [choosebuy]);

if(totalprice){
  console.log("tp",totalprice)
} 

useEffect(()=>{
  if(choosebuy){
  console.log("cb",choosebuy)
  
  
}
},[choosebuy])


let sendtocheckout = () => {
  if (choosebuy) {
    console.log("choosebyu",choosebuy)
    takebuydata(choosebuy); // Context update karo
    localStorage.setItem("buydata", JSON.stringify(choosebuy)); // ✅ Save to Local Storage
    // ✅ Delay navigation to ensure `buydata` updates before changing page
    setTimeout(() => {
      navigate("/address/atc");
    }, 1000 ); // Small delay to allow React to update state
  }
};
useEffect(() => {
  if (addtocartdatas && addtocartdatas.length > 0) {
    setchoosebuy(addtocartdatas); // Select all items by default
  }
}, [addtocartdatas]);


if(!addtocartdatas){
  return(<p>loadin....  </p>)
}

  return (
    <>
    
      <div className="header" style={{display:"flex",alignItems:"center",justifyContent:"start"}} >
        <IoIosArrowRoundBack size={30} onClick={() => navigate(-1)} />
        <span style={{ fontFamily:"Oswald", fontSize:"15px",fontWeight:"bold" }}>My Bag</span>
      </div>

      <div className="order-container-addtocart"style={{backgroundColor:'white'}}>
      {/* {addtocartdatas.length > 0 ? (
          addtocartdatas.map((order) => (
            <div className="order-card-addtocart" key={order._id}>
              

              <div className="order-detailss-addtocart">
                <div className="custom-checkbox">
                  <input type="checkbox" style={{padding:"1px"}}  checked={choosebuy.some((item) => item._id === order._id)}
                    onChange={(e) => handlechoosebuy(order, e.target.checked)} />
                </div>
                <NavLink to={`/productdescription/${order.productid}`} className='navlink'>
                <div>
                  <img src={order.image} alt={order.title} className="order-imagee-addtocart" />
                </div>
                </NavLink>
                <div>
                  <div className="order-info-addtocart">
                    <h3 className="order-title-addtocart">
                      {order?.description?.length > 19
                        ? `${order.description.slice(0, 34)}...`
                        : order.description}
                    </h3>
                    <p className="order-meta-addtocart">
                      Size: {order.size} | Qty: {order.qty} | {order.discountprice}rs.
                    </p>
                    <p className="order-delivery-addtocart">
                      <span>📦 Delivery in 60 min</span>
                    </p>
                    <p className="order-delivery-addtocart">
                      <span>
                        <AiOutlineDelete
                          size={20}
                          onClick={() => openPopup(order.productid,order)}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyCart endpoint={window.location.pathname.substring(1)} />
        )} */}
        {addtocartdatas.length > 0 ? (
  addtocartdatas.map((order) => (
//     order.bundle && order.bundle.length > 0 ? (
//       <div className="order-card-addtocart" key={order._id}>
//         <div className="order-bundle-container">
//           <div className="custom-checkbox">
//             <input
//               type="checkbox"
//               style={{ padding: "1px" }}
//               checked={choosebuy.some((item) => item._id === order._id)}
//               onChange={(e) => handlechoosebuy(order, e.target.checked)}
//             />
//           </div>
          
          
//          <BundleProduct
//   source="addtocart"
//   originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
//   totalPrice={1000}
//   products={[

//     {  userid:order.bundle[0]?.userId,
//       productId:order.bundle[0]._id,
//       title:order.bundle[0].title,
//       image: order.bundle[0].image,
//       color: order.bundle[0].color,
//       original: order.bundle[0].original,
//       price: order.bundle[0].price,
//       sizes: order.bundle[0].sizes,
//     },
//     { userid:order.bundle[0]?.userId,  
//       productId:order.bundle[1]._id,
//       title: order.bundle[1].title,
//       image: order.bundle[1].image,
//       color: order.bundle[1].color,
//       original: order.bundle[1].original || 500,
//       price: order.bundle[1].price || 300,
//       sizes: order.bundle[1].sizes
//     },
    
//   ]}


// />


//         </div>
//       </div>
//     ) 
    order.bundle && order.bundle.length > 0 ? (
  <div className="order-card-addtocart" key={order._id}>
    <div className="order-detailss-addtocart" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* ✅ Checkbox for selecting bundle */}
      <div className="custom-checkbox">
      <input
        type="checkbox"
        style={{ padding: "1px" }}
        checked={choosebuy.some((item) => item._id === order._id)}
        onChange={(e) => handlechoosebuy(order, e.target.checked)}
      />
</div>
      {/* ✅ Delete button */}
      {/* <AiOutlineDelete
        size={20}
        style={{ cursor: "pointer", color: "red" }}
        onClick={() => removefromaddtocart(order.productid)}
      /> */}
       <p className="order-delivery-addtocart">
                <span>
                  <AiOutlineDelete
                    size={20}
                    onClick={() => removefromaddtocart(order.productid)}
                  />
                </span>
              </p>
    </div>

    {/* ✅ Bundle display */}
    <div className="order-bundle-container">
      <BundleProduct
        source="addtocart"
        originalPrice={order.bundle[0].price + (order.bundle[1]?.price || 300)}
        totalPrice={order.bundle[1]?. bundletotalamount}
        products={[
          {
            userid: order.bundle[0]?.userId,
            productId: order.bundle[0].productId,
            title: order.bundle[0].title,
            image: order.bundle[0].image,
            color: order.bundle[0].color,
            original: order.bundle[0].original,
            price: order.bundle[0].price,
            sizes: order.bundle[0].sizes,
          },
          {
            userid: order.bundle[1]?.userId,
            productId: order.bundle[1]?.productId,
            title: order.bundle[1]?.title,
            image: order.bundle[1]?.image,
            color: order.bundle[1]?.color,
            original: order.bundle[1]?.original || 500,
            price: order.bundle[1]?.price || 300,
            sizes: order.bundle[1]?.sizes,
          },
        ]}
      />
    </div>
  </div>
) :  (
      <div className="order-card-addtocart" key={order._id}>
        <div className="order-detailss-addtocart">
          <div className="custom-checkbox">
            <input
              type="checkbox"
              style={{ padding: "1px" }}
              checked={choosebuy.some((item) => item._id === order._id)}
              onChange={(e) => handlechoosebuy(order, e.target.checked)}
            />
          </div>
          <NavLink to={`/productdescription/${slugify(order.title)}/${order?.productid}/${order.color}`} className="navlink">
            <div>
              <img src={order.image} alt={order.title} className="order-imagee-addtocart" loading="lazy" />
            </div>
          </NavLink>
          <div>
            <div className="order-info-addtocart">
              <h3 className="order-title-addtocart">
                {order.description?.length > 19
                  ? `${order.description.slice(0, 34)}...`
                  : order.description}
              </h3>
              <p className="order-meta-addtocart">
                Size: {order?.size} | Qty: {order?.qty} | {order?.discountprice}rs.
              </p>
              <p className="order-delivery-addtocart">
                <span>📦 Delivery in 60 min</span>
              </p>
              <p className="order-delivery-addtocart">
                <span>
                  <AiOutlineDelete
                    size={20}
                    onClick={() => openPopup(order.productid, order)}
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  ))
) : (
  <div style={{marginTop:"50px"}}>
  <EmptyCart endpoint={window.location.pathname.substring(1)} />
  </div>
)}

        <div className="bottom-sheet"  style={{
    borderTop: "1px solid gray",
    display: choosebuy.length > 0 && addtocartdatas.length > 0 ? "flex" : "none",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
          <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div>
         <span style={{fontWeight:"bold",fontSize:"20px",color:"green"}}>₹{discounttotal}</span>
         <span className="original-price">₹{cprice}</span>
         </div>
         <div style={{display:"flex",flexDirection:"col"}}>
         <span style={{fontSize:"14px"}} onClick={(()=>(setpopupbreakup(!popupbreakup)))}>View breakup</span>
         {/* <span style={{fontSize:"12px"}} onClick={(()=>(setpopupbreakup(!popupbreakup)))}>Coupon at Checkout</span> */}

          </div>
        
         {/* <span>break up</span> */}
         </div>
       
        <button className="buy-buttonss" style={{width:"140px",backgroundColor:"black",padding:"13px"}} onClick={()=>{sendtocheckout()}} >Select Address</button>
       </div>
       
       <div className="bottom-sheet" style={{ display:popupProductId?('flex'):('none'),flexDirection:"column", alignItems:"center",justifyContent:"space-between", borderRadius:'0'}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
       <span style={{fontWeight:"bold",fontSize:"17px"}}>Would you like to move this item to Wishlist?</span>
       <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-around",marginTop:"7px"}}>
        <button className="buy-buttonss" style={{width:"140px" ,background:"black",color:"white"}} onClick={() => {addtowishlistonly(popupProductId,wowalaprd);closePopup();}}>Yes</button>

         <button className="buy-buttonss" style={{width:"140px",background:"white",color:"black"}} onClick={() => {removefromaddtocart(popupProductId);closePopup();}}>Remove</button> 
         </div>
        {/* <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {addtowishlistonly(popupProductId,wowalaprd);closePopup();}}>Wishlist</button> */}
       </div>

         <div className="bottom-sheet" style={{ display:popupbreakup?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0'}}>
       <button onClick={()=>{setpopupbreakup(!popupbreakup)}} className="closed-button">✖</button>
         {/* <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {removefromaddtocart(popupProductId);closePopup();}}>Remove</button> 
        <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {addtowishlistonly(popupProductId,wowalaprd);closePopup();}}>Wishlist</button> */}
        <div style={styles.container}>
      <span>Price Breakup</span>
      <p style={styles.orderDetails}>Order Details {choosebuy?.length==1?(<span>{choosebuy?.length} Item</span>):(<span>{choosebuy?.length} Items</span>)}</p>

      <div style={styles.row}>
        <span>Total MRP</span>
        <span>{totalprice}</span>
        
      </div>
      <div style={styles.row}>
        <span>Discount on MRP</span>
        <span style={{color:"green",fontWeight:"bold"}}>-{totalprice-discounttotal}</span>
        
      </div>
        {/* <div style={styles.row}>
        <span>Coupon Discount</span>
        <span style={{color:"green",fontWeight:"bold"}}>-{totalprice-discounttotal}</span>
        
      </div> */}

      {/* <div style={styles.row}>
        <div>
          <span>Coupon Discount</span>
          <div style={styles.couponCode}>(EXTRA250)</div>
        </div>
        <span style={styles.greenText}>-₹250.0</span>
      </div> */}

      <div style={styles.row}>
        <span>Shipping Fee</span>
        {/* <div>
          <span style={styles.greenText}>Free</span>
          
          <span style={styles.strike}> ₹49.0</span>
        </div> */}
        <div>
  {discounttotal >= 799 ? (
    <>
      <span style={{ color: "green", fontWeight: "600" }}>Free</span>
      <span
        style={{
          textDecoration: "line-through",
          color: "gray",
          marginLeft: "8px",
        }}
      >
        ₹49.0
      </span>
    </>
  ) : (
    <span style={{ fontWeight: "600", color: "black" }}>₹49.0</span>
  )}
</div>

      </div>

      <hr />

      <div style={{ ...styles.row, fontWeight: 'bold' }}>
        <span>Payable amount</span>
        {/* <span>{discounttotal}</span> */}
        <span>
  {discounttotal < 799 ? `${discounttotal + 49}` : discounttotal}
</span>
        

      </div>
{/* 
      <div style={styles.successBox}>
        <span role="img" aria-label="celebrate">🎉</span> Yay! you saved ₹250.0 on final amount
      </div> */}
    </div>
       </div>

       <div>
      {/* Your cart items here */}

      {/* {recommendations?.length > 0 && (
  <div className="you-might-like" style={{ padding: "10px" }}>
    <h3 style={{ fontWeight: "normal", marginBottom: "10px" }}>You Might Also Like</h3>
    <div style={{
      display: "flex",
      overflowX: "auto",
      gap: "12px",
      paddingBottom: "10px",
      scrollbarWidth: "none",
      msOverflowStyle: "none"
    }}>
      {recommendations.map((product, index) => {
        const detail = product.productdetails?.[0];
        const images = Array.isArray(detail?.image) ? detail.image : [];
        const fallbackImage = product.image;

        return (
          <div key={index} style={{
            minWidth: "140px",
            borderRadius: "0",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            flex: "0 0 auto",
            background: "#fff"
          }}>
            <img
              src={images[0] || fallbackImage}
              alt="product"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                display: "block"
              }}
            />
           
          </div>
        );
      })}
    </div>
  </div>
)} */}
{recommendations?.length > 0 && (
  // <div className="you-might-like" style={{ padding: "10px",border:"2px solid red" }}>
  //   <h3 style={{ fontWeight: "normal", marginBottom: "10px" }}>You Might Also Like</h3>
  //   <div style={{
  //     display: "flex",
  //     overflowX: "auto",
  //     gap: "12px",
  //     paddingBottom: "10px",
  //     scrollbarWidth: "none",
  //     msOverflowStyle: "none",
  //     overflowX:"auto"
  //   }}>
  //     {recommendations.map((product, index) => (
  //       product.productdetails?.map((detail, i) =>
  //         detail.colors?.map((color, j) => (
  //           <Cardforall
  //             key={color._id || `${index}-${i}-${j}`}
  //             id={color._id}
  //             discription={color.description}
  //             image={Array.isArray(color.image) ? color.image[0] : product.image}
  //             price={detail.price}
  //             discountprice={detail.discountprice}
  //             discount={detail.discount}
  //           />
  //         ))
  //       )
  //     ))}
  //   </div>
  // </div>
//   <div className="you-might-like" style={{ padding: "10px", border: "2px solid red" }}>
//   <h3 style={{ fontWeight: "normal", marginBottom: "10px" }}>You Might Also Like</h3>
//   <div
//     style={{
//       display: "flex",
//       flexDirection:"column",
//       overflowY: "auto",
//       gap: "12px",
//       paddingBottom: "10px",
//       scrollbarWidth: "none", // Firefox
//       msOverflowStyle: "none", // IE/Edge
//     }}
//   >
//     {recommendations.map((product, index) =>
//       product.productdetails?.map((detail, i) =>
//         detail.colors?.map((color, j) => (
//           <div
//             key={color._id || `${index}-${i}-${j}`}
//             style={{
//               flex: "0 0 auto", // 🔑 stop shrinking, force fixed width
//               minWidth: "150px", // apni card width decide karo
//             }}
//           >
//             <Cardforall
//               id={color._id}
//               colorid={color.color}
//               discription={color.description}
//               image={Array.isArray(color.image) ? color.image[0] : product.image}
//               price={detail.price}
//               discountprice={detail.discountprice}
//               discount={detail.discount}
//             />
//           </div>
//         ))
//       )
//     )}
//   </div>
// </div>
<div className="you-might-like" style={{ padding: "10px"}}>
  <h3 style={{ fontWeight: "normal", marginBottom: "10px" }}>You Might Also Like</h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)", // ek row me 2 columns
      gap: "12px",
      overflowY: "auto",
      paddingBottom: "10px",
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE/Edge
    }}
  >
    {recommendations?.map((product, index) =>
      product?.productdetails?.map((detail, i) =>
        detail.colors?.map((color, j) => (
          <div
            key={color._id || `${index}-${i}-${j}`}
            style={{
              minWidth: "150px", // card ka min width
            }}
          >
            <Cardforall
              id={color._id}
              colorid={color.color}
              discription={color.description}
              image={Array.isArray(color.image) ? color.image[0] : product.image}
              price={detail.price}
              discountprice={detail.discountprice}
              discount={detail.discount}
            />
          </div>
        ))
      )
    )}
  </div>
</div>


)}





    </div>
      </div>
    </>
  );
};
const styles = {
  container: {
    width: '350px',
    height: '330px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '5px',
  },
  orderDetails: {
    marginBottom: '20px',
    color: '#555',
    fontSize: '14px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '15px',
  },
  greenText: {
    color: 'green',
    fontWeight: '500',
  },
  strike: {
    textDecoration: 'line-through',
    color: '#888',
    fontSize: '13px',
    marginLeft: '5px',
  },
  couponCode: {
    fontSize: '12px',
    color: '#888',
  },
  successBox: {
    marginTop: '20px',
    backgroundColor: '#e6f4ea',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }
};


export default AddToCart;
