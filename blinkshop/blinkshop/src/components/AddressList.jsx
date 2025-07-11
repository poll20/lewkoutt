
import React, { useEffect, useState } from "react";
import "./AddressList.css";
import { useAuth } from "./AuthContext";
import { HiH1 } from "react-icons/hi2";
import { useBio } from "./BioContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { use } from "react";
import { useFirebaseAuth } from "./FirebaseContext";

const AddressList = ({loc}) => {
  
  const [otp, setOtp] = useState(""); // ✅ State for OTP inputefefe
const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent
  const {handlenewaddress,handlechooseaddress,deleteandeditaddrress,setshowmeaddress}=useBio()
  const [pincode, setPincode] = useState("");
  const[uname,setUname]=useState("")
  const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [locality, setLocality] = useState("");
    const[city,setCity]=useState("")
    const[state,setState]=useState("")
    const [location, setLocation] = useState("Click to get location");
    const [isDefault, setIsDefault] = useState(false);
   const [chooseaddress,setchooseaddress]=useState([])
   const[showaddresspanel,setshowadresspanel]=useState("")
   const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false);
   const[fireuser,setfireuser]=useState([])
   const [actionss,setaction]=useState()
    const navigate=useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(null);
  
//  const{user,userDetails, fetchUserDetails }=useAuth()
const{user,userDetails, fetchUserDetails }=useFirebaseAuth()
const [userprf,setuserprf]=useState({ address: [] })
const [editingAddressId, setEditingAddressId] = useState(null); // Track which one is being edited
const [editedAddress, setEditedAddress] = useState({}); // Temp store for editing
const {sec}=useParams()
 useEffect(()=>{
  if(userDetails && user){
    console.log("uer",userDetails)
    setuserprf(userDetails)
    setfireuser(user)
  }
 },[userDetails,user])



 const addressinputcontainer=(bool,pnl)=>{
  console.log("Function Executed", bool, pnl);  // ✅ Check if this logs

  setIsAddressPanelOpen(bool)
  setshowadresspanel(pnl)

 }



