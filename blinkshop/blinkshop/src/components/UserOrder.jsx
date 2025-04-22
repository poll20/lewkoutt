// // import React from "react";
// // import "./UserOrders.css";
// // import { useBio } from "./BioContext";
// //  import img1 from "./image/img3.jpg"
// //  import { FaStar } from "react-icons/fa";
// // import { useState } from "react";

// // const UserOrder = ({ productId, userId }) => {
 
// //   const {userorder,submitRating}=useBio()
// //   const [rating, setRating] = useState(0);
// //   const [hover, setHover] = useState(0);
// //   const [review, setReview] = useState("");

// //   return (
// //     <div className="order-container">
// //       <h2 className="order-header">Your Orders</h2>
// //       <div className="help-button">Help</div>
// //       { userorder.map((order) => (
        
// //         <div className="order-card" key={order._id}>
// //           <div className="order-status">
// //             <span className={`status-badge ${order.status.toLowerCase()}`}>
// //               {order.status}
// //             </span>
// //           </div>
// //           <div className="order-details">

// //             {
// //               order.products.map((e)=>( 
// //               <>
// //               <img src={img1} alt={e.tag} className="order-image" />
// //                 <div className="order-info">
// //                   <h3 className="order-title">{e.tag}</h3>
// //                   <p className="order-meta">
// //                     Size: {e.size} | Qty: {e.qty} | {e.discountprice}
// //                   </p>
// //                   <p className="order-delivery">
// //                     <span>📦 ordered on  {order.orderedAt}</span>
// //                   </p>
// //                 </div>
// //                 </>
                
// //                 ))
// //             }
           
// //           </div>
// //           <div style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
// //       <span>Rate this Product</span>
// //       <div style={{ display: "flex", gap: "5px" }}>
// //         {[1, 2, 3, 4, 5].map((star) => (
// //           <FaStar
// //             key={star}
// //             size={20}
// //             color={star <= (hover || rating) ? "gold" : "gray"}
// //             onMouseEnter={() => setHover(star)}
// //             onMouseLeave={() => setHover(0)}
// //             onClick={() => setRating(star)}
// //             style={{ cursor: "pointer" }}
// //           />
// //         ))}
// //       </div>
// //       {/* <textarea
// //         placeholder="Write a review (optional)"
// //         value={review}
// //         onChange={(e) => setReview(e.target.value)}
// //       />
// //       <button onClick={submitRating} disabled={rating === 0}>Submit</button> */}
// //     </div>
// //         </div>
// //       ))}
// //       <div className="order-summary">
// //         <p>
// //           <strong>Order ID: #3367212</strong>
// //         </p>
// //         <p>
// //           <span>Total ₹1049</span> | <span>1 Item</span> | Prepaid
// //         </p>
// //         <a href="#" className="view-breakup">View Breakup</a>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserOrder;

// // productId, userId, rating, review

// import React, { useState } from "react";
// import "./UserOrders.css";
// import { useBio } from "./BioContext";
// import img1 from "./image/img3.jpg";
// import { FaStar } from "react-icons/fa";
// import { useAuth } from "./AuthContext";
// import { use } from "react";

// const UserOrder = () => {
//   const { userorder, submitRating,fetchRatings,rating} = useBio();
//   const {userDetails}=useAuth()
//   if(!userorder && !userDetails){
//     return(<p>loading....</p>)
//   }
//   // 🟢 Rating state for individual products
//   const [ratings, setRatings] = useState({}); 
//   const [hoverRatings, setHoverRatings] = useState({});
//   const [reviews, setReviews] = useState({});

//   // 🟡 Function to handle rating update
//   const handleRating = (productId,star) => {
//     setRatings((prev) => ({ ...prev, [productId]: star }));
//     setTimeout(()=>{submitRating(productId,userDetails._id,star,"good")},600)
//     setTimeout(()=>{fetchRatings(productId)},1000)
    
//   };

//   return (
//     <div className="order-container">
//       <h2 className="order-header">Your Orders</h2>
//       <div className="help-button">Help</div>

//       {userorder.map((order) => (
//         <div className="order-card" key={order._id}>
//           <div className="order-status">
//             <span className={`status-badge ${order.status.toLowerCase()}`}>
//               {order.status}
//             </span>
//           </div>
          
//           <div className="order-details">
//             {order.products.map((product) => (
//               <div key={product._id} className="product-container">
//                 <img src={img1} alt={product.tag} className="order-image" />
//                 <div className="order-info">
//                   <h3 className="ordeer-title">{product.tag}</h3>
//                   <p className="order-meta">
//                     Size: {product.size} | Qty: {product.qty} | {product.discountprice}
//                   </p>
//                   <p className="order-delivery">
//                     <span>📦 ordered on {order.orderedAt}</span>
//                   </p>
//                 </div>

//                 {/* ⭐ Star Rating */}
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                   <span style={{fontSize:"15px",fontWeight:"lighter",color:"gray"}}>Rate this Product</span>
                  
