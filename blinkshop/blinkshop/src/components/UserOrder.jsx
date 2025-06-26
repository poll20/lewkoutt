

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
const [reviews, setReviews] = useState({});
const [images, setImages] = useState({});
const [previewImages, setPreviewImages] = useState({});
  
  const [hoverRatings, setHoverRatings] = useState({});

  // 🟡 Function to handle rating update
  // const handleRating = (productId, star) => {
  //   setRatings((prev) => ({ ...prev, [productId]: star }));
  //   setTimeout(() => {
  //     submitRating(productId, userDetails._id, star);
  //   }, 600);
  //   setTimeout(() => {
  //     fetchRatings(productId);
  //   }, 1000);
  // };
const handleRating = (productId, star) => {
  setRatings((prev) => ({ ...prev, [productId]: star }));
};
// const handleSubmit = (productId) => {
//   const selectedRating = ratings[productId] || 0;
//   const selectedReview = reviews[productId] || "";
//   const selectedImage = images[productId] || null;

  
//   if (!selectedRating) {
//     alert("Please select a rating before submitting.");
//     return;
//   }

//   submitRating(productId, userDetails._id, selectedRating, selectedReview, selectedImage);

//   // Optionally reset the fields after submission:
//   setRatings((prev) => ({ ...prev, [productId]: 0 }));
//   setReviews((prev) => ({ ...prev, [productId]: "" }));
//   setImages((prev) => ({ ...prev, [productId]: null }));
//   setPreviewImages((prev) => ({ ...prev, [productId]: null }));
// };
const uploadToCloudinary = async (files) => {
  const urls = [];

  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lewkout"); // ✅ Tumhara upload_preset
    formData.append("cloud_name", "ddbz9m39a");   // ✅ Tumhara cloud name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        urls.push(data.secure_url);
      } else {
        console.error("Cloudinary response invalid:", data);
      }

    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  return urls;
};


