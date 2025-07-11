


import React, { useEffect, useRef, useState } from "react";
import { useBio } from "./BioContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";

import { FaHome, FaBriefcase, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import "./mapaddress.css"
const MapWithAutocomplete = () => {
  const [selectedAddresss, setSelectedAddresss] = useState("");
//   const [phone, setPhone] = useState("");
//   const [pincode, setPincode] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

 const {handlenewaddress,handlechooseaddress,deleteandeditaddrress}=useBio()
  const [otp, setOtp] = useState(""); // ✅ State for OTP inputefefe
 const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent
 
  const [pincode, setPincode] = useState("");
  const [uname, setUname] = useState("");

  const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    

    const [location, setLocation] = useState("Click to get location");
    const [isDefault, setIsDefault] = useState(false);
      const [selectedTag, setSelectedTag] = useState(""); // New state for Save As tag
   const [chooseaddress,setchooseaddress]=useState([])
   const[showaddresspanel,setshowadresspanel]=useState("")
   const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);
   const[fireuser,setfireuser]=useState([])
   const [actionss,setaction]=useState()
    const navigate=useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [touched, setTouched] = useState({});
//  const{user,userDetails, fetchUserDetails}=useAuth()
const{user,userDetails, fetchUserDetails}=useFirebaseAuth()
const [userprf,setuserprf]=useState({ address: [] })
const inputRef = useRef(null);
 useEffect(()=>{
  if(userDetails && user ){
    console.log("uer",userDetails)
    setuserprf(userDetails)
    setfireuser(user)
  }
 },[userDetails,user])

 const tags = [
    { label: "Home", icon: <FaHome /> },
    { label: "Work", icon: <FaBriefcase /> },
    { label: "Friends and Family", icon: <FaUsers /> },
    { label: "PG/Hostel", icon: <FaMapMarkerAlt  /> },
  ];


 const addressinputcontainer=(bool,pnl)=>{
  console.log("Function Executed", bool, pnl);  // ✅ Check if this logs

  setIsAddressPanelOpen(bool)
  setshowadresspanel(pnl)

 }



// Function to handle saving the address
const saveAddress =async  (panel) => {
  console.log("panel",panel)
  console.log("panel",pincode,building,locality)
  const newAddress = {
    pincode,
    uname,
    phone,
    building,
    locality,
    city,
    state,
    saveas:selectedTag,
    isDefault,
  }
  if(panel=="addaddress")
  {
  if(newAddress){
    console.log("adddfrr",newAddress)
  await handlenewaddress(newAddress,userDetails)
   await fetchUserDetails(fireuser); // ✅ Fetch latest user details
   
    setTimeout(() => {
        navigate("/address/map")
    }, 400);
  }

 
}
else if(panel=="edit"){
  if(newAddress){
    console.log("lop",actionss,panel)
    deleteandeditaddrress(actionss,panel,userDetails,newAddress)
    setshowadresspanel("")
    return
  }
}  
  setshowadresspanel("")
}



const getUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let data = await response.json();
        setBuilding(data.address.city)
        setLocality(data.address.county)
        setPincode(data.address.postcode)
         setPincode(data.address.city)
          setPincode(data.address.state)
        setTimeout(()=>{saveAddress("addaddress")},600)
       console.log("loda",data.address.city)
        setLocation(data.display_name);
        
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.log("Geolocation not supported");
  }
};


const deleteoreditaddress=(addressid,action)=>{

  deleteandeditaddrress(addressid,action,userDetails)
}



 

  useEffect(()=>{
    if(selectedAddress){
  
      console.log("aws",selectedAddress)   
       let a=userprf?.address?.filter((e)=>(e._id==selectedAddress))
       console.log("sssll",a)
       setchooseaddress(a)
       
     }
  },[selectedAddress])


console.log("userprf:", userprf);
console.log("userprf.address:", userprf?.address);
console.log("userprf.address.length:", userprf?.address?.length);

useEffect(()=>{
  if(chooseaddress){
    console.log("chooseadd",chooseaddress)
  }
  
},[chooseaddress])


if (!userprf) {
  return <h2>Loading...</h2>;
}
let sendtocheckout = () => {
  if (chooseaddress) {
    handlechooseaddress(chooseaddress); // Contex t u p d a t e   k a r o
    navigate("/checkout"); // Data directly navigate ke saath bhejo
  }
};

