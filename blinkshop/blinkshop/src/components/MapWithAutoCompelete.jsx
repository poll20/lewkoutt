import React, { useEffect, useRef, useState } from "react";
import { useBio } from "./BioContext";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";

import { FaHome, FaBriefcase, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import "./mapaddress.css";

const MapWithAutocomplete = () => {
  const [selectedAddresss, setSelectedAddresss] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
  const inputRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { handlenewaddress, handlechooseaddress, deleteandeditaddrress } = useBio();
  const { user, userDetails, fetchUserDetails } = useFirebaseAuth();
  const navigate = useNavigate();

  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  const [pincode, setPincode] = useState("");
  const [uname, setUname] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [touched, setTouched] = useState({});

  const tags = [
    { label: "Home", icon: <FaHome /> },
    { label: "Work", icon: <FaBriefcase /> },
    { label: "Friends and Family", icon: <FaUsers /> },
    { label: "PG/Hostel", icon: <FaMapMarkerAlt /> },
  ];

  // Save Address Function
  const saveAddress = async () => {
    // if (!latLng.lat || !latLng.lng) {
    //   alert("Please select a location on the map");
    //   return;
    // }
    //  if (
    //   !uname.trim() ||
    //   !phone.trim() ||
    //   !building.trim() ||
    //   !locality.trim() ||
    //   !city.trim() ||
    //   !state.trim() ||
    //   !pincode.trim() ||
    //   !latLng.lat ||
    //   !latLng.lng
    // ) {
    //   alert("⚠️ Please fill all fields before saving the address.");
    //   return;
    // }
    if (
    !uname.trim() ||
    !phone.trim() ||
    !building.trim() ||
    !locality.trim() ||
    !city.trim() ||
    !state.trim() ||
    !pincode.trim() ||
    !selectedAddresss.trim()
  ) {
    alert("⚠️ Please fill all fields before saving the address.");
    return;
  }


    const newAddress = {
      uname,
      phone,
      building,
      locality,
      city,
      state,
      pincode,
      saveas: selectedTag,
      location: selectedAddresss,
      isDefault,
      lat: latLng.lat,
      lng: latLng.lng,
    };

    await handlenewaddress(newAddress, userDetails);
    await fetchUserDetails(user);

    navigate("/address/map");
  };

  // Helper: extract pincode
  const extractPincode = (addressComponents) => {
    const pinObj = addressComponents.find((comp) =>
      comp.types.includes("postal_code")
    );
    return pinObj ? pinObj.long_name : "";
  };

  // Reverse geocode to get address from lat/lng
  const reverseGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addr = results[0].address_components;
        setSelectedAddresss(results[0].formatted_address);
        setPincode(extractPincode(addr));
        setCity(addr.find(c => c.types.includes("administrative_area_level_2"))?.long_name || "");
        setState(addr.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "");
        setShowPhoneInput(true);
      }
    });
  };

  // Initialize Google Maps
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

      // Update lat/lng on drag
      markerRef.current.addListener("dragend", () => {
        const pos = markerRef.current.getPosition();
        setLatLng({ lat: pos.lat(), lng: pos.lng() });
        reverseGeocode(pos.lat(), pos.lng());
      });

      // Autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "in" },
      });
      autocomplete.setFields(["place_id", "geometry", "formatted_address", "address_components"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const loc = place.geometry.location;
        mapInstance.current.setCenter(loc);
        mapInstance.current.setZoom(16);
        markerRef.current.setPosition(loc);

        setLatLng({ lat: loc.lat(), lng: loc.lng() });
        setSelectedAddresss(place.formatted_address);

        const addr = place.address_components;
        setPincode(addr.find(c => c.types.includes("postal_code"))?.long_name || "");
        setCity(addr.find(c => c.types.includes("administrative_area_level_2"))?.long_name || "");
        setState(addr.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "");
        setShowPhoneInput(true);
      });
    };

    const loadGoogleMaps = async () => {
      if (!window.google) {
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        );
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          initMap(loc);
          setLatLng(loc);
        },
        () => initMap({ lat: 26.9124, lng: 75.7873 }) // default Jaipur
      );
    };

    loadGoogleMaps();
  }, []);

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const isFieldEmpty = (value) => value.trim() === "";
  const isFormValid =
    !isFieldEmpty(pincode) &&
    !isFieldEmpty(phone) &&
    !isFieldEmpty(building) &&
    !isFieldEmpty(locality) &&
    !isFieldEmpty(uname);

  return (
    <div style={{ padding: "10px", marginTop: "60px", fontFamily: "sans-serif" }}>
      <input
        ref={inputRef}
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
 
 <div style={{display:"flex",flexDirection:"column", textAlign: "center",marginBottom: "8px" }}>
      <h6 style={{ textAlign: "center", marginBottom: "10px" }}>
        Drag <FaMapMarkerAlt color="red" /> to select your location
      </h6>
      <span>Please make sure your location is on</span>
      </div>

      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "12px", border: "2px solid #ccc" }}
      ></div>

      {selectedAddresss && (
        <div style={{ marginTop: "10px" }}>
          <p style={{ padding: "10px", background: "#f4f4f4", borderRadius: "8px" }}>
            Selected: <strong>{selectedAddresss}</strong> <br />
            Pincode: <strong>{pincode}</strong> <br />
            Lat: <strong>{latLng.lat}</strong>, Lng: <strong>{latLng.lng}</strong>
          </p>

          {showPhoneInput && (
            <div className="address-containerrr">
              <div className="address-form">
                <input
                  type="text"
                  placeholder="Full Name*"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  onBlur={() => handleBlur("uname")}
                />
                {touched.uname && isFieldEmpty(uname) && <p className="text-red-600 text-sm mt-1">This field is required</p>}

                <input
                  type="text"
                  placeholder="Phone no.*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => handleBlur("phone")}
                />
                {touched.phone && isFieldEmpty(phone) && <p className="text-red-600 text-sm mt-1">This field is required</p>}

                <input
                  type="text"
                  placeholder="Flat no / building name*"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  onBlur={() => handleBlur("building")}
                />
                {touched.building && isFieldEmpty(building) && <p className="text-red-600 text-sm mt-1">This field is required</p>}

                <input
                  type="text"
                  placeholder="Locality / Area / Street*"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  onBlur={() => handleBlur("locality")}
                />
                {touched.locality && isFieldEmpty(locality) && <p className="text-red-600 text-sm mt-1">This field is required</p>}

                <input
                  type="text"
                  placeholder="City*"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => handleBlur("city")}
                />
                <input
                  type="text"
                  placeholder="State*"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onBlur={() => handleBlur("state")}
                />

                <div className="save-as-section">
                  <p>SAVE AS</p>
                  <div className="tag-buttons">
                    {tags.map((tag) => (
                      <button
                        key={tag.label}
                        className={`tag-button ${selectedTag === tag.label ? "selected" : ""}`}
                        onClick={() => setSelectedTag(tag.label)}
                      >
                        {tag.icon} {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="default-address">
                  <span>⭐ Set as Default Address</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={() => setIsDefault(!isDefault)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                {/* <button
                  className={`save-address ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={saveAddress}
                  disabled={!isFormValid}
                >
                  Save my address
                </button> */}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
  <button
    className={`save-address ${
      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={saveAddress}
    disabled={!isFormValid}
  >
    Save my address
  </button>

  {/* 🔴 Error message when button disabled */}
  {!isFormValid && (
    <p
      style={{
        color: "red",
        fontSize: "14px",
        marginTop: "6px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      ⚠️ Please fill all the fields before saving the address.
    </p>
  )}
</div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapWithAutocomplete;
