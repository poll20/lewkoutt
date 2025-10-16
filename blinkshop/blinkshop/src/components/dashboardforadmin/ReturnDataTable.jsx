// import React from "react";
// import { useDashboard } from "./DashboardContext";
// const ReturnDataTable = () => {
//   // Assume that returnData comes from your BioContext
//   const { returndata } = useDashboard();

//   if (!returndata || returndata.length === 0) {
//     return <p className="text-center mt-4">No return data available.</p>;
//   }

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {/* Table Headers */}
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transection Id</th>

//               {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th> */}
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>

//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered At</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered At</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subreason</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Option</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {returndata.map((item) => (
//               <tr key={item._id}>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item._id}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.userId}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.transectionId}</td>

//                 <td className="px-4 py-2 text-sm text-gray-900">{item.email}</td>
//                <td className="px-4 py-2 text-sm text-gray-900">
//   {Array.isArray(item.addressofreturn)
//     ? item.addressofreturn.map(addr => `${addr.street}, ${addr.city}`).join(" | ")
//     : `${item.addressofreturn.street}, ${item.addressofreturn.city}`}
// </td>

//                 <td className="px-4 py-2 text-sm text-gray-900">{item.address[0].phone}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {Array.isArray(item.products) ? (
//                     <ul className="list-disc list-inside">
//                       {item.products.map((prod, idx) => (
//                         <li key={idx}>
//                           <strong>Tag:</strong> {prod.tag} | <strong>Price:</strong> {prod.price} |{" "}
//                           <strong>Qty:</strong> {prod.quantity} | <strong>Size:</strong> {prod.size}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     item.products
//                   )}
//                 </td>
//               <td>
//   {item.imageofreturn.map((product, index) => (
//     <div key={index}>
//       <img
//         onClick={() => toggleZoom(product)}
//         style={{
//           width: "150px",
//           height: "150px",
//           cursor: "pointer",
//           objectFit: "cover",
//         }}
//         src={product}
//         alt=""
//         loading="lazy"
//       />
//     </div>
//   ))}
// </td>

               


//                 <td className="px-4 py-2 text-sm text-gray-900">{item.status}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {item.orderedAt && new Date(item.orderedAt).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {item.deliveredAt && new Date(item.deliveredAt).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {item.createdAt && new Date(item.createdAt).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.reason}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.subreason}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">{item.selectedOption}</td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {item.returnDate && new Date(item.returnDate).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-gray-900">
//                   {item.updatedAt && new Date(item.updatedAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReturnDataTable;




// import React, { useState, useEffect } from "react";
// import { useDashboard } from "./DashboardContext";

// const ReturnDataTable = () => {
//   const { returndata } = useDashboard();
//   const [openMapId, setOpenMapId] = useState(null);
//   const [zoomedImage, setZoomedImage] = useState(null);

//   const toggleZoom = (src) => {
//     setZoomedImage(zoomedImage === src ? null : src);
//   };

//   const formatAddress = (address) => {
//     if (!address) return "";
//     if (Array.isArray(address)) {
//       return address
//         .map(
//           (a) =>
//             `${a.building || ""} ${a.street || ""} ${a.locality || ""} ${a.pincode || ""} ${a.city || ""} ${a.state || ""}`
//         )
//         .join(" | ");
//     } else {
//       return `${address.building || ""} ${address.street || ""} ${address.locality || ""} ${address.pincode || ""} ${address.city || ""} ${address.state || ""}`;
//     }
//   };

//   // Load Google Maps API dynamically
//   const loadGoogleMaps = () => {
//     if (window.google && window.google.maps) return Promise.resolve();

//     return new Promise((resolve, reject) => {
//       const existingScript = document.querySelector(
//         `script[src^="https://maps.googleapis.com/maps/api/js"]`
//       );
//       if (existingScript) {
//         existingScript.addEventListener("load", resolve);
//         existingScript.addEventListener("error", reject);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
//       script.async = true;
//       script.defer = true;
//       script.onload = resolve;
//       script.onerror = reject;
//       document.body.appendChild(script);
//     });
//   };

//   useEffect(() => {
//     if (!openMapId) return;

//     const initMap = async () => {
//       await loadGoogleMaps();
//       const currentItem = returndata.find((item) => item._id === openMapId);
//       if (!currentItem) return;

//       const mapContainer = document.getElementById(`map-${openMapId}`);
//       if (!mapContainer) return;

//       const addr = Array.isArray(currentItem.addressofreturn)
//         ? currentItem.addressofreturn[0]
//         : currentItem.addressofreturn;

//       const lat = addr?.lat;
//       const lng = addr?.lng;

