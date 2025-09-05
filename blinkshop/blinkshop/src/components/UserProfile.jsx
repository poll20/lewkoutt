// import React, { useState } from "react";
// import "./UserProfile.css";
// import { useContext } from "react";
// import { useAuth } from "./AuthContext";
// import {
//   FaEdit,
//   FaTrashAlt,
//   FaChevronDown,
//   FaChevronUp,
//   FaEnvelope,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const UserProfile = () => {
//   const [showOrders, setShowOrders] = useState(false);
//   const [showAddresses, setShowAddresses] = useState(false);
//   const { userDetails,handleLogout } = useAuth()

//   const orders = [
//     "Order #1: 2 items - $50",
//     "Order #2: 1 item - $30",
//     "Order #3: 3 items - $75",
//   ];

//   const addresses = [
//     { id: 1, address: "123 Main St, City, Country" },
//     { id: 2, address: "456 Elm St, City, Country" },
//   ];

//   const toggleOrders = () => setShowOrders(!showOrders);
//   const toggleAddresses = () => setShowAddresses(!showAddresses);
// if(!userDetails){
//   return (
//     <div>please login to see the user profile</div>
//   )
// }
//   return (
//     <div className="premium-user-profile">
//       {/* Header Section */}
//       <div className="profile-header">
//         <h1>{userDetails.name}</h1>
//         <p>Your personal profile dashboard</p>
//       </div>

//       {/* User Details Section */}
//       <div className="details-section">
//         <h2>Profile Details</h2>
//         <div className="details-item">
//           <FaEnvelope className="icon" />
//           <span>{userDetails.email}</span>
//         </div>
//         <div className="details-item">
//           <FaPhoneAlt className="icon" />
//           <span>+123 456 7890</span>
//         </div>
//       </div>

//       {/* Orders Section */}
//       <div className="dropdown-section">
//       <NavLink to={`/userorder`}> 
//         <div className="dropdown-header" onClick={toggleOrders}>
//          <span>Orders</span>
//           {showOrders ? <FaChevronUp /> : <FaChevronDown />}
//         </div>
//         </NavLink>
//         {showOrders && (
//           <div className="dropdown-content">
//             {orders.map((order, index) => (
//               <div key={index} className="dropdown-item">
//                 <span>{order}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Addresses Section */}
//       <div className="dropdown-section">
//         <NavLink to={`/address`}>
//         <div className="dropdown-header" onClick={toggleAddresses}>
//           <span>Addresses</span>
//           <FaChevronDown />
//         </div>
//         </NavLink>
        
//       </div>

//       <div className="dropdown-section">
//         <NavLink to={`/refferal`}>
//         <div className="dropdown-header" onClick={toggleAddresses}>
//           <span>Refferal</span>
//            <FaChevronDown />
//         </div>
//         </NavLink>
        
//       </div>

//       <div className="dropdown-section">
//         <div className="dropdown-header" onClick={toggleAddresses}>
//           <span>Help & Support</span>
//           {showAddresses ? <FaChevronUp /> : <FaChevronDown />}
//         </div>
//         {showAddresses && (
//           <div className="dropdown-content">
//             {addresses.map((address) => (
//               <div key={address.id} className="dropdown-item">
//                 <span>{address.address}</span>
//                 <div className="actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() => alert(`Edit Address: ${address.id}`)}
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => alert(`Delete Address: ${address.id}`)}
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <button onClick={()=>{handleLogout()}}>log out</button>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { FaWallet, FaUserFriends } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogoDropbox} from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
// import { FaBox } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
// import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from './FirebaseContext';

