import React from "react";
import "./EmptyCart.css";
import { FaShoppingCart,FaHeart  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import animation from "./image/emptywishlist.mp4"
const EmptyCart = (props) => {
    console.log("zzz"+props.endpoint)
    let navigate=useNavigate()
  const handleShopNow = () => {
    navigate("/")
  };

  return (
    <div className="empty-cart-container" >
     {props.endpoint=="cart"?( <iframe
        src="https://lottie.host/embed/185d91dd-b0a3-4311-98b6-31498f60b79d/Y7ocFegicm.lottie"
        style={{
          width: "180px",
          height: "180px",
          border: "none",
          marginBottom: "20px",
        }}
        title="No Orders Animation"
      ></iframe>):(<video autoPlay loop muted playsInline  preload="auto" style={{width:"250px",height:"250px"}}>
  <source src={animation} type="video/mp4"  />
</video>)}
      <h style={{color:"black"}}>As empty as your ex's promise </h>
      <p style={{marginTop:"8px"}}>Add products to your bag, review them anytime and easily move to cart.</p>
      <button onClick={handleShopNow} className="shop-now-button">
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