//       if (lat && lng) {
//         const center = new window.google.maps.LatLng(lat, lng);
//         const map = new window.google.maps.Map(mapContainer, { zoom: 15, center });
//         new window.google.maps.Marker({
//           position: center,
//           map,
//           title: addr?.location || formatAddress(currentItem.addressofreturn),
//           animation: window.google.maps.Animation.DROP,
//         });
//       }
//     };
//   }, [openMapId, returndata]);

//   if (!returndata || returndata.length === 0) {
//     return <p className="text-center mt-4">No return data available.</p>;
//   }

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>User ID</th>
//               <th>Transection ID</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Products</th>
//               <th>Images</th>
//               <th>Status</th>
//               <th>Ordered At</th>
//               <th>Delivered At</th>
//               <th>Created At</th>
//               <th>Reason</th>
//               <th>Subreason</th>
//               <th>Selected Option</th>
//               <th>Return Date</th>
//               <th>Updated At</th>
//               <th>Map</th>
//             </tr>
//           </thead>
//           <tbody>
//             {returndata.map((item) => (
//               <React.Fragment key={item._id}>
//                 <tr>
//                   <td>{item._id}</td>
//                   <td>{item.name}</td>
//                   <td>{item.userId}</td>
//                   <td>{item.transectionId}</td>
//                   <td>{item.email}</td>
//                   <td>
//                     {Array.isArray(item.addressofreturn)
//   ? item.addressofreturn
//       .map((addr) => 
//         `${addr?.building || ""}, ${addr?.locality || ""}, ${addr?.city || ""}, ${addr?.state || ""}, ${addr?.pincode || ""}`
//       )
//       .join(" | ")
//   : `${item.addressofreturn?.building || ""}, ${item.addressofreturn?.locality || ""}, ${item.addressofreturn?.city || ""}, ${item.addressofreturn?.state || ""}, ${item.addressofreturn?.pincode || ""}`}

//                   </td>
//                   <td>
//                     {Array.isArray(item.addressofreturn)
//                       ? item.addressofreturn[0]?.phone[0]
//                       : item.addressofreturn.phone[0]}
//                   </td>
//                   <td>
//                     {Array.isArray(item.products) &&
//                       item.products.map((prod, idx) => (
//                         <div key={idx}>
//                           {prod.tag} | {prod.price} | {prod.quantity} | {prod.size}
//                         </div>
//                       ))}
//                   </td>
//                   <td>
//                     {item.imageofreturn.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           cursor: "pointer",
//                           objectFit: "cover",
//                           marginRight: "5px",
//                         }}
//                         onClick={() => toggleZoom(img)}
//                         alt=""
//                       />
//                     ))}
//                   </td>
//                   <td>{item.status}</td>
//                   <td>{item.orderedAt && new Date(item.orderedAt).toLocaleString()}</td>
//                   <td>{item.deliveredAt && new Date(item.deliveredAt).toLocaleString()}</td>
//                   <td>{item.createdAt && new Date(item.createdAt).toLocaleString()}</td>
//                   <td>{item.reason}</td>
//                   <td>{item.subreason}</td>
//                   <td>{item.selectedOption}</td>
//                   <td>{item.returnDate && new Date(item.returnDate).toLocaleString()}</td>
//                   <td>{item.updatedAt && new Date(item.updatedAt).toLocaleString()}</td>
//                   <td>
//                     <button
//                       className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
//                       onClick={() => setOpenMapId(openMapId === item._id ? null : item._id)}
//                     >
//                       {openMapId === item._id ? "Hide Map" : "View on Map"}
//                     </button>
//                   </td>
//                 </tr>

//                 {openMapId === item._id && (
//                   <tr>
//                     <td colSpan="19">
//                       <div
//                         id={`map-${item._id}`}
//                         style={{ width: "100%", height: "300px", borderRadius: "10px", marginTop: "10px" }}
//                       ></div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>

//         {zoomedImage && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//             onClick={() => setZoomedImage(null)}
//           >
//             <img
//               src={zoomedImage}
//               alt="Zoomed"
//               style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReturnDataTable;






//3

import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "./DashboardContext";

