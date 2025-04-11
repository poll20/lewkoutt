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
import { FaBox } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
  const [userprf,setuserprf]=useState([])
  let {user,userDetails, handleLogout ,logout}=useAuth()
  let [popup,setPopup]=useState(false)
let navigate=useNavigate()
  useEffect(()=>{ 
    
    if(user && userDetails){
    setuserprf(userDetails)

  }},[user])
 
  if(userDetails){
    // console.log("lolokii",userprf)
    console.log("lolokii",userDetails)
  }

  const openPopup = (id,prd) => {
    setPopup(true);
    // setPopupProductId(id); // Save the specific product ID for the popup
    // setwowalaprd(prd)
  };

  const closePopup = () => {
    setPopup(false);
    // setPopupProductId(null);
  };
  return (
    <div className="profile-container">
      <h2>{userprf.name}</h2>
      <div className="scroll">
      <div className="profile-header">
        <div className="profile-info">
          <AiOutlineUser className="profile-icon" />
          <div className="profile-details">
            <p>{userprf.email}<br />+91{userprf?.phone?.[0]}</p>
          </div>
        </div>
        <button className="profile-add-button">Add</button>
      </div>
      <div className="profile-balance">
        <div className="balance-item">
          <FaWallet />
          <p>Wallet Balance<br /><span>₹0</span></p>
        </div>
        <div className="balance-item">
          <FaUserFriends />
          <p>Referral Earnings<br /><span>₹0</span></p>
        </div>
      </div>
      <div className="profile-menu">
        <NavLink to={`/userorder`} className="menu-item navlink">
          <IoLogoDropbox/>
          <p>Orders</p>
          <IoIosArrowForward />
        </NavLink>
        <NavLink to={`/refferal`} className="menu-item navlink">
          <FaBox/>
          <p>Referrals</p>
          <IoIosArrowForward />
        </NavLink>
        
        <NavLink to={`/address`} className="menu-item navlink">
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
        <NavLink className="menu-item navlink">
          <RiLogoutBoxLine  onClick={() => openPopup()}/>
          <p onClick={() => openPopup()}>Logout</p>
          <IoIosArrowForward onClick={() => openPopup()}/>
        </NavLink>
        <NavLink to='/wallet' className="menu-item navlink">
          <RiLogoutBoxLine/>
          <p>Wallet</p>
          <IoIosArrowForward />
        </NavLink>
        <NavLink className="menu-item navlink"to={'/aboutus'} >
           LO
          <p>About Us</p>
          <IoIosArrowForward />
        </NavLink>
        {/* <NavLink className="menu-item navlink" to={'/faq'}>
           LO
          <p>F&Q</p>
          <IoIosArrowForward />
        </NavLink> */}
      </div>
      </div>
      <div className="bottom-sheet" style={{ display:popup==true?('flex'):('none'),alignItems:"center",justifyContent:"space-between", borderRadius:'0',border:"1px solid white"}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
         <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {logout();setTimeout(()=>{navigate("/loginn")},400)}}>Logout</button> 
        {/* <button className="buy-buttonss" style={{width:"140px"}} onClick={() => {addtowishlistonly(popupProductId);closePopup();}}></button> */}
       </div>
    </div>
  );
};

export default UserProfile;