useEffect(() => {
  console.log("isAddressPanelOpen:", isAddressPanelOpen);
  console.log("showaddresspanel:", showaddresspanel);
}, [isAddressPanelOpen, showaddresspanel]);

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
          setSelectedAddresss(formattedAddress);
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

      // const input = document.getElementById("autocomplete");
      const input = inputRef.current;


      // const autocomplete = new window.google.maps.places.Autocomplete(input, {
      //   types: ["geocode"],
      //   componentRestrictions: { country: "in" },
      // });
  const autocomplete = new window.google.maps.places.Autocomplete(input);
// autocomplete.setFields(["address_components", "formatted_address", "geometry"]);
autocomplete.setFields([
  "place_id",
  "geometry",
  "formatted_address",
  "name",
  "address_components"
]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const loc = place.geometry.location;
          mapInstance.current.setCenter(loc);
          mapInstance.current.setZoom(16);
          markerRef.current.setPosition(loc);

          const pincodeValue = extractPincode(place.address_components);
          setSelectedAddresss(place.formatted_address);
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
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
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


  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldEmpty = (fieldValue) => fieldValue.trim() === '';
  const isFormValid =
    !isFieldEmpty(pincode) &&
    !isFieldEmpty(phone) &&
    !isFieldEmpty(building) &&
    !isFieldEmpty(locality) &&
    (!otpSent || (otpSent && !isFieldEmpty(otp)));

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" ,marginTop:"60px" }}>
      <h6 style={{ textAlign: "center", marginBottom: "10px" }}>
        <FaMapMarkerAlt /> Drag this to select your location
      </h6>

      {/* <input
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
      /> */}

<input
  ref={inputRef}
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

      {selectedAddresss && (
        <div style={{ marginTop: "10px" }}>
          <p
            style={{
              padding: "10px",
              background: "#f4f4f4",
              borderRadius: "8px",
            }}
          >
            Selected: <strong>{selectedAddresss}</strong> <br />
            Pincode: <strong>{pincode}</strong>
          </p>

          {showPhoneInput && (
            <>
              {/* <input
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
              </button> */}
               {/* <div className="address-containerrr">
     

      <div className="address-form">
        <h3 className="section-title">Address Information</h3>


        <input
          type="text"
          placeholder="Pincode*"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="Phone no.*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Flat no / building name*"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Locality / Area / Street*"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          required
        />
        {otpSent && (
  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    required
  />
)}
        

        <div className="city-state">
          <input type="text" value="Jaipur" readOnly />
          <input type="text" value="Rajasthan" readOnly />
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

        <button className="save-address" onClick={()=>{saveAddress("addaddress")}}>Save my address</button>
      </div>
    </div> */}
    <div className="address-containerrr">
      <div className="address-form">
        <h3 className="section-title">Address Information</h3>

        <input
          type="text"
          placeholder="Pincode*"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          onBlur={() => handleBlur('pincode')}
        />
        {touched.pincode && isFieldEmpty(pincode) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
        <input
          type="text"
          placeholder="uname*"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          onBlur={() => handleBlur('pincode')}
        />
        {touched.pincode && isFieldEmpty(uname) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}

        <input
          type="text"
          placeholder="Phone no.*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => handleBlur('phone')}
        />
        {touched.phone && isFieldEmpty(phone) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}

        <input
          type="text"
          placeholder="Flat no / building name*"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          onBlur={() => handleBlur('building')}
        />
        {touched.building && isFieldEmpty(building) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}

        <input
          type="text"
          placeholder="Locality / Area / Street*"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          onBlur={() => handleBlur('locality')}
        />
        {touched.locality && isFieldEmpty(locality) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onBlur={() => handleBlur('otp')}
            />
            {touched.otp && isFieldEmpty(otp) && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </>
        )}

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={() => handleBlur('city')}
        />
        {touched.city && isFieldEmpty(city) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
        
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={() => handleBlur('state')}
        />
        {touched.locality && isFieldEmpty(state) && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
        {/* <div className="city-state">
          <input type="text" value="Jaipur" readOnly />
          <input type="text" value="Rajasthan" readOnly />
        </div> */}


 {/* Save As Section */}
        <div className="save-as-section">
          <p>SAVE AS</p>
          <div className="tag-buttons">
            {tags.map((tag) => (
              <button
                key={tag.label}
                className={`tag-button ${
                  selectedTag === tag.label ? "selected" : ""
                }`}
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

        <button
          className={`save-address ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => saveAddress('addaddress')}
          disabled={!isFormValid}
        >
          Save my address
        </button>
      </div>
    </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapWithAutocomplete;
