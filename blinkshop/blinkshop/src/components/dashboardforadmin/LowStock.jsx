// import React, { useEffect, useState } from 'react'
// import { useBio } from '../BioContext'
// export default function LowStock() {
//     let {productdataonlydetail}=useBio()
//     let [lowstock,setlowstock]=useState([])
//     useEffect(() => {
//         console.log("Product Data", productdataonlydetail);  // Check the data you are receiving
//         if (productdataonlydetail) {
//           const lowStockProducts = productdataonlydetail.filter((product) => {
//             console.log("Checking product:", product);  // Check individual product
//             return product.colors?.some((color) => 
//               color.sizes?.some((size) => size.quantity <= 5)
//             );
//           });
//           console.log("Low stock products:", lowStockProducts);  // Check filtered data
//           setlowstock(lowStockProducts);
//         }
//       }, [productdataonlydetail]);

//     if(lowstock){
//         console.log("ls",lowstock)
//     }
//   return (
//     <>
//       <div className="admin-ka-dashtable-container">
//       <h2 className="admin-ka-dashtable-title">Available Products</h2>
//       <h2 className="admin-ka-dashtable-title">Number Of Products is: {lowstock.length}</h2>
//       <table className="admin-ka-dashtable-table">
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Category</th>
//             <th>Title</th>
//             <th>Tag</th>
//             <th>Description</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Discount Price</th>
//             <th>Colors & Sizes</th>
//             <th>Discount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lowstock.map((product, index) => (
//             <tr key={index}>
//               <td>{product._id}</td>
//               <td>{product.cate}</td>
//               <td>{product.title}</td>
//               <td>{product.tag}</td>
//               <td>{product.description}</td>
//               <td>
//                 {product.image.map((e, i) => (
//                   <div key={i}>{e}</div>
//                 ))}
//               </td>
//               <td>₹{product.price}</td>
//               <td>₹{product.discountprice}</td>
//               <td>
//                 {product.colors.map((color, cIndex) => (
//                   <div key={cIndex}>
//                     <strong>{color.color}</strong>:{" "}
//                     {color.sizes.map((size, sIndex) => (
//                       <span key={sIndex}>
//                         {size.size} ({size.quantity})({size.image}){" "}
//                       </span>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               <td>{product.discount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   )
// }

// import React, { useEffect, useState } from "react";
// import { useBio } from "../BioContext";
// import "./AvailableProduct.css";
// import socket from "../socket";// ✅ Global socket import


// export default function LowStock() {
//   const { productdataonlydetail } = useBio();
//   const [lowstock, setLowstock] = useState([]);
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//             console.log("Product Data", productdataonlydetail);  // Check the data you are receiving
//             if (productdataonlydetail) {
//               const lowStockProducts = productdataonlydetail.filter((product) => {
//                 console.log("Checking product:", product);  // Check individual product
//                 return product.colors?.some((color) => 
//                   color.sizes?.some((size) => size.quantity <= 5)
//                 );
//               });
//               console.log("Low stock products:", lowStockProducts);  // Check filtered data
//               setLowstock(lowStockProducts);
//             }
//           }, [productdataonlydetail]);


    
//     useEffect(() => {
//         console.log("🟢 Registering socket listeners...");
      
//         socket.on("lowStockAlert", (data) => {
//           console.log("🔥 Low stock alert received:", data);
      
//           // ✅ Low stock state update karo
//           setLowstock((prev) => {
//             console.log("🔄 Updating Low Stock State...", prev);
//             return [...prev, data]; // New product add karo
//           });
      
//           // ✅ Notification show karo
//           setNotification(`Product "${data.title}" is low on stock (Qty: ${data.newStock}).`);
//         });
//         console.log("📌 Active Listeners:", socket.listeners("lowStockAlert").length);
//         return () => {
//           console.log("🛑 Removing socket listeners...");
//         //   socket.off("lowStockAlert");s
//         };
//       }, []);
      
    
//   return (
//     <div className="admin-ka-dashtable-container">
//       <h2 className="admin-ka-dashtable-title">Low Stock Products</h2>
//       {notification && <div className="notification">{notification}</div>}
//       <h2 className="admin-ka-dashtable-title">Number Of Products: {lowstock.length}</h2>
//       <table className="admin-ka-dashtable-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Category</th>
//             <th>Title</th>
//             <th>Tag</th>
//             <th>Description</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Discount Price</th>
//             <th>Colors & Sizes</th>
//             <th>Discount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lowstock.map((product, index) => (
//             <tr key={index}>
//               <td>{product._id}</td>
//               <td>{product.category}</td>
//               <td>{product.title}</td>
//               <td>{product.tag}</td>
//               <td>{product.description}</td>
//               <td>{product.image.map((e, i) => <div key={i}>{e}</div>)}</td>
//               <td>₹{product.price}</td>
//               <td>₹{product.discountprice}</td>
//               <td>
//                 {product.colors.map((color, cIndex) => (
//                   <div key={cIndex}>
//                     <strong>{color.color}</strong>:{" "}
//                     {color.sizes.map((size, sIndex) => (
//                       <span key={sIndex}>
//                         {size.size} ({size.quantity}) ({size.image})
//                       </span>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               <td>{product.discount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useBio } from "../BioContext";
import "./AvailableProduct.css";
// import socket from "../socket"; // ✅ Global socket import

