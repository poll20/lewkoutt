

import React, { useState,useEffect} from 'react';
import './AddToCart.css';
import { useBio } from './BioContext';
import EmptyCart from './EmptyCart';
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import newme from "./image/img3.jpg";

const AddToCart = () => {
  const navigate = useNavigate();
  const { addtocartitem, addtocartdatas, removefromaddtocart, addtowishlistonly, takebuydata } = useBio();
  const [choosebuy,setchoosebuy]=useState([])
  const [popup, setPopup] = useState(false);
  const [popupProductId, setPopupProductId] = useState(null);
  const [wowalaprd, setwowalaprd] = useState(null);
 const[totalprice,settotalprice]=useState(0)
 const [isChecked, setIsChecked] = useState(false);
 const[cprice,setcprice]=useState(0)
  
  
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
      setchoosebuy((prev) => [...prev, order]);
    } else {
      // Remove item from the choosebuy list
      setchoosebuy((prev) => prev.filter((item) => item._id !== order._id));
    }
  };


useEffect(() => {
  const total = choosebuy.reduce((acc, item) => acc + item.discountprice, 0);
  const ct=choosebuy.reduce((acc,item)=>acc+item.price,0)
  settotalprice(total);
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
      navigate("/address");
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
    {console.log("opli",addtocartdatas)}
      <div className="header">
        <IoIosArrowRoundBack size={30} onClick={() => navigate(-1)} />
        <h2 style={{ marginBottom: "5px" }}>Shopping Bag</h2>
      </div>

      <div className="order-container-addtocart">
      {addtocartdatas.length > 0 ? (
          addtocartdatas.map((order) => (
            <div className="order-card-addtocart" key={order._id}>
              {/* <div
                style={{
                  border: "1px solid gray",
                  position: "absolute",
                  left: "25vw",
                  top: "80vh",
                  width: "50vw",
                  height: "20vh",
                  background: "white",
                  display: popup && popupProductId === order.productid ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  
                }}
              >
                <RxCross1 size={18} onClick={closePopup} />
                <span onClick={() => {
                  removefromaddtocart(popupProductId);
                  closePopup();
                }}>
                  <AiOutlineDelete /> Remove from bag
                </span>
                <span onClick={() => {
                  addtowishlistonly(popupProductId,wowalaprd);
                  closePopup();
                }}>
                  <CiHeart /> Move to wish list
                </span>
              </div> */}

              <div className="order-detailss-addtocart">
                <div className="custom-checkbox">
                  <input type="checkbox" style={{padding:"1px"}}  checked={choosebuy.some((item) => item._id === order._id)}
                    onChange={(e) => handlechoosebuy(order, e.target.checked)} />
                </div>
                <div>
                  <img src={newme} alt={order.title} className="order-imagee-addtocart" />
                </div>
                <div>
                  <div className="order-info-addtocart">
                    <h3 className="order-title-addtocart">
                      {order.description.length > 19
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
        )}
        <div className="bottom-sheet" style={{ display:choosebuy.length>0?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0',border:"1px solid white"}}>
          <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
         <span style={{fontWeight:"bold",fontSize:"20px",color:"green"}}>₹{totalprice}</span>
         <span className="original-price">₹{cprice}</span>
         </div>
        <button className="buy-buttonss" style={{width:"140px"}} onClick={()=>{sendtocheckout()}}>Buy Now</button>
       </div>
       <div className="bottom-sheet" style={{ display:popupProductId?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0',border:"1px solid white"}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
         <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {removefromaddtocart(popupProductId);closePopup();}}>Remove</button> 
        <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {addtowishlistonly(popupProductId);closePopup();}}>Wishlist</button>
       </div>

       
      </div>
    </>
  );
};

export default AddToCart;