const ReturnDataTable = () => {
  const {returndata } = useDashboard();
  const [openMapId, setOpenMapId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const mapRefs = useRef({}); // useRef for map containers

  const toggleZoom = (src) => setZoomedImage(zoomedImage === src ? null : src);

  const formatAddress = (address) => {
    if (!address || address.length === 0) return "N/A";
    const addr = Array.isArray(address) ? address[0] : address;
    return `${addr?.building || ""}, ${addr?.locality || ""}, ${addr?.city || ""}, ${addr?.state || ""}, ${addr?.pincode || ""}`;
  };

  const getPhone = (address) => {
    if (!address || address.length === 0) return "N/A";
    const addr = Array.isArray(address) ? address[0] : address;
    return Array.isArray(addr?.phone) && addr.phone.length > 0 ? addr.phone[0] : "N/A";
  };

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
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
      try {
        await loadGoogleMaps();
        const currentItem = returndata.find((item) => item._id === openMapId);
        if (!currentItem || !currentItem.addressofreturn?.[0]) return;

        const addr = currentItem.addressofreturn[0];
        if (!addr.lat || !addr.lng) return;

        // ensure container exists
        const mapContainer = mapRefs.current[openMapId];
        if (!mapContainer) return;

        // small delay to ensure container rendered properly
        setTimeout(() => {
          const center = new window.google.maps.LatLng(addr.lat, addr.lng);
          const map = new window.google.maps.Map(mapContainer, { zoom: 15, center });
          new window.google.maps.Marker({
            position: center,
            map,
            title: formatAddress(currentItem.addressofreturn),
          });
        }, 100);
      } catch (err) {
        console.error("Google Maps failed to load", err);
      }
    };

    initMap();
  }, [openMapId, returndata]);

  if (!returndata || returndata.length === 0)
    return <p className="text-center mt-4">No return data available.</p>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">User ID</th>
              <th className="border px-2 py-1">Transection ID</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Products</th>
              <th className="border px-2 py-1">Images</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Ordered At</th>
              <th className="border px-2 py-1">Delivered At</th>
              <th className="border px-2 py-1">Created At</th>
              <th className="border px-2 py-1">Reason</th>
              <th className="border px-2 py-1">Subreason</th>
              <th className="border px-2 py-1">Selected Option</th>
              <th className="border px-2 py-1">Return Date</th>
              <th className="border px-2 py-1">Updated At</th>
              <th className="border px-2 py-1">Map</th>
            </tr>
          </thead>
          <tbody>
            {returndata.map((item) => (
              <React.Fragment key={item._id}>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{item._id}</td>
                  <td className="border px-2 py-1">{item.name || item.addressofreturn?.[0]?.uname || "N/A"}</td>
                  <td className="border px-2 py-1">{item.userId || "N/A"}</td>
                  <td className="border px-2 py-1">{item.transectionId || "N/A"}</td>
                  <td className="border px-2 py-1">{item.email || "N/A"}</td>
                  <td className="border px-2 py-1">{formatAddress(item.addressofreturn)}</td>
                  <td className="border px-2 py-1">{getPhone(item.addressofreturn)}</td>
                  <td className="border px-2 py-1">
                    {item.products?.map((p, i) => (
                      <div key={i}>{`${p.tag} | ${p.price} | ${p.quantity} | ${p.size}`}</div>
                    ))}
                  </td>
                  <td className="border px-2 py-1 flex">
                    {item.imageofreturn?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-24 h-24 object-cover mr-2 rounded cursor-pointer"
                        onClick={() => toggleZoom(img)}
                        alt=""
                      />
                    ))}
                  </td>
                  <td className="border px-2 py-1">{item.status || "N/A"}</td>
                  <td className="border px-2 py-1">{item.orderedAt && new Date(item.orderedAt).toLocaleString()}</td>
                  <td className="border px-2 py-1">{item.deliveredAt && new Date(item.deliveredAt).toLocaleString()}</td>
                  <td className="border px-2 py-1">{item.createdAt && new Date(item.createdAt).toLocaleString()}</td>
                  <td className="border px-2 py-1">{item.reason || "N/A"}</td>
                  <td className="border px-2 py-1">{item.subreason || "N/A"}</td>
                  <td className="border px-2 py-1">{item.selectedOption || "N/A"}</td>
                  <td className="border px-2 py-1">{item.returnDate && new Date(item.returnDate).toLocaleString()}</td>
                  <td className="border px-2 py-1">{item.updatedAt && new Date(item.updatedAt).toLocaleString()}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => setOpenMapId(openMapId === item._id ? null : item._id)}
                    >
                      {openMapId === item._id ? "Hide Map" : "View Map"}
                    </button>
                  </td>
                </tr>

                {openMapId === item._id && (
                  <tr>
                    <td colSpan="19">
                      <div
                        ref={(el) => (mapRefs.current[item._id] = el)}
                        className="w-full h-72 mt-2 rounded"
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {zoomedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={() => setZoomedImage(null)}
          >
            <img src={zoomedImage} className="max-w-[90%] max-h-[90%] rounded shadow-lg" alt="Zoom" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnDataTable;
