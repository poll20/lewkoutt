import React, { useEffect, useState } from "react";
import { useBio } from "./BioContext";

import { FaStar } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";
import EmptyOrders from "./EmptyOrders";
import SixtyMinTimer from "./SixtyMinTimer"
const UserOrder = () => {
  const { userorder, submitRating, fetchRatings, rating ,fetchUserOrders} = useBio();
  const [userorderr, setuserorder] = useState([]);
  const { userDetails,user } = useFirebaseAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!userorder && !userDetails) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '16px',
        color: '#6b7280',
        fontWeight: '500',
        padding: '20px'
      }}>
        Loading...
      </div>
    );
  }

  // Rating state for individual products
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [images, setImages] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});

  // Timer states for each product
  const [timers, setTimers] = useState({});


// useEffect me userId pass karo
useEffect(() => { 
  if (userDetails?._id) {
      fetchUserOrders(userDetails._id);
       const eventSource = new EventSource(`${apiUrl}/events`);

    eventSource.onmessage = () => {
   fetchUserOrders(userDetails._id); // 🟢 Jab bhi event aaye, orders fetch karo
    };

    return () => {
        eventSource.close();
    };
  }
}, [user, userDetails?._id,userorder?.status]);

  // Initialize timers for delivered products
  useEffect(() => {
    const newTimers = {};
    
    userorder.forEach(order => {
      if (order.status.toLowerCase() === "delivered" && order.deliveredAt) {
        order.products?.forEach(product => {
          const deliveredTime = new Date(order.deliveredAt);
          const now = new Date();
          const diffInMs = now - deliveredTime;
          const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
          
          if (diffInMs < oneHourInMs) {
            const remainingMs = oneHourInMs - diffInMs;
            newTimers[product._id] = Math.max(0, Math.floor(remainingMs / 1000));
          }
        });
      }
    });
    
    setTimers(newTimers);
  }, [userorder]);

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1;
          } else {
            delete updated[key];
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const paymentStatus = params.get("status"); // PhonePe param

  if (paymentStatus === "SUCCESS") {
    showPopup("Payment Successful! Order Confirmed 🎉");
  }
}, []);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRating = (productId, star) => {
    setRatings((prev) => ({ ...prev, [productId]: star }));
  };

  const uploadToCloudinary = async (files) => {
    const urls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lewkout");
      formData.append("cloud_name", "ddbz9m39a");

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
    const selectedImageFiles = images[productId] || [];

    if (!selectedRating) {
      alert("Please select a rating before submitting.");
      return;
    }

    const uploadedUrls = await uploadToCloudinary(selectedImageFiles);
    console.log("✅ Images being sent:", uploadedUrls);

    setTimeout(() => {
      submitRating(productId, userDetails._id, selectedRating, selectedReview, uploadedUrls);
    }, 600);
    setTimeout(() => {
      fetchRatings(productId);
    }, 1000);

    setReviews((prev) => ({ ...prev, [productId]: "" }));
    setImages((prev) => ({ ...prev, [productId]: null }));
    setPreviewImages((prev) => ({ ...prev, [productId]: null }));
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
      shipped: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
      processing: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
      cancelled: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
      pending: { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' }
    };
    return colors[status.toLowerCase()] || colors.pending;
  };
 if (!userorder || userorder?.length === 0) {
    return <EmptyOrders />;
  }
  return (
    <div style={{
      marginTop: '70px',
      padding: '16px',
      maxWidth: '100%',
      margin: '70px auto 0',
      backgroundColor: '#fafafa',
      minHeight: '100vh'
    }}>
      {/* Header Section - Mobile First */}
      

      {/* Orders List */}
      {userorder.map((order) => {
        let diffInHours = 0;
        if (order.status.toLowerCase() === "delivered" && order.deliveredAt) {
          const deliveredTime = new Date(order.deliveredAt);
          const now = new Date();
          diffInHours = (now - deliveredTime) / (1000 * 60 * 60);
        }
 
        return (
          <div key={order._id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            marginBottom: '20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <SixtyMinTimer order={order}/>
            {order.products?.map((product) => {
              const statusColor = getStatusColor(order.status);
              const timeRemaining = timers[product._id];
              
              return (
                <div key={product._id} style={{
                  padding: '16px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  {/* Status Badge */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      backgroundColor: statusColor.bg,
                      color: statusColor.text,
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      border: `1px solid ${statusColor.border}`
                    }}>
                      {order.status}
                    </span>
                  </div>

                  {/* Product Details - Mobile First Layout */}
                  {product.totalAmount > 0 ? (
                    <div
                      
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                        
                        {/* Mobile: Image and basic info side by side */}
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start'
                        }}>
                          <img 
                            src={product.image?.[0]} 
                            alt={product.tag} 
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid #e5e7eb',
                              flexShrink: 0
                            }}
                            loading="lazy"
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#111827',
                              margin: '0 0 8px 0',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              lineHeight: '1.4',
                              wordBreak: 'break-word'
                            }}>
                              {product.tag}
                            </h3>
                            
                            {/* Mobile: Stack badges vertically */}
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              marginBottom: '8px'
                            }}>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px'
                              }}>
                                <span style={{
                                  backgroundColor: '#eff6ff',
                                  color: '#1e40af',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}>
                                  Size: {product.size}
                                </span>
                                <span style={{
                                  backgroundColor: '#f0fdf4',
                                  color: '#166534',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}>
                                  Qty: {product.quantity || product.qty}
                                </span>
                              </div>
                              <span style={{
                                backgroundColor: '#fef3c7',
                                color: '#d97706',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                alignSelf: 'flex-start'
                              }}>
                                ₹{product?.totalOrderAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Order date - full width on mobile */}
                        <p style={{
                          margin: '0',
                          fontSize: '13px',
                          color: '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{ fontSize: '14px' }}>📦</span>
                          Ordered on {order.orderedAt}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* Return/Review Section */}

                  
                  {order.status.toLowerCase() === "delivered" && (
                    <div>
                      {/* Return Window with Timer */}
                      {timeRemaining > 0 && order?.timeslot !== "60 minutes or free"  ? (
                        <div style={{
                          // backgroundColor: '#fef2f2',
                          // border: '2px solid #fecaca',
                          borderRadius: '12px',
                          padding: '10px',
                          marginBottom: '10px'
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            alignItems: 'start',
                            textAlign: 'center'
                          }}>
                            
                            
                            {/* <div style={{
                              fontSize: '24px',
                              fontWeight: '700',
                              color: '#dc2626',
                              fontFamily: 'monospace',
                              backgroundColor: 'white',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: '2px solid #dc2626'
                            }}>
                              {formatTime(timeRemaining)}
                            </div> */}
                            
                            <NavLink to={`/return/${product._id}`} style={{ textDecoration: 'none' }}>
                              <button style={{
                                backgroundColor: 'white',
                                color: 'black',
                                padding: '5px 10px',
                                border: '1px solid black',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                // boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
                                width: '100%',
                                maxWidth: '200px'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#b91c1c';
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(220, 38, 38, 0.3)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#dc2626';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(220, 38, 38, 0.2)';
                              }}>
                                Return
                              </button>
                            </NavLink>
                            <div style={{
                              display: 'flex',
                              alignItems: 'start',
                              gap: '8px',
                              fontSize: '10px',
                              color: '#dc2626',
                              fontWeight: '400'
                            }}>
                              {/* <span style={{ fontSize: '18px' }}>⏰</span> */}
                              {/* Return Window Expires In 1 Houre Of Order  */}
                              <p>
  Return Window Expires In{" "}
  {order.address?.[0]?.city?.toLowerCase() === "jaipur division"
    ? "1 Hour Of Order"
    : "2 Days Of Order"}
</p>

                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Review Section - After 1 hour */
                        <div style={{
                          backgroundColor: '#f8fafc',
                          padding: '16px',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#334155',
                            margin: '0 0 16px 0',
                            textAlign: 'center'
                          }}>
                            Rate & Review this Product
                          </h4>
                          
                          {/* Star Rating - Mobile Optimized */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '16px'
                          }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                size={28}
                                color={
                                  star <= (
                                    hoverRatings[product?.productId] ||
                                    ratings[product?.productId] ||
                                    rating.find((r) => r?.productId === product?.productId)?.rating ||
                                    0
                                  ) ? "#fbbf24" : "#d1d5db"
                                }
                                onMouseEnter={() =>
                                  setHoverRatings((prev) => ({ ...prev, [product.productId]: star }))
                                }
                                onMouseLeave={() =>
                                  setHoverRatings((prev) => ({ ...prev, [product.productId]: 0 }))
                                }
                                onClick={() => handleRating(product.productId, star)}
                                style={{
                                  cursor: "pointer",
                                  transition: 'all 0.2s ease',
                                  filter: star <= (hoverRatings[product?.productId] || ratings[product?.productId] || 0) ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))' : 'none',
                                  touchAction: 'manipulation'
                                }}
                              />
                            ))}
                          </div>

                          {/* Review Textarea - Mobile Optimized */}
                          <textarea
                            rows={4}
                            placeholder="Share your experience with this product..."
                            value={reviews[product.productId] || ""}
                            onChange={(e) =>
                              setReviews((prev) => ({ ...prev, [product.productId]: e.target.value }))
                            }
                            style={{
                              width: '100%',
                              padding: '12px',
                              borderRadius: '8px',
                              border: '2px solid #e5e7eb',
                              fontSize: '14px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              resize: 'vertical',
                              transition: 'border-color 0.2s ease',
                              outline: 'none',
                              marginBottom: '16px',
                              boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                          />

                          {/* Image Upload - Mobile Optimized */}
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#374151',
                              marginBottom: '8px'
                            }}>
                              Add Photos (Optional)
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => setImages((prev) => ({
                                ...prev,
                                [product._id]: Array.from(e.target.files)
                              }))}
                              style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '6px',
                                border: '2px dashed #d1d5db',
                                fontSize: '14px',
                                cursor: 'pointer',
                                boxSizing: 'border-box'
                              }}
                            />
                            {previewImages[product._id] && (
                              <img
                                src={previewImages[product._id]}
                                alt="Preview"
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  marginTop: '12px',
                                  border: '2px solid #e5e7eb'
                                }}
                                loading="lazy"
                              />
                            )}
                          </div>

                          {/* Submit Button - Mobile Optimized */}
                          <button
                            onClick={() => handleSubmit(product.productId)}
                            style={{
                              backgroundColor: '#10b981',
                              color: 'white',
                              padding: '14px 24px',
                              borderRadius: '8px',
                              border: 'none',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                              width: '100%',
                              touchAction: 'manipulation'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#059669';
                              e.target.style.transform = 'translateY(-1px)';
                              e.target.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.3)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#10b981';
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.2)';
                            }}
                          >
                            Submit Review
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/*iske upr Bundle Products - Mobile Optimized */}
                  {product.bundle?.length > 0 && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '12px',
                        margin: '0 0 12px 0',
                        textAlign: 'center'
                      }}>
                        🎁 Bundled Products
                      </h4>
                      {product.bundle.map((bundleItem, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          padding: '12px',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          marginBottom: index < product.bundle.length - 1 ? '8px' : '0',
                          border: '1px solid #e5e7eb'
                        }}>
                          <img
                            src={bundleItem.image}
                            alt={bundleItem.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                              border: '1px solid #d1d5db',
                              flexShrink: 0
                            }}
                            loading="lazy"
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              margin: '0 0 4px 0',
                              fontWeight: '500',
                              fontSize: '14px',
                              color: '#111827',
                              wordBreak: 'break-word'
                            }}>
                              {bundleItem.name}
                            </p>
                            <p style={{
                              margin: 0,
                              fontSize: '12px',
                              color: '#6b7280'
                            }}>
                              Size: {bundleItem.sizes} | ₹{bundleItem.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

    
    </div>
  );
};

export default UserOrder;