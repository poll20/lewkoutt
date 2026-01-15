
import React, { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
// import img from "./image/rae.avif"
// import { NavLink } from 'react-router-dom';
import { useFirebaseAuth } from './FirebaseContext';
import { useBio } from './BioContext';

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode,setrefcode]=useState('')
  const[codepoint,setcodepoint]=useState(0)
  const[codecount,setcodecount]=useState(0)
  const bannerImg = 'https://via.placeholder.com/600x200?text=Refer+Now'; // Replace this with your image
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [popup, setPopup] = useState(false);
  const{user,userDetails}=useFirebaseAuth()
  const{alluser}=useBio()
  const [showRankingList, setShowRankingList] = useState(false);
  useEffect(()=>{
    if(userDetails){
    setrefcode(userDetails.code)
    setcodepoint(userDetails.codepoint)
    setcodecount(userDetails.codecount)
    }
  },[user,userDetails])

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
let codeurl=`https://lewkout.netlify.app/loginn?ref=${referralCode}`

if(!alluser){
  return (<p>loading...</p>)
}
console.log("alluserrefercode",alluser)
const filteredUsers = alluser.filter(user => Number(user.codepoint) > 0);
  return (
    <div
      style={{
        // border:"1px solid red",
        marginTop:"10px",
        marginBottom:"30px",
        backgroundColor: "white",
        color: 'black',
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
        {/* <img
          src={img}
          alt="Refer Banner"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          loading="lazy"
        /> */}
      </div>

      {/* Earnings Overview */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginBottom: '16px',
          color:"black"
        }}
      >
        <div >
          <p style={{ color: '#ccc', margin: 0,color:"black" }}>Total Earning</p>
          <p style={{ fontWeight: '600', margin: 0,color:"black" }}>₹{codepoint?(codepoint):(0)}</p>
        </div>
        <div>
          <p style={{ color: '#ccc', margin: 0,color:"black" }}>Friend's Signup</p>
          <p style={{ fontWeight: '600', margin: 0,color:"black" }}>{codecount?(codecount):(0)}</p>
        </div>
      </div>

      {/* Main Info Box */}
      <div
        style={{
          backgroundColor: "white",
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '16px',
          
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: '8px',color:"black" }}>
          🔥 Earn ₹500 for each friend you refer!!
        </p>
        <p style={{ fontSize: '14px', color:"black", marginBottom: '12px' }}>
          Better to tell your friends about us before they find out on their own because this way
          you earn their trust, social capital and some reward points!
        </p>
        <ul
          style={{
            fontSize: '14px',
            // color: '#ccc',
            color:"black",
            paddingLeft: '20px',
            marginBottom: '12px',
          }}
        >
          <li style={{color:"black"}}>Share the referral code with your friends</li>
          <li>
            You and Your friend both{' '}
            <span style={{ fontWeight: '600', color: "black" }}>get ₹500</span> when your friend
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
          <span style={{ fontSize: '18px', letterSpacing: '2px' ,color:"" }}>{referralCode}</span>
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
{/* Ranking List Button */}
<button
  onClick={() => setShowRankingList(true)}
  style={{
    width: '100%',
    marginTop: '16px',
    marginBottom:"35px",
    backgroundColor: '#222',
    color: 'white',
    fontWeight: '600',
    padding: '12px',
    borderRadius: '999px',
    border: '1px solid white',
    cursor: 'pointer',
    fontSize: '16px',
  }}
>
  🏆 Show Ranking List
</button>

{/* Fullscreen Overlay for Ranking List */}
{showRankingList && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      color: 'white',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {/* Close Icon */}
    <button
      onClick={() => setShowRankingList(false)}
      style={{
        alignSelf: 'flex-end',
        fontSize: '24px',
        background: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '10px',
      }}
    >
      ✖
    </button>

    {/* Title */}
    <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>🏅 Top Referrers</h2>

    {/* Ranking List
    <div style={{ width: '100%', maxWidth: '500px' }}>
      {filteredUsers.map((rank) => (
        <div
          key={rank}
          style={{
            backgroundColor: '#1e1e1e',
            marginBottom: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>👤{rank.phonenumber}</span>
          <span>💸 ₹{500 * (6 - rank.codepoint)}</span>
        </div>
      ))}
    </div> */}
    {/* Ranking List */}
<div style={{ width: '100%', maxWidth: '500px' }}>
  {filteredUsers.length === 0 ? (
    <p style={{ color: 'gray', textAlign: 'center', marginTop: '20px' }}>List is empty</p>
  ) : (
    filteredUsers.map((rank) => (
      <div
        key={rank.phonenumber}
        style={{
          backgroundColor: '#1e1e1e',
          marginBottom: '12px',
          padding: '12px 16px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>👤 {rank.phonenumber}</span>
        <span>💸 ₹{500 * (6 - rank.codepoint)}</span>
      </div>
    ))
  )}
</div>

  </div>
)}

    </div>
  );
};

export default ReferAndEarn;
