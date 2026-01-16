import React, { useState, useEffect } from "react";
import "./Ordersofusers.css";
import { useDashboard } from "./DashboardContext";

const Ordersofusers = () => {
  const { userorder, markAsDelivered ,fetchuserorder} = useDashboard();
  const [openMapId, setOpenMapId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [latLngMap, setLatLngMap] = useState({});

  const toggleZoom = (src) => {
    setZoomedImage(zoomedImage === src ? null : src);
  };
useEffect(() => {
  fetchuserorder();
}, []);

  if (!userorder) return <p>Loading....</p>;

  const formatAddress = (address) => {
    if (!address || !address[0]) return "";
    const { building, locality, pincode, city, state } = address[0];
    return `${building || ""} ${locality || ""} ${pincode || ""} ${city || ""} ${state || ""}`;
  };

  // Load Google Maps API dynamically
  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src^="https://maps.googleapis.com/maps/api/js"]`
      );
      if (existingScript) {
        existingScript.addEventListener("load", resolve);
        existingScript.addEventListener("error", reject);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!openMapId) return;

    const initMap = async () => {
      await loadGoogleMaps();

      const currentOrder = userorder.find((o) => o._id === openMapId);
      if (!currentOrder) return;

      const mapContainer = document.getElementById(`map-${openMapId}`);
      if (!mapContainer) return;

      const lat = currentOrder?.address?.[0]?.lat;
      const lng = currentOrder?.address?.[0]?.lng;

      if (lat && lng) {
        const center = new window.google.maps.LatLng(lat, lng);

        setLatLngMap((prev) => ({
          ...prev,
          [openMapId]: { lat, lng },
        }));

        const map = new window.google.maps.Map(mapContainer, {
          zoom: 15,
          center,
        });

        new window.google.maps.Marker({
          position: center,
          map,
          title: currentOrder?.address?.[0]?.location || formatAddress(currentOrder.address),
          animation: window.google.maps.Animation.DROP,
        });
      } else {
        // fallback to geocoding
        const geocoder = new window.google.maps.Geocoder();
        const fullAddress = formatAddress(currentOrder.address);

        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK" && results[0]) {
            const center = results[0].geometry.location;

            setLatLngMap((prev) => ({
              ...prev,
              [openMapId]: { lat: center.lat(), lng: center.lng() },
            }));

            const map = new window.google.maps.Map(mapContainer, {
              zoom: 15,
              center,
            });

            new window.google.maps.Marker({
              position: center,
              map,
              title: fullAddress,
              animation: window.google.maps.Animation.DROP,
            });
          } else {
            console.error("Geocode failed:", status);
          }
        });
      }
    };

    initMap();
  }, [openMapId, userorder]);

  return (
    <div className="user-ke-orders-container">
      <h2 className="user-ke-orders-title">All Orders ({userorder.length})</h2>

      <div className="user-ke-orders-table-wrapper">
        <table className="user-ke-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>walletUsed</th>
              <th>pgUsed</th>
              <th>refundToWallet</th>
              <th>refundToPG</th>
              <th>totalOrderAmount</th>
              <th>merchantOrderId</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Location</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Products</th>
              <th>Product image</th>
              <th>Time Slot</th>
              <th>ModeOfPayment</th>

              <th>Total Price</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Actions</th>
              <th>Show Address Map</th>
            </tr>
          </thead>
          <tbody>
            {userorder.map((order) => {
              const fullAddress = formatAddress(order.address);
              const latLng = latLngMap[order._id] || {
                lat: order?.address?.[0]?.lat || "",
                lng: order?.address?.[0]?.lng || "",
              };

              return (
                <React.Fragment key={order._id}>
                  <tr>
                    <td>{order?._id}</td>
                    <td>{order?.userId}</td>
                    <td>{order?.walletUsed}</td>
                    <td>{order?.pgUsed}</td>
                    <td>{order?.refundToWallet}</td>
                    <td>{order?.refundToPG}</td>
                    <td>{order?.totalOrderAmount}</td>
                    <td>{order?.merchantOrderId}</td>
                    <td>{order?.address[0]?.uname}</td>
                    <td>{order?.address[0]?.phone?.[0]}</td>
                    <td>{fullAddress}</td>
                    <td>{order?.address[0]?.location || ""}</td>
                    <td>{latLng.lat}</td>
                    <td>{latLng.lng}</td>

                    <td>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          <b>{product.tag}</b> - {product.size} ({product.quantity}x) - ₹
                          {product.discountprice}
                        </div>
                      ))}
                    </td>

                    <td>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          <img
                            onClick={() => toggleZoom(product.image[0])}
                            style={{
                              width: "150px",
                              height: "150px",
                              cursor: "pointer",
                              objectFit: "cover",
                            }}
                            src={product.image[0]}
                            alt=""
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </td>
<td>{order?.timeslot || "N/A"}</td>
<td>{order?.paymentmode || "N/A"}</td>

                    <td>
                      ₹{order.products.reduce((acc, p) => acc + p.totalAmount, 0)}
                    </td>

                    <td className={`user-ke-orders-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </td>

                    <td>{new Date(order.orderedAt).toLocaleString()}</td>

                    <td>
                      {order.status === "Returned Requested" ? (
                        <>
                          <button
                            className="user-ke-orders-btn"
                            onClick={() =>
                              markAsDelivered(order._id, "Returned Approved")
                            }
                          >
                            Returned Approved
                          </button>
                          <button
                            className="user-ke-orders-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              markAsDelivered(order._id, "Returned Rejected")
                            }
                          >
                            Returned Rejected
                          </button>
                        </>
                      ) : order.status === "Refund Processed" ? (
                        <>
                          <button
                            className="user-ke-orders-btn"
                            onClick={() =>
                              markAsDelivered(order._id, "Refund Approved")
                            }
                          >
                            Refund Approved
                          </button>
                          <button
                            className="user-ke-orders-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              markAsDelivered(order._id, "Refund Rejected")
                            }
                          >
                            Refund Rejected
                          </button>
                        </>
                      ) : (
                        <button
                          className="user-ke-orders-btn"
                          onClick={() => markAsDelivered(order._id)}
                        >
                          Update Status
                        </button>
                      )}
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

                  {openMapId === order._id && (
                    <tr>
                      <td colSpan="21">
                        <div
                          id={`map-${order._id}`}
                          style={{
                            width: "100%",
                            height: "300px",
                            borderRadius: "10px",
                            marginTop: "10px",
                          }}
                        ></div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {zoomedImage && (
          <div
            className="zoomed-image-overlay"
            onClick={() => setZoomedImage(null)}
          >
            <img src={zoomedImage} alt="Zoomed" className="zoomed-image" loading="lazy" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordersofusers;
