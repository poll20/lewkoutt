// import React, { useEffect, useRef, useState } from "react";

// const MapWithAutocomplete = () => {
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const mapInstance = useRef(null);

//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     const loadScript = (url) =>
//       new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = url;
//         script.async = true;
//         script.defer = true;
//         script.onload = resolve;
//         document.body.appendChild(script);
//       });

//     const initMap = (location) => {
//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: location,
//         zoom: 15,
//       });

//       markerRef.current = new window.google.maps.Marker({
//         position: location,
//         map: mapInstance.current,
//         draggable: true,
//       });

//       const input = document.getElementById("autocomplete");

//       const autocomplete = new window.google.maps.places.Autocomplete(input, {
//         types: ["geocode"],
//         componentRestrictions: { country: "in" },
//       });

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         if (place.geometry && place.geometry.location) {
//           const loc = place.geometry.location;
//           mapInstance.current.setCenter(loc);
//           mapInstance.current.setZoom(16);
//           markerRef.current.setPosition(loc);
//           setSelectedAddress(place.formatted_address);
//         }
//       });

//     markerRef.current.addListener("dragend", () => {
//         const pos = markerRef.current.getPosition();
//         const geocoder = new window.google.maps.Geocoder();
      
//         geocoder.geocode({ location: pos }, (results, status) => {
//           if (status === "OK" && results[0]) {
//             setSelectedAddress(results[0].formatted_address);
//           } else {
//             console.error("Reverse geocoding failed:", status);
//           }
//         });
      
//         console.log("Dragged to:", pos.lat(), pos.lng());
//       });
      
//     };

//     const loadGoogleMaps = async () => {
//         if (!window.google) {
//           await loadScript(
//             `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
//           );
      
//           const waitForGoogle = () =>
//             new Promise((resolve) => {
//               const interval = setInterval(() => {
//                 if (window.google && window.google.maps) {
//                   clearInterval(interval);
//                   resolve();
//                 }
//               }, 100);
//             });
      
//           await waitForGoogle();
//         }
      
//         // Now safe to use google.maps
//         navigator.geolocation.getCurrentPosition(
//           (pos) => {
//             const location = {
//               lat: pos.coords.latitude,
//               lng: pos.coords.longitude,
//             };
//             initMap(location);
//           },
//           (err) => {
//             console.warn("Geolocation failed, defaulting to Jaipur:", err.message);
//             initMap({ lat: 26.9124, lng: 75.7873 }); // Jaipur fallback
//           }
//         );
//       };
      

//     loadGoogleMaps();
//   }, []);

//   return (
//     <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
//       <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
//         📍 Google Map with Autocomplete + Current Location
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

//       {selectedAddress && (
//         <p
//           style={{
//             marginTop: "10px",
//             padding: "10px",
//             background: "#f4f4f4",
//             borderRadius: "8px",
//           }}
//         >
//           Selected: <strong>{selectedAddress}</strong>
//         </p>
//       )}
//     </div>
//   );
// };

// export default MapWithAutocomplete;


import React, { useEffect, useRef, useState } from "react";

const MapWithAutocomplete = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadScript = (url) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const extractPincode = (addressComponents) => {
      const pinObj = addressComponents.find((comp) =>
        comp.types.includes("postal_code")
      );
      return pinObj ? pinObj.long_name : "";
    };

    const reverseGeocode = (lat, lng) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const formattedAddress = results[0].formatted_address;
          const pincodeValue = extractPincode(results[0].address_components);
          setSelectedAddress(formattedAddress);
          setPincode(pincodeValue);
          setShowPhoneInput(true);
        } else {
          console.error("Reverse geocoding failed:", status);
        }
      });
    };

    const initMap = (location) => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: mapInstance.current,
        draggable: true,
      });

      const input = document.getElementById("autocomplete");

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const loc = place.geometry.location;
          mapInstance.current.setCenter(loc);
          mapInstance.current.setZoom(16);
          markerRef.current.setPosition(loc);

          const pincodeValue = extractPincode(place.address_components);
          setSelectedAddress(place.formatted_address);
          setPincode(pincodeValue);
          setShowPhoneInput(true);
        }
      });

      markerRef.current.addListener("dragend", () => {
        const pos = markerRef.current.getPosition();
        reverseGeocode(pos.lat(), pos.lng());
      });
    };

    const loadGoogleMaps = async () => {
      if (!window.google) {
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`
        );
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          initMap(location);
        },
        (err) => {
          console.warn("Geolocation failed, defaulting to Jaipur:", err.message);
          initMap({ lat: 26.9124, lng: 75.7873 });
        }
      );
    };

    loadGoogleMaps();
  }, []);

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        📍 Google Map with Autocomplete + Current Location
      </h3>

      <input
        id="autocomplete"
        placeholder="Enter your address"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "12px",
          border: "2px solid #ccc",
        }}
      ></div>

      {selectedAddress && (
        <div style={{ marginTop: "10px" }}>
          <p
            style={{
              padding: "10px",
              background: "#f4f4f4",
              borderRadius: "8px",
            }}
          >
            Selected: <strong>{selectedAddress}</strong> <br />
            Pincode: <strong>{pincode}</strong>
          </p>

          {showPhoneInput && (
            <>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />

              <button
                onClick={() =>
                  alert(
                    `Address: ${selectedAddress}\nPincode: ${pincode}\nPhone: ${phone}`
                  )
                }
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add Address
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapWithAutocomplete;