const handleSubmit = async (productId) => {
  const selectedRating = ratings[productId] || 0;
  const selectedReview = reviews[productId] || "";
  const selectedImageFiles = images[productId] || []; // 🟢 Files from input

  if (!selectedRating) {
    alert("Please select a rating before submitting.");
    return;
  }

  // ✅ Upload images to Cloudinary
  const uploadedUrls = await uploadToCloudinary(selectedImageFiles);
  console.log("✅ Images being sent:", uploadedUrls);

  // ✅ Call your submitRating function
  setTimeout(() => {
  submitRating(productId, userDetails._id, selectedRating, selectedReview, uploadedUrls);
}, 600);
  setTimeout(() => {
      fetchRatings(productId);
    }, 1000);
  
  // ✅ Reset form
  // setRatings((prev) => ({ ...prev, [productId]: rating}));
  setReviews((prev) => ({ ...prev, [productId]: "" }));
  setImages((prev) => ({ ...prev, [productId]: null }));
  setPreviewImages((prev) => ({ ...prev, [productId]: null }));

  
    
};




  
  return (
    <div className="order-container" style={{marginTop:"70px"}}>
      <h2 className="order-header">Your Orders</h2>
      <div className="help-button">Help</div>

      {userorder.map((order) => {
        // ✅ Calculate time difference if status is delivered
        let diffInHours = 0;
        if (order.status.toLowerCase() === "delivered" && order.deliveredAt) {
          const deliveredTime = new Date(order.deliveredAt);
          const now = new Date();
          diffInHours = (now - deliveredTime) / (1000 * 60 * 60); // hours
        }

        return (
          <div className="order-card" key={order._id}>
            {/* <div className="order-status">
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div> */}

            <div className="order-details">
            {order.products?.map((product) => (
              
  <div key={product._id} className="product-container">
     <div className="order-status">
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
    {
      product.totalAmount>0?(<NavLink to={`/productdescription/${product.productId}`} className='navlink'>
      <img src={product.image?.[0]} alt={product.tag} className="order-image" />
      <div className="order-info">
        <h3 className="ordeer-title">{product.tag}</h3>
        <p className="order-meta">
          Size: {product.size} | Qty: {product.quantity || product.qty} | ₹{product.discountprice}
        </p>
        <p className="order-delivery">
          <span>📦 ordered on {order.orderedAt}</span>
        </p>
      </div>
    </NavLink>):('')
    }
    

    {/* ✅ Review/Return buttons remain the same */}
    {order.status.toLowerCase() === "delivered" ? (
      diffInHours < 1 ? (
        <NavLink to={`/return/${product._id}`}>
          <button style={{ marginTop: "10px", backgroundColor: "white", padding: "1px", border: ".5px solid black" }}>
            Return
          </button>
        </NavLink>
      ) :  (
                      /* SHOW STAR RATING AFTER 1 HOUR */
                      // <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      //   <span style={{ fontSize: "15px", fontWeight: "lighter", color: "gray" }}>
                      //     Rate this Product
                      //   </span>
                      //   <div style={{ display: "flex", gap: "5px" }}>
                      //     {[1, 2, 3, 4, 5].map((star) => (
                      //       <FaStar
                      //         key={star}
                      //         size={20}
                      //         color={
                      //           star <=
                      //           (
                      //             hoverRatings[product._id] ||
                      //             ratings[product._id] ||
                      //             rating.find((r) => r.productId === product._id)?.rating ||
                      //             0
                      //           )
                      //             ? "gold"
                      //             : "gray"
                      //         }
                      //         onMouseEnter={() =>
                      //           setHoverRatings((prev) => ({ ...prev, [product._id]: star }))
                      //         }
                      //         onMouseLeave={() =>
                      //           setHoverRatings((prev) => ({ ...prev, [product._id]: 0 }))
                      //         }
                      //         onClick={() => handleRating(product._id, star)}
                      //         style={{ cursor: "pointer" }}
                      //       />
                      //     ))}
                      //   </div>
                      // </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <div style={{ display: "flex", gap: "5px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        size={20}
        color={
          star <= (
            hoverRatings[product?.productId] ||
            ratings[product?.productId] ||
            rating.find((r) => r?.productId === product?.productId )?.rating ||
            0
          )
            ? "gold"
            : "gray"
        }
        onMouseEnter={() =>
          setHoverRatings((prev) => ({ ...prev, [product.productId]: star }))
        }
        onMouseLeave={() =>
          setHoverRatings((prev) => ({ ...prev, [product.productId]: 0 }))
        }
        onClick={() => handleRating(product.productId, star)}
        style={{ cursor: "pointer" }}
      />
    ))}
  </div>

  {/* 📝 Text Review Field */}
  <textarea
    rows={3}
    placeholder="Write your review..."
    value={reviews[product.productId] || ""}
    onChange={(e) =>
      setReviews((prev) => ({ ...prev, [product.productId]: e.target.value }))
    }
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    }}
  />

  {/* 🖼️ Image Upload Field */}
<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => setImages((prev) => ({
    ...prev,
    [product._id]: Array.from(e.target.files)
  }))}
/>
  {previewImages[product._id] && (
    <img
      src={previewImages[product._id]}
      alt="Preview"
      width={100}
      style={{ borderRadius: "6px" }}
    />
  )}

  {/* 📤 Submit Button */}
  {/* <button
    onClick={() => handleSubmit(product._id,reviews,images)}
    style={{
      background: "#333",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      border: "none",
      marginTop: "10px",
      alignSelf: "start"
    }}
  >
    Submit Review
  </button> */}
  <button
  onClick={() => handleSubmit(product.productId)}
  style={{
    background: "#333",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
    alignSelf: "start"
  }}
>
  Submit Review
</button>
</div>

                    )
                  ) : null /* If not delivered, show nothing here */}

    {/* ✅ Step 2: SHOW BUNDLED PRODUCTS IF PRESENT */}
    {product.bundle?.length > 0 && (
      <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
        <h4 style={{ fontWeight: "500", marginBottom: "5px" }}>Bundled Products:</h4>
        {product.bundle.map((bundleItem, index) => (
          <div key={index} style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "5px 0",
            borderBottom: "1px dashed #ccc"
          }}>
            <img
              src={bundleItem.image}
              alt={bundleItem.name}
              style={{ width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0", fontWeight: "500" }}>{bundleItem.name}</p>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                size: {bundleItem.sizes} | ₹{bundleItem.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
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
