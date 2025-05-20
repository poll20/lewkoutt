import React from "react";
import "./EmptyCart.css";
import { FaShoppingCart,FaHeart  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import animation from "./image/emptywish.mp4"
const EmptyCart = (props) => {
    console.log("zzz"+props.endpoint)
    let navigate=useNavigate()
  const handleShopNow = () => {
    navigate("/")
  };

  return (
    <div className="empty-cart-container">
     {props.endpoint=="cart"?( <FaShoppingCart className="cart-icon" />):(<video autoPlay loop muted playsInline style={{width:"200px",height:"200px"}}>
  <source src={animation} type="video/mp4"  />
</video>)}
      <h2>{props.endpoint.slice(0,8)} is Empty</h2>
      <p>Look like you hav'nt added anythong yet. Start exploring and save your favorites</p>
      <button onClick={handleShopNow} className="shop-now-button" >
        Shop Now
      </button>
    </div>
  );
};

export default EmptyCart;