export default function LowStock() {
  const { productdataonlydetail } = useBio();
  
  const [lowstock, setLowstock] = useState([]); // ✅ Initialize empty array
  const [notification, setNotification] = useState('');
  const [alertShown, setAlertShown] = useState(false); // ✅ Track Alert Status

  // ✅ API se Initial Low Stock Data Fetch Karo
  useEffect(() => {
    console.log("📢 Fetching initial low stock data...");
    
    if (productdataonlydetail.length > 0) {
      const lowStockProducts = productdataonlydetail.filter((product) => 
        product.colors?.some((color) => 
          color.sizes?.some((size) => size.quantity <= 5)
        )
      );

      console.log("✅ Low stock products from API:", lowStockProducts);
      setLowstock(lowStockProducts); // ✅ Initialize state from API
      setAlertShown(true)
      
       // ✅ Alert sirf tab trigger hoga jab naya product aaye
       const prevAlert = localStorage.getItem("lowStockAlert");
       if (lowStockProducts.length > 0 && prevAlert !== `⚠️ ${lowStockProducts.length} low stock products!`) {
         const message = `⚠️ ${lowStockProducts.length} low stock products!`;
         localStorage.setItem("lowStockAlert", message);
         window.dispatchEvent(new Event("lowStockAlertEvent"));
       }
    }
  }, [productdataonlydetail]);

  // ✅ Socket Event Listener (New Low Stock Product)
//   useEffect(() => {
//     console.log("🟢 Registering socket listeners...");

//     socket.on("lowStockAlert", (data) => {
//       console.log("🔥 Low stock alert received:", data);

//       setLowstock((prev) => {
//         // ✅ Check karo ki product already exist na kare
//         const isDuplicate = prev.some((p) => p.productId === data.productId);
//         if (isDuplicate) return prev; // ✅ Agar already hai to update na karo
        
//         console.log("🔄 Updating Low Stock State...");
//         return [...prev, data]; // ✅ Add new product
//       });

//       setNotification(`Product "${data.title}" is low on stock (Qty: ${data.newStock}).`);
   
//   // ✅ Alert Show Karega
//   // ✅ Alert sirf ek baar show hoga
//   if (!alertShown) {
//     alert(`⚠️ Low Stock Alert! \nProduct: ${data.title}\nRemaining Qty: ${data.newStock}`);
//     setAlertShown(true); // ✅ Alert show ho chuka hai, dobara nahi hoga
//   }
//       console.log("✅ Notification UI Updated!");
//     });

//     console.log("📌 Active Listeners:", socket.listeners("lowStockAlert").length);

//     return () => {
//       console.log("🛑 Removing socket listeners...");
//     //   socket.off("lowStockAlert");
//     };
//   }, []);
if(notification){
    console.log("this is noti",notification)
}
  return (
    <div className="admin-ka-dashtable-container">
      <h2 className="admin-ka-dashtable-title">Low Stock Products</h2>
      {/* {notification && <div className="notification">{notification}</div>} */}
      <h2 className="admin-ka-dashtable-title">Number Of Products: {lowstock.length}</h2>
      <table className="admin-ka-dashtable-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Title</th>
            <th>Tag</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Colors & Sizes</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {lowstock.map((product, index) => (
            <tr key={index}>
              <td>{product._id}</td>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{product.tag}</td>
              <td>{product.description}</td>
              <td>{product.image.map((e, i) => <div key={i}>{e}</div>)}</td>
              <td>₹{product.price}</td>
              <td>₹{product.discountprice}</td>
              <td>
                {product.colors.map((color, cIndex) => (
                  <div key={cIndex}>
                    <strong>{color.color}</strong>:{" "}
                    {color.sizes.map((size, sIndex) => (
                      <span key={sIndex}>
                        {size.size} ({size.quantity}) ({size.image})
                      </span>
                    ))}
                  </div>
                ))}
              </td>
              <td>{product.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