//                   <div style={{ display: "flex", gap: "5px" }}>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <FaStar
//                         key={star}
//                         size={20}
//                         color={star <= (hoverRatings[product._id] || ratings[product._id]||rating.find(r => r.productId === product._id)?.rating  || 0) ? "gold" : "gray"}
//                         onMouseEnter={() => setHoverRatings((prev) => ({ ...prev, [product._id]: star }))}
//                         onMouseLeave={() => setHoverRatings((prev) => ({ ...prev, [product._id]: 0 }))}
//                         onClick={() => handleRating(product._id, star)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     ))}
//                   </div>
                  
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="order-summary">
//         <p>
//           <strong>Order ID: #3367212</strong>
//         </p>
//         <p>
//           <span>Total ₹1049</span> | <span>1 Item</span> | Prepaid
//         </p>
//         <a href="#" className="view-breakup">View Breakup</a>
//       </div>
//     </div>
//   );
// };

// export default UserOrder;

import React, { useEffect, useState } from "react";
import "./UserOrders.css";
import { useBio } from "./BioContext";
import img1 from "./image/img3.jpg";
import { FaStar } from "react-icons/fa";
import { useAuth } from "./AuthContext";

import { NavLink } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";

const UserOrder = () => {
  const { userorder, submitRating, fetchRatings, rating } = useBio();
  const[userorderr,setuserorder]=useState([])
  // const { userDetails } = useAuth();
  const{userDetails}=useFirebaseAuth()

  if (!userorder && !userDetails) {
    return <p>Loading...</p>;
  }

  // 🟢 Rating state for individual products
  const [ratings, setRatings] = useState({})  ;
  const [hoverRatings, setHoverRatings] = useState({});

  // 🟡 Function to handle rating update
  const handleRating = (productId, star) => {
    setRatings((prev) => ({ ...prev, [productId]: star }));
    setTimeout(() => {
      submitRating(productId, userDetails._id, star, "good");
    }, 600);
    setTimeout(() => {
      fetchRatings(productId);
    }, 1000);
  };

  useEffect((e)=>{
    setuserorder(userorder)
  },[userorder])
  return (
    <div className="order-container">
      <h2 className="order-header">Your Orders</h2>
      <div className="help-button">Help</div>

      {userorderr.map((order) => {
        // ✅ Calculate time difference if status is delivered
        let diffInHours = 0;
        if (order.status.toLowerCase() === "delivered" && order.deliveredAt) {
          const deliveredTime = new Date(order.deliveredAt);
          const now = new Date();
          diffInHours = (now - deliveredTime) / (1000 * 60 * 60); // hours
        }

        return (
          <div className="order-card" key={order._id}>
            <div className="order-status">
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-details">
              {order.products.map((product) => (
                <div key={product._id} className="product-container">
                  <NavLink to={`/productdescription/${product.productId}`} className='navlink'>                 
                     <img src={img1} alt={product.tag} className="order-image" />
                  <div className="order-info">
                    <h3 className="ordeer-title">{product.tag}</h3>
                    <p className="order-meta">
                      Size: {product.size} | Qty: {product.qty} | {product.discountprice}
                    </p>
                    <p className="order-delivery">
                      <span>📦 ordered on {order.orderedAt}</span>
                    </p>
                  </div>
                  </NavLink>

                  {/* ⭐ Condition: 
                      - If order is "Delivered" 
                      - Check time difference (diffInHours)
                        - If < 1 => Show Return Button
                        - Else => Show Star Rating
                  */}
                  {order.status.toLowerCase() === "delivered" ? (
                    diffInHours < 1 ? (
                      /* SHOW RETURN BUTTON */
                      <NavLink to={`/return/${product._id}`}>
                      <button style={{ marginTop: "10px" ,backgroundColor:"white",padding:"1px",border:".5px solid black"}}>
                        Return
                      </button>
                      </NavLink>
                    ) : (
                      /* SHOW STAR RATING AFTER 1 HOUR */
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ fontSize: "15px", fontWeight: "lighter", color: "gray" }}>
                          Rate this Product
                        </span>
                        <div style={{ display: "flex", gap: "5px" }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={20}
                              color={
                                star <=
                                (
                                  hoverRatings[product._id] ||
                                  ratings[product._id] ||
                                  rating.find((r) => r.productId === product._id)?.rating ||
                                  0
                                )
                                  ? "gold"
                                  : "gray"
                              }
                              onMouseEnter={() =>
                                setHoverRatings((prev) => ({ ...prev, [product._id]: star }))
                              }
                              onMouseLeave={() =>
                                setHoverRatings((prev) => ({ ...prev, [product._id]: 0 }))
                              }
                              onClick={() => handleRating(product._id, star)}
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  ) : null /* If not delivered, show nothing here */}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="order-summary">
        <p>
          <strong>Order ID: #3367212</strong>
        </p>
        <p>
          <span>Total ₹1049</span> | <span>1 Item</span> | Prepaid
        </p>
        <a href="#" className="view-breakup">
          View Breakup
        </a>
      </div>
    </div>
  );
};

export default UserOrder;