// Function to handle saving the address
const saveAddress =async (panel) => {
  console.log("panel",panel)
  console.log("panel",pincode,building,locality,city,state)
  const newAddress = {
    pincode,
    phone,
    building,
    locality,
    city,
    state,
    isDefault,
  }
  if(panel=="addaddress")
  { 
  if(newAddress && user){
    console.log("adddfrr",newAddress)
  await handlenewaddress(newAddress,userDetails)
  }

 
}
else if(panel=="edit"){
  if(newAddress){
    console.log("lop",actionss,panel)
   await deleteandeditaddrress(actionss,panel,userDetails,newAddress)
  await  fetchUserDetails(fireuser)
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
        setUname(data.address.uname)
        setBuilding(data.address.city)
        setLocality(data.address.county)
        setPincode(data.address.postcode)
        setCity(data.address.city)
        setState(data.address.city)
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


const deleteoreditaddress=async(addressid,action,addr)=>{

 await deleteandeditaddrress(addressid,action,userDetails,addr)
 await  fetchUserDetails(fireuser)
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
let sendtoreturncom = () => {
  if (chooseaddress) {
    handlechooseaddress(chooseaddress); // Contex t u p d a t e   k a r o
     sessionStorage.setItem("comingBackFromAddress", "true");
     setshowmeaddress(false)
    // navigate(-1); // back to returnreques
  }
};

useEffect(() => {
  console.log("isAddressPanelOpen:", isAddressPanelOpen);
  console.log("showaddresspanel:", showaddresspanel);
}, [isAddressPanelOpen, showaddresspanel]);
  return (
    
      <div className="address-container" style={{backgroundColor:"white"}}>
        {userprf?.address?.length === 0 ? (
          <div style={{display:'flex',alignItems:'center',justifyContent:"space-between",backgroundColor:"white"}}>
          <h2>Address</h2>
          <NavLink to='/maps' className="navlink">
          <button className="add-addressss-buttonnnn"onClick={()=>{addressinputcontainer(true,"addaddress")}} style={{backgroundColor:"#F15A29"}}>+ Add Address</button>
          </NavLink>
          </div>
        ) : (
          <>
            <div className="address-header" style={{borderBottom:"1px solid gray"}}>
              <h2 style={{fontWeight:"bold",fontSize:"18px"}}>Select Address</h2>
              <NavLink to='/maps' className="navlink">
              <button className="add-addressss-buttonnnn" onClick={()=>{addressinputcontainer(true,"addaddress")}} style={{backgroundColor:"#F15A29",marginBottom:"10px"}}>+ Add Address</button>
              </NavLink>
            </div>
    
            {/* Address loop */}
            {/* {
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
            } */}
              <h2 style={{fontWeight:"bold",fontSize:"16px"}}>Saved Address</h2>

            { userprf?.address?.map((addr) => (
  <div className="address-card" key={addr._id}>
    <div className="custom-checkbox">
      <input
        type="radio"
        name="address"
        value={addr._id}
        onClick={() => setSelectedAddress(addr._id)}
      />
    </div>

    <div className="address-info">
      <p className="address-name">{addr?.uname}</p>

      {editingAddressId === addr._id ? (
        <>
           <input
            type="text"
            value={editedAddress.uname}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, uname: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={editedAddress.building}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, building: e.target.value })
            }
            placeholder="House/Flat/Block no."
          />
          <input
            type="text"
            value={editedAddress.locality}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, locality: e.target.value })
            }
            placeholder="Locality"
          />
          <input
            type="text"
            value={editedAddress.pincode}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, pincode: e.target.value })
            }
            placeholder="Pincode"
          />
          <input
            type="text"
            value={editedAddress.phone}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, phone: e.target.value })
            }
            placeholder="Phone"
          />
        </>
      ) : (
        <>
          <p className="address-details">
            Address: {addr.building} / {addr.locality}, {addr.city},{" "}
            {addr.state}
          </p>
          <p className="address-details">Pincode: {addr.pincode}</p>
          <p className="address-phone">Phone: {addr.phone}</p>
        </>
      )}

      {/* <p className="address-tip">
        <span>ℹ️</span> For better reach, include an alternate number
      </p> */}
    </div>

    <div className="address-actions">
      <button
        style={{border:"1px solid black",borderRadius:"5px",color:"black",padding:"5px 10px",textDecoration:'none'}}

        className="delete-button"
        onClick={() => deleteoreditaddress(addr._id, "delete", addr)}
      >
        Delete
      </button>

      {editingAddressId === addr._id ? (
        <button
        style={{border:"1px solid black",borderRadius:"5px",color:"black",padding:"5px 10px",textDecoration:'none'}}

          className="save-button edit-button" 
          onClick={() => {
            deleteoreditaddress(addr._id, "edit", {
              uname:editedAddress.uname,
              building: editedAddress.building,
              locality: editedAddress.locality,
              pincode: editedAddress.pincode,
              phone: editedAddress.phone,
              city: addr.city,
              state: addr.state,
              isDefault: addr.isDefault,
        });
            setEditingAddressId(null);
          }}
        >
          Save
        </button>
      ) : (
        <button
        style={{border:"1px solid black",borderRadius:"5px",padding:"5px 10px",color:"black",textDecoration:'none'}}
          className="edit-button"
          onClick={() => {
            setEditingAddressId(addr._id);
            setEditedAddress({
              uname:addr.uname,
              building: addr.building,
              locality: addr.locality,
              pincode: addr.pincode,
              phone: addr.phone,
              city:addr.city,
              state:addr.state
            });
          }}
        >
          Edit
        </button>
      )}
    </div>
  </div>
))}

          </>
        )}
        {
          userprf?.address?.length<=0?( <NavLink to='/' className='navlink'>
            <button className="back-to-home" style={{position:"absolute",bottom:"80px",left:"140px"}}>Back to home</button>
            </NavLink>):('')
        }
        {/* <NavLink to='/' className='navlink'>
        <button className="back-to-home" style={{position:"absolute",bottom:"80px",left:"140px"}}>Back to home</button>
        </NavLink> */}



        {/* <div className={isAddressPanelOpen ?("address-containerrr"):("addresspaneldisplaynul")}>
     

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
    </div> */}
    
    <div className="bottom-sheet" style={{ display:chooseaddress.length>0?('flex'):('none'),alignItems:"center",justifyContent:"center", borderRadius:'0',border:"none"}}>
        {loc!="return"?(<button className="buy-buttonss" style={{width:"390px",backgroundColor:"black",color:"white",border:"2px solid black",fontWeight:"500"}} onClick={()=>{sendtocheckout()}} >Checkout</button>):(<button className="buy-buttonss" style={{width:"390px",backgroundColor:"white",color:"black",border:"2px solid black",fontWeight:"500"}} onClick={()=>{sendtoreturncom()}} >Return Address</button>)}
       </div>
      </div>
  );

};

export default AddressList;
