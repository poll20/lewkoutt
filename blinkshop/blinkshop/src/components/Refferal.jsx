// import React from "react";
// import "./Refferal.css";

// const Refferal = () => {
//   return (
//     <div className="referral-container">
//       <div className="referral-content">
//         <h1 className="referral-title">Refer & Earn Rewards!</h1>
//         <p className="referral-text">
//           Invite your friends and earn exclusive discounts on your next purchase.
//         </p>
//         <input
//           type="text"
//           placeholder="Enter your friend's email"
//           className="referral-input"
//         />
//         <button className="referral-button">Send Invite</button>
//         <p className="referral-note">
//           Share your referral code: <strong>ABC123</strong>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Refferal;

import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import img from "./image/rae.avif"
import { NavLink } from 'react-router-dom';
const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = '414A7U';
  const bannerImg = 'https://via.placeholder.com/600x200?text=Refer+Now'; // Replace this with your image
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [popup, setPopup] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const openPopup = (id,prd) => {
    setPopup(true);
    };

  const closePopup = () => {
    setPopup(false);
  };
let codeurl='https://lewkout.netlify.app/loginn?ref=abc123'

  return (
    <div
      style={{
        // border:"1px solid red",
        marginTop:"10px",
        marginBottom:"30px",
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        padding: '16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
        Refer Friends and Earn
      </div>

      {/* Banner */}
      <div style={{ width: '100%', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden' }}>
        <img
          src={img}
          alt="Refer Banner"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Earnings Overview */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        <div>
          <p style={{ color: '#ccc', margin: 0 }}>Total Earning</p>
          <p style={{ fontWeight: '600', margin: 0 }}>₹0</p>
        </div>
        <div>
          <p style={{ color: '#ccc', margin: 0 }}>Friend's Signup</p>
          <p style={{ fontWeight: '600', margin: 0 }}>0</p>
        </div>
      </div>

      {/* Main Info Box */}
      <div
        style={{
          backgroundColor: '#1e1e1e',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '16px',
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          🔥 Earn ₹500 for each friend you refer!!
        </p>
        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '12px' }}>
          Better to tell your friends about us before they find out on their own because this way
          you earn their trust, social capital and some reward points!
        </p>
        <ul
          style={{
            fontSize: '14px',
            color: '#ccc',
            paddingLeft: '20px',
            marginBottom: '12px',
          }}
        >
          <li>Share the referral code with your friends</li>
          <li>
            You and Your friend both{' '}
            <span style={{ fontWeight: '600', color: 'white' }}>get ₹500</span> when your friend
            places their first order using your referral code
          </li>
          <li>Redeemable on purchase of ₹999 and more</li>
        </ul>

        {/* Referral Code */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            border: '1px dashed #999',
            borderRadius: '8px',
            backgroundColor: 'black',
          }}
        >
          <span style={{ fontSize: '18px', letterSpacing: '2px' }}>{referralCode}</span>
          <button
            onClick={handleCopy}
            style={{
              color: 'white',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FaRegCopy size={20} />
          </button>
        </div>
        {copied && (
          <p style={{ color: 'lightgreen', fontSize: '13px', marginTop: '4px' }}>Copied!</p>
        )}
      </div>

      {/* <button
    onClick={() =>setPopup(true)}
    style={{
      width: '100%',
      backgroundColor: 'white',
      color: 'black',
      fontWeight: '600',
      padding: '12px',
      borderRadius: '999px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    }}
  >
    🚀 Invite Friends
  </button> */}

      
       {/* <div className="bottom-sheet" style={{ display:popup==true?('flex'):('none'),alignItems:"center",justifyContent:"space-around", borderRadius:'0',border:"1px solid white"}}>
       <button onClick={()=>{closePopup()}} className="closed-button">✖</button>
       <NavLink
        to={`https://wa.me/?text=Hey! Use my referral code *${referralCode}* to get ₹500 off your first order! 🎉🔥 ${codeurl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#25D366',
          marginBottom: '10px',
          textAlign: 'center',
          textDecoration: 'none',
          fontWeight: '600',
        }}
      >
        📱 WhatsApp
      </NavLink>
      
      <NavLink
  onClick={() => {
    navigator.clipboard.writeText(
      `Use my referral code ${referralCode} to get ₹500 off your first order!🔥 ${codeurl}` 
    );
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
    alert("Message copied! Paste it in Instagram DMs or Story.");
  }}
  style={{
    display: 'block',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#E1306C',
    marginBottom: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: '600',
  }}
>
  📸 Instagram
</NavLink>
       
       
       </div> */}
       <button
  onClick={() => {
    if (navigator.share) {
      navigator.share({
        title: 'Refer and Earn 💸',
        text: `Use my referral code ${referralCode} to get ₹500 off your first order! 🔥`,
        url: codeurl,
      })
      .then(() => console.log('Share successful!'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      alert("Sharing is not supported on this device. Please copy the code manually.");
    }
  }}
  style={{
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '600',
    padding: '12px',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  }}
>
  🚀 Invite Friends
</button>

    </div>
  );
};

export default ReferAndEarn;