const UserProfile = () => {
  const [userprf,setuserprf]=useState([])
  // let {logout}=useAuth()
  let {user,userDetails,logout,addnameemail}=useFirebaseAuth()
  let [popup,setPopup]=useState(false)
  const [showOverlayForm, setShowOverlayForm] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  dob: '',
});
let navigate=useNavigate()
  useEffect(()=>{ 
    
    if(user && userDetails){
    setuserprf(userDetails)

  }},[user])
 
  if(userDetails){
    // console.log("lolokii",userprf)
    console.log("lolokii",userDetails)
  }

  // const openPopup = (id,prd) => {
  //   setPopup(true);
  //   // setPopupProductId(id); // Save the specific product ID for the popup
  //   // setwowalaprd(prd)
  // };

  // const closePopup = () => {
  //   setPopup(false);
  //   // setPopupProductId(null);
  // };
  let logouttheuser=async()=>{
    
        const { success, user, error } = await logout();
        if (success) {
        setTimeout(() => {
            navigate("/loginn")
        }, 200);
        } else {
        setError(error || "failed logout");
        }
  }
  let sendtofirebase=()=>{
    console.log("call hua mai bhiii",formData)
    if(userDetails){
    addnameemail(formData,userDetails._id)
    }
    setTimeout(()=>{
      setShowOverlayForm(false)
    },200)
  }
  return (
    <div className="profile-container">
      <h2>{userDetails.name}</h2>
      <div className="scroll">
      {/* <div className="profile-header">
        <div className="profile-info">
          <AiOutlineUser className="profile-icon" />
          <div className="profile-details">
            <p>{userDetails.email}<br />{userDetails.phonenumber}</p>
          </div>
        </div>
        <button className="profile-add-button"onClick={() => setShowOverlayForm(true)}>Add</button>
      </div> */}
      <div className="profile-header">
  <div className="profile-info">
    <AiOutlineUser className="profile-icon" />
    <div className="profile-details">
      <p>{userDetails.email}<br />{userDetails.phonenumber}</p>
    </div>
  </div>
  {
    (!userDetails.name || !userDetails.email) ? (
      <button className="profile-add-button" onClick={() => {
        setFormData({ name: '', email: '', dob: '' });
        setShowOverlayForm(true);
      }}>Add</button>
    ) : (
      <button className="profile-add-button" onClick={() => {
        setFormData({ name: userDetails.name, email: userDetails.email, dob: userDetails.dob || '' });
        setShowOverlayForm(true);
      }}>Edit</button>
    )
  }
</div>
      <div className="profile-balance">
        <NavLink to="/wallet"  className="balance-item navlink">
          <FaWallet />
          <p>Wallet Balance<br /><span>₹0</span></p>
        </NavLink>
      
        {/* <div className="balance-item">
          <FaUserFriends />
          <p>Referral Earnings<br /><span>₹0</span></p>
        </div> */}
      </div>
      <div className="profile-menu">
        <NavLink to={`/userorder`} className="menu-item navlink">
          <IoLogoDropbox/>
          <p>Orders</p>
          <IoIosArrowForward />
        </NavLink>
        {/* <NavLink to={`/refferal`} className="menu-item navlink">
          <FaBox/>
          <p>Referrals</p>
          <IoIosArrowForward />
        </NavLink> */}
        
        <NavLink to={`/address/upp`} className="menu-item navlink">
          <IoHome/>
          <p>Address</p>
          <IoIosArrowForward />
        </NavLink>
        <NavLink className="menu-item navlink">
          <FaShop/>
          <p>Coupon</p>
          <IoIosArrowForward />
        </NavLink>
        <NavLink className="menu-item navlink" to={'/faq'}>
          <BiHelpCircle/>
          <p>Help & Support</p>
          <IoIosArrowForward />
        </NavLink>
        {/* <NavLink className="menu-item navlink">
          <RiLogoutBoxLine  onClick={() => openPopup()}/>
          <p onClick={() => openPopup()}>Logout</p>
          <IoIosArrowForward onClick={() => openPopup()}/>
        </NavLink> */}
        {/* <NavLink to='/wallet' className="menu-item navlink">
          <RiLogoutBoxLine/>
          <p>Wallet</p>
          <IoIosArrowForward />
        </NavLink> */}
        <NavLink className="menu-item navlink"to={'/aboutus'} >
           LO
          <p>About Us</p>
          <IoIosArrowForward />
        </NavLink>
         <button onClick={() => {logouttheuser()}} style={{border:"1px solid gray",background:"white",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"50px"}} >
           
          Logout
          
        </button>
        {/* <NavLink className="menu-item navlink" to={'/faq'}>
           LO
          <p>F&Q</p>
          <IoIosArrowForward />
        </NavLink> */}
      </div>
      </div>
      {/* <div className="bottom-sheet" style={{ display:popup==true?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0',border:"1px solid white"}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
         <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {logouttheuser()}}>Logout</button> 
        
       </div> */}
     
       {showOverlayForm && (
  <div className="overlay-form">
    <div className="form-container">
      <button className="close-btn" onClick={() => setShowOverlayForm(false)}>✖</button>
      <h2>Edit Profile</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    <div>
      <label htmlFor="" style={{color:"white"}}>DOB</label>
      <input
        type="date"
        
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      
      />
      </div>
      <button className="submit-btn" onClick={() => sendtofirebase()}>Submit</button>
    </div>
  </div>
)}

    </div>
  );
};

export default UserProfile;
