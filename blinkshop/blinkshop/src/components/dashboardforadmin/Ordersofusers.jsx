// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Ordersofusers.css"; // ✅ CSS file bhi add karo
// import { useDashboard } from "./DashboardContext";

// const Ordersofusers = () => {
//   const [orders, setOrders] = useState([]);
//   const {userorder,markAsDelivered}=useDashboard()
//   const[status,setStatus]=useState("")
// if(!userorder){
//     return(<p>loading....</p>)
// }

  



//   return (
//     <div className="user-ke-orders-container">
//       <h2 className="user-ke-orders-title">All Orders{userorder.length}</h2>

//       <div className="user-ke-orders-table-wrapper">
//         <table className="user-ke-orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Products</th>
//               <th>Total Price</th>
//               <th>Status</th>
//               <th>Ordered At</th>
//               <th>Actions</th>
//               <th>show address map</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userorder.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.userId}</td>
//                 <td>{order.name}</td>
//                 <td>{order.email}</td>
//                 <td>{order.phone}</td>
//                 <td>{`${order?.address?.[0]?.building ||''} ${order?.address?.[0]?.locality ||''} ${order?.address?.[0]?.pincode ||''} ${order?.address?.[0]?.city ||''} ${order?.address?.[0]?.state ||''}`}</td>
//                 <td>
//                   {order.products.map((product, index) => (
//                     <div key={index}>
//                       <b>{product.tag}</b> - {product.size} ({product.quantity}x) - ₹{product.discountprice}
//                     </div>
//                   ))}
//                 </td>
//                 <td>₹{order.products.reduce((acc, p) => acc + p.totalAmount, 0)}</td>
//                 <td className={`user-ke-orders-status ${order.status.toLowerCase()}`}>
//                   {order.status}
//                 </td>
//                 <td>{new Date(order.orderedAt).toLocaleString()}</td>
//                 <td>
//                   <button className="user-ke-orders-btn"  onClick={() => {markAsDelivered(order._id) }}>Update Status</button>
//                 </td>
                
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Ordersofusers;

import React, { useState } from "react";
import "./Ordersofusers.css";
import { useDashboard } from "./DashboardContext";


const Ordersofusers = () => {
  const { userorder, markAsDelivered } = useDashboard();
  const [openMapId, setOpenMapId] = useState(null); // ✅ Track which map is open
  const [zoomedImage, setZoomedImage] = useState(null); // ✅ Track which image is zoomed
    

  const toggleZoom = (src) => {
    setZoomedImage(zoomedImage === src ? null : src);
  };
  if (!userorder) {
    return <p>Loading....</p>;
  }

  // ✅ Helper function to convert address to full string
  const formatAddress = (address) => {
    if (!address || !address[0]) return "";
    const { building, locality, pincode, city, state } = address[0];
    return `${building || ""} ${locality || ""} ${pincode || ""} ${city || ""} ${state || ""}`;
  };

  return (
    <div className="user-ke-orders-container">
      <h2 className="user-ke-orders-title">All Orders ({userorder.length})</h2>

      <div className="user-ke-orders-table-wrapper">
        <table className="user-ke-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Products</th>
               <th>Product image</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Actions</th>
              <th>Show Address Map</th> {/* ✅ Added header */}
            </tr>
          </thead>
          <tbody>
            {userorder.map((order) => {
              const fullAddress = formatAddress(order.address);

              return (
                <React.Fragment key={order._id}>
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{fullAddress}</td>
                    <td>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          <b>{product.tag}</b> - {product.size} ({product.quantity}x) - ₹{product.discountprice}
                        </div>
                      ))}
                    </td>
                      {/* ✅ Image with Zoom feature */}
              <td>
                {order.products.map((product, index) => (
                  <div key={index}>
                    <img
                      onClick={() => toggleZoom(product.image[0])}
                      style={{ width: "150px", height: "150px", cursor: "pointer", objectFit: "cover" }}
                      src={product.image[0]}
                      alt=""
                    />
                  </div>
                ))}
              </td>
                   
                    <td>₹{order.products.reduce((acc, p) => acc + p.totalAmount, 0)}</td>
                    <td className={`user-ke-orders-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </td>
                    <td>{new Date(order.orderedAt).toLocaleString()}</td>
                    <td>
                     <button
  className="user-ke-orders-btn"
  onClick={() => {
    markAsDelivered(order._id);
    // ✅ Better to use setTimeout than setInterval here
  }}
>
  Update Status
</button>

                    </td>
                    <td>
                      <button
                        className="user-ke-orders-btn"
                        onClick={() =>
                          setOpenMapId(openMapId === order._id ? null : order._id)
                        }
                      >
                        {openMapId === order._id ? "Hide Map" : "View on Map"}
                      </button>
                    </td>
                  </tr>

                  {/* ✅ Conditionally render the map */}
                  {openMapId === order._id && (
                    <tr>
                      <td colSpan="12">
                        <iframe
                          title={`Map for ${order._id}`}
                          width="100%"
                          height="300"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            fullAddress
                          )}&output=embed`}
                        ></iframe>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {/* ✅ Zoomed full-screen image */}
      {zoomedImage && (
        <div
          className="zoomed-image-overlay"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
        </div>
      )}
      </div>
    </div>
  );
};

export default Ordersofusers;
