import React, { useState, useEffect, useContext } from 'react';
import './Wishlist.css';
import { BioContext } from './BioContext';
import EmptyCart from './EmptyCart';
import { useParams } from 'react-router-dom';
import { useBio } from './BioContext';
import { ToastContainer, toast } from 'react-toastify';
import Card from './Card';
export default function Wishlist() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {addtocartitem,cartitem} = useContext(BioContext);
  console.log("wish",addtocartitem)
  const [isOpen, setIsOpen] = useState(false);
  const {wishlistdata,handleRemoveClickwishlist, addToCart}=useBio()
  const [selectedSizes, setSelectedSizes] = useState({}); // Store sizes for each item
  const [cartData, setCartData] = useState([]);
 const endpoint=window.location.pathname;
 let t=endpoint.substring(1);
 console.log("ssss"+t)
  // Fetch cart data from database to compare
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       let res = await fetch("http://localhost:3000/addtocart");
  //       let data = await res.json();
  //       setCartData(data); // This will contain items already in the cart
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchCartData();
  // }, []);

  // Handle size selection for each item
  const handleSizeClick = (size, id) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [id]: size, // Set size for the specific item
    }));
  };

  // Handle move to bag click
  let handleclick = async (id) => {

    // if(cartData.some((item) => item.id === id==true)){
    // alert("item already in cart")
    // return
    //     }
    if (!selectedSizes[id]) {
      toast.info("Please select a size before adding to the cart.");
      return;
    }

    try {
      
      let data = wishlistdata.find((e) => e.id === id);
      console.log("jij",data)
      data['size'] = selectedSizes[id]; // Use the selected size for this item
         console.log("xqe",selectedSizes[id])
      let res = await fetch(`${apiUrl}/addtocart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("itme move to bag successfully")
        console.log("Item added to cart successfully");
      } else {
        console.log("Failed to add item to cart");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Handle remove from wish click
  let handleRemoveClick = (id) => {
   handleRemoveClickwishlist(id)
  };

  // Check if item is already in the cart
  const isInCart = (id) => {
    return wishlist.some((item) => item.id === id);
  };
console.log(wishlistdata)
  return (
    <>
      {/* <div className="cart-page-container" style={{ border: "2px solid white" }}>
        {wishlistdata.length > 0 ? (
          wishlistdata.map((data, ind) => (
            <div key={ind} className="cart-container" style={{ border: "2px solid white"}}>
              <div className="cart-main-imagee">
                <img src={data.image} alt="" />
              </div>

              <div className="cart-details section">
                <h3 className="cart-product-title">{data.title}</h3>
                <p className="cart-product-price">price</p>
                <p className="cart-product-description">{data.description}</p>

                
                <div style={{ display: 'flex' }}>
                  {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                    <button
                      key={size}
                      style={{ margin: "0 3px" }}
                      className={`size-btn ${selectedSizes[data.id] === size ? "active" : ""}`}
                      onClick={() => handleSizeClick(size, data.id)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="cart-action-buttons">

                    <button className="open-menu-btn" onClick={() => handleclick(data.id)}>
                      Move to Bag
                    </button>
                    <button className="open-menu-btn" onClick={() => handleRemoveClick(data.id)}>
                      Remove from WishList
                    </button>
                  
                  
                </div>
              </div>
            </div>
          ))
        ) : (
         <EmptyCart endpoint={t}/>
        )}
      </div> */}
      <Card/>
    </>
  );
}
