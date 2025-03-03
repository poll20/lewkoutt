import React from "react";
import "./EmptyCart.css";
import { FaShoppingCart,FaHeart  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EmptyCart = (props) => {
    console.log("zzz"+props.endpoint)
    let navigate=useNavigate()
  const handleShopNow = () => {
    navigate("/")
  };

  return (
    <div className="empty-cart-container">
     {props.endpoint=="cart"?( <FaShoppingCart className="cart-icon" />):(<FaHeart className="cart-icon"/>)}
      <h2>{props.endpoint} is Empty</h2>
      <p>Please shop now to add items to your cart!</p>
      <button onClick={handleShopNow} className="shop-now-button">
        Shop Now
      </button>
    </div>
  );
};

export default EmptyCart;
