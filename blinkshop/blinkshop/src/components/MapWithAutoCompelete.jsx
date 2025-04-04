// import React, { useEffect, useRef, useState } from "react";

// const MapWithAutocompelete = () => {
//   const [address, setAddress] = useState("");
//   const mapRef = useRef(null);
//   const autoCompleteRef = useRef(null);
//   const markerRef = useRef(null);
//   const mapInstance = useRef(null);

//   const apiKey =import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 🔁 Replace with your API key

//   useEffect(() => {
//     const initMapScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
//         script.async = true;
//         script.onload = initMap;
//         document.body.appendChild(script);
//       } else {
//         initMap();
//       }
//     };

//     const initMap = () => {
//       const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Default (Delhi)
//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: defaultLocation,
//         zoom: 13,
//       });

//       markerRef.current = new window.google.maps.Marker({
//         position: defaultLocation,
//         map: mapInstance.current,
//         draggable: true,
//       });

//       autoCompleteRef.current = new window.google.maps.places.Autocomplete(
//         document.getElementById("autocomplete"),
//         {
//           types: ["geocode"],
//           componentRestrictions: { country: "in" },
//         }
//       );

//       autoCompleteRef.current.addListener("place_changed", () => {
//         const place = autoCompleteRef.current.getPlace();
//         if (place.geometry) {
//           const location = place.geometry.location;
//           mapInstance.current.setCenter(location);
//           mapInstance.current.setZoom(16);
//           markerRef.current.setPosition(location);
//           setAddress(place.formatted_address);
//         }
//       });

//       // Marker drag event to get lat/lng
//       markerRef.current.addListener("dragend", () => {
//         const pos = markerRef.current.getPosition();
//         console.log("Selected lat/lng:", pos.lat(), pos.lng());
//       });
//     };

//     initMapScript();
//   }, []);

//   return (
//     <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
//       <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
//         📍 Location Picker with Autocomplete
//       </h3>
//       <input
//         id="autocomplete"
//         placeholder="Enter your address"
//         style={{
//           width: "100%",
//           padding: "10px",
//           fontSize: "16px",
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//           marginBottom: "10px",
//         }}
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />

//       <div
//         ref={mapRef}
//         style={{
//           width: "100%",
//           height: "400px",
//           borderRadius: "12px",
//           border: "2px solid #ccc",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default MapWithAutocompelete;

import React, { useEffect, useRef, useState } from 'react';

const MapWithAutocomplete = () => {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 26.9124, lng: 75.7873 });
  const inputRef = useRef(null);

  useEffect(() => {
    const loader = new window.google.maps.places.Autocomplete(inputRef.current);
    loader.addListener('place_changed', () => {
      const place = loader.getPlace();
      const location = place.geometry?.location;
      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        setCoordinates({ lat, lng });
        mapRef.current.setCenter({ lat, lng });
        marker.setPosition({ lat, lng });
      }
    });

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 15,
    });
    mapRef.current = map;

    const marker = new window.google.maps.Marker({
      position: coordinates,
      map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

    marker.addListener('dragend', () => {
      const pos = marker.getPosition();
      if (pos) {
        setCoordinates({ lat: pos.lat(), lng: pos.lng() });
      }
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your address..."
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      ></div>
      <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
        📍 Selected Location: <br />
        Latitude: {coordinates.lat.toFixed(6)} <br />
        Longitude: {coordinates.lng.toFixed(6)}
      </div>
    </div>
  );
};

export default MapWithAutocomplete;
