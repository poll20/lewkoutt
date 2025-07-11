import React, { useState } from "react";
import "./AddAddress.css"; // Import CSS for styling

const AddAddress = () => {
  const [pincode, setPincode] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
      const [state, setState] = useState("");
  const [isDefault, setIsDefault] = useState(false);


  

  return (
    <div className="address-container">
      <h2 className="address-title">Add Your Address</h2>

      <div className="address-form">
        <h3 className="section-title">Address Information</h3>

        <button className="use-location">Use my location</button>

        <input
          type="text"
          placeholder="Pincode*"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Flat no / building name*"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        <input
          type="text"
          placeholder="Locality / Area / Street*"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
        />
         <input
          type="text"
          placeholder="Locality / Area / Street*"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
         <input
          type="text"
          placeholder="Locality / Area / Street*"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        {/* <div className="city-state">
          <input type="text" value="Jaipur" readOnly />
          <input type="text" value="Rajasthan" readOnly />
        </div> */}

        

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

        <button className="save-address">Save my address</button>
      </div>
    </div>
  );
};

export default AddAddress;
