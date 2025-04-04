
import React, { useEffect, useState } from "react";
import "./AddressList.css";
import { useAuth } from "./AuthContext";
import { HiH1 } from "react-icons/hi2";
import { useBio } from "./BioContext";
import { NavLink, useNavigate } from "react-router-dom";
const AddressList = () => {
  
  const [otp, setOtp] = useState(""); // ✅ State for OTP inputefefe
const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent
  const {handlenewaddress,handlechooseaddress,deleteandeditaddrress}=useBio()
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [locality, setLocality] = useState("");
    const [location, setLocation] = useState("Click to get location");
    const [isDefault, setIsDefault] = useState(false);
   const [chooseaddress,setchooseaddress]=useState([])
   const[showaddresspanel,setshowadresspanel]=useState("")
   const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);
   const [actionss,setaction]=useState()
    const navigate=useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(null);
 const{user,userDetails}=useAuth()
const [userprf,setuserprf]=useState({ address: [] })
 useEffect(()=>{
  if(userDetails){
    console.log("uer",userDetails)
    setuserprf(userDetails)
  }
 },[userDetails])



 const addressinputcontainer=(bool,pnl)=>{
  console.log("Function Executed", bool, pnl);  // ✅ Check if this logs

  setIsAddressPanelOpen(bool)
  setshowadresspanel(pnl)

 }



// Function to handle saving the address
const saveAddress = (panel) => {
  console.log("panel",panel)
  console.log("panel",pincode,building,locality)
  const newAddress = {
    pincode,
    phone,
    building,
    locality,
    city: "Jaipur",
    state: "Rajasthan",
    isDefault,
  }
  if(panel=="addaddress")
  {
  if(newAddress){
    console.log("adddfrr",newAddress)
    handlenewaddress(newAddress,userDetails)
  }

  // if (!otpSent) {
  //   // ✅ Step 1: Send OTP request
  //   console.log("Sending OTP to:", phone);
  //   handlenewaddress(newAddress, userDetails);
  //   setOtpSent(true);
  //   // alert("OTP sent! Please enter the OTP to verify.");
  // } else {  
  //   // ✅ Step 2: Verify OTP and Save Address
  //   console.log("Verifying OTP:", otp);
  //   handlenewaddress({ ...newAddress, otp }, userDetails);
  // }
//   if (!otpSent) {
//     console.log("Sending OTP to:", phone);
//     handlenewaddress(newAddress, userDetails);
//     setOtpSent(true);
// } else {
//     console.log("Verifying OTP:", otp);
//     if (!otp) {
//         alert("Please enter OTP before saving the address.");
//         return;
//     }
//     handlenewaddress({ ...newAddress, otp }, userDetails);
// }
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



  const addresses = [
    {
      id: 1,
      name: "Tanushree Goyal",
      isDefault: true,
      address: [
        "71/1 Shree Puram Colony, Gujar ki Thadi Shanti Nagar, Jaipur, 302019",
        "117 Geetanjali Colony, Salasar Enclave, Jaipur, 302020"
      ],
      phone: ["+918955345400", "8955345400"]
    }
  ]; 
  

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
  return (
    
      <div className="address-container">
        {userprf?.address?.length === 0 ? (
          <div style={{display:'flex',alignItems:'center',justifyContent:"space-between"}}>
          <h2>Address</h2>
          <button className="add-addressss-buttonnnn"onClick={()=>{addressinputcontainer(true,"addaddress")}}>+ Add Addddress</button>
          </div>
        ) : (
          <>
            <div className="address-header">
              <h2>Select Address</h2>
              <NavLink to='/maps' className="navlink">
              <button className="add-addressss-buttonnnn" onClick={()=>{addressinputcontainer(true,"addaddress")}}>+ Add Addressdd</button>
              </NavLink>
            </div>
    
            {/* Address loop */}
            {
              userprf?.address?.map((addr, index) => (
                <div className="address-card" key={`${addr._id}`}>
                  <div className="custom-checkbox">
                    <input
                      type="radio"
                      name="address"
                      value={addr._id}
                      onClick={() => setSelectedAddress(addr._id)}
                    />
                  </div>
                  <div className="address-info">
                    <p className="address-name">
                      {userprf.name}{" "}
                    </p>
                    <p className="address-details">Address: {addr.building} / {addr.locality} , {addr.city} , {addr.state}</p>
                    <p className="address-details">Pincode: {addr.pincode}</p>
                    <p className="address-phone">Phone: {addr.phone}</p>
                    <p className="address-tip">
                      <span>ℹ️</span> For better reach, include an alternate number
                    </p>
                  </div>
                  <div className="address-actions">
                    <button className="delete-button" onClick={()=>{deleteoreditaddress(addr._id ,"delete",addr)}}>Delete</button>
                    <button className="edit-button" onClick={()=>{setshowadresspanel("edit");setaction(addr._id)}}>Edit</button>
                  </div>
                </div>
              ))
            }
          </>
        )}
        <button className="back-to-home">Back to home</button>




        <div className={isAddressPanelOpen ?("address-containerrr"):("addresspaneldisplaynul")}>
      {/* <h2 className="address-title">Add Your Address</h2> */}

      <div className="address-form">
        <h3 className="section-title">Address Information</h3>

        <button className="use-location" onClick={getUserLocation}>{location?(location):('use my location')}</button>

        <input
          type="text"
          placeholder="Pincode*"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
         <input
          type="text"
          placeholder="Phone no.*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        {otpSent && (
  <input
    type="text"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
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

        <button className="save-address" onClick={()=>{saveAddress(showaddresspanel)}}>Save my address</button>
      </div>
    </div>
    
    <div className="bottom-sheet" style={{ display:chooseaddress.length>0?('flex'):('none'),alignItems:"center",justifyContent:"center", borderRadius:'0'}}>
        <button className="buy-buttonss" style={{width:"290px"}} onClick={()=>{sendtocheckout()}}>Buy Now</button>
       </div>
      </div>
  );

};

export default AddressList;
