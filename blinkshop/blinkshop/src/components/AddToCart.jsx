

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
import BundleProduct from './BundleProduct';

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
      console.log("order kya mila",order)
      setchoosebuy((prev) => [...prev, order]);
    } else {
      // Remove item from the choosebuy list
      setchoosebuy((prev) => prev.filter((item) => item._id !== order._id));
    }
  };


useEffect(() => {
  const total = choosebuy.reduce((acc, item) => acc + ( item.discountprice || item.bundle[0].bundletotalamount ), 0);
  const ct=choosebuy.reduce((acc,item)=>acc +( item.price || item.bundle[0].bundletotalamount ) ,0)
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
    
      <div className="header" >
        <IoIosArrowRoundBack size={30} onClick={() => navigate(-1)} />
        <h2 style={{ marginBottom: "5px" }}>Shopping Bag</h2>
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
          <NavLink to={`/productdescription/${order.productid}`} className="navlink">
            <div>
              <img src={order.image} alt={order.title} className="order-imagee-addtocart" />
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
                Size: {order.size} | Qty: {order.qty} | {order.discountprice}rs.
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
  <EmptyCart endpoint={window.location.pathname.substring(1)} />
)}

        <div className="bottom-sheet"  style={{ display:choosebuy.length>0 && addtocartdatas.length>0?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0'}}>
          <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
         <span style={{fontWeight:"bold",fontSize:"20px",color:"green"}}>₹{totalprice}</span>
         <span className="original-price">₹{cprice}</span>
         </div>
        <button className="buy-buttonss" style={{width:"140px",backgroundColor:"#F15A29"}} onClick={()=>{sendtocheckout()}} >Buy Now</button>
       </div>
       <div className="bottom-sheet" style={{ display:popupProductId?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0'}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
         <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {removefromaddtocart(popupProductId);closePopup();}}>Remove</button> 
        <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {addtowishlistonly(popupProductId,wowalaprd);closePopup();}}>Wishlist</button>
       </div>

       
      </div>
    </>
  );
};

export default AddToCart;
