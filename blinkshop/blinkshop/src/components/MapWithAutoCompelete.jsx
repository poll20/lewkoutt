    // import React, { useEffect, useRef, useState } from "react";

    // const MapWithAutocompelete = () => {
    // const [address, setAddress] = useState("");
    // const mapRef = useRef(null);
    // const autoCompleteRef = useRef(null);
    // const markerRef = useRef(null);
    // const mapInstance = useRef(null);

    // const apiKey =import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 🔁 Replace with your API key

    // useEffect(() => {
    //     const initMapScript = () => {
    //     if (!window.google) {
    //         const script = document.createElement("script");
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    //         script.async = true;
    //         script.onload = initMap;
    //         document.body.appendChild(script);
    //     } else {
    //         initMap();
    //     }
    //     };

    //     const initMap = () => {
    //     const defaultLocation = { lat: 26.9124, lng: 75.7873 }; // Default (Delhi)
    //     mapInstance.current = new window.google.maps.Map(mapRef.current, {
    //         center: defaultLocation,
    //         zoom: 13,
    //     });

    //     markerRef.current = new window.google.maps.Marker({
    //         position: defaultLocation,
    //         map: mapInstance.current,
    //         draggable: true,
    //     });

    //     autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //         document.getElementById("autocomplete"),
    //         {
    //         types: ["geocode"],
    //         componentRestrictions: { country: "in" },
    //         }
    //     );

    //     autoCompleteRef.current.addListener("place_changed", () => {
    //         const place = autoCompleteRef.current.getPlace();
    //         if (place.geometry) {
    //         const location = place.geometry.location;
    //         mapInstance.current.setCenter(location);
    //         mapInstance.current.setZoom(16);
    //         markerRef.current.setPosition(location);
    //         setAddress(place.formatted_address);
    //         }
    //     });

    //     // Marker drag event to get lat/lng
    //     markerRef.current.addListener("dragend", () => {
    //         const pos = markerRef.current.getPosition();
    //         console.log("Selected lat/lng:", pos.lat(), pos.lng());
    //     });
    //     };

    //     initMapScript();
    // }, []);

    // return (
    //     <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
    //     <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
    //         📍 Location Picker with Autocomplete
    //     </h3>
    //     <input
    //         id="autocomplete"
    //         placeholder="Enter your address"
    //         style={{
    //         width: "100%",
    //         padding: "10px",
    //         fontSize: "16px",
    //         borderRadius: "8px",
    //         border: "1px solid #ccc",
    //         marginBottom: "10px",
    //         }}
    //         value={address}
    //         onChange={(e) => setAddress(e.target.value)}
    //     />

    //     <div
    //         ref={mapRef}
    //         style={{
    //         width: "100%",
    //         height: "400px",
    //         borderRadius: "12px",
    //         border: "2px solid #ccc",
    //         }}
    //     ></div>
    //     {/* <p>{address}</p> */}
    //     </div>
    // );
    // };

    // export default MapWithAutocompelete;

    import React, { useEffect, useRef, useState } from "react";

const MapWithAutocomplete = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          loadWebComponent();
        };
        document.body.appendChild(script);
      } else {
        loadWebComponent();
      }
    };

    const loadWebComponent = () => {
      const componentScript = document.createElement("script");
      componentScript.src =
        "https://maps.googleapis.com/maps/api/js/webcomponent/loader.js";
      componentScript.async = true;
      componentScript.onload = () => {
        initMap();
      };
      document.body.appendChild(componentScript);
    };

    const initMap = () => {
      const defaultLocation = { lat: 26.9124, lng: 75.7873 }; // Jaipur

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 13,
      });

      markerRef.current = new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstance.current,
        draggable: true,
      });

      const autocomplete = document.querySelector("gmpx-placeautocomplete");

      autocomplete.addEventListener("gmpx-placeautocomplete:place", (e) => {
        const place = e.detail;
        if (place && place.geometry && place.geometry.location) {
          const loc = place.geometry.location;
          mapInstance.current.setCenter(loc);
          mapInstance.current.setZoom(16);
          markerRef.current.setPosition(loc);
          setSelectedPlace(place.formatted_address || place.displayName?.text);
        }
      });

      markerRef.current.addListener("dragend", () => {
        const pos = markerRef.current.getPosition();
        console.log("Dragged to:", pos.lat(), pos.lng());
      });
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        📍 Location Picker (with Google Maps Autocomplete)
      </h3>

      {/* Place Autocomplete Web Component */}
      <gmpx-placeautocomplete
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          display: "block",
        }}
        placeholder="Enter your address"
      ></gmpx-placeautocomplete>

      {/* Map Display */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "12px",
          border: "2px solid #ccc",
        }}
      ></div>

      {/* Address Display */}
      {selectedPlace && (
        <p
          style={{
            marginTop: "10px",
            background: "#f9f9f9",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          📌 Selected Address: <strong>{selectedPlace}</strong>
        </p>
      )}
    </div>
  );
};

export default MapWithAutocomplete;
