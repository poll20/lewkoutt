// import React from 'react';
// import './VibeSticker.css'; // CSS file
// import { NavLink } from 'react-router-dom';

// const VibeSticker = () => {
//   return (
//     <div className="vibe-sticker">
//         <NavLink to='/mood' className='navlink'>
//       <div className="sticker-content">
//         <span>Pick a</span>
//         <span className="highlight">vibe</span>
//       </div>
//       </NavLink>
//     </div>
//   );
// };

// export default VibeSticker;

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Cross Icon
import "./VibeSticker.css";
import { NavLink } from "react-router-dom";
import img from "./image/cloudmooddd.png"
const VibeSticker = () => {
    const [visi,setvisi] =useState(true)
  return (
    
    <div className="vibe-sticker"style={{display:visi==true?("block"):("none")}}>
        
     
        <span className="cross-icon" onClick={()=>{setvisi(!visi)}}><FaTimes onClick={()=>{setvisi(!visi)}}/></span>
         <NavLink to='/mood' className='navlink' style={{display:"flex"}}>
        <img src={img} alt="" style={{width:"170px",height:"170px"}}/>
        </NavLink> 
    
      
      
      
    </div>
    
  );
};

export default VibeSticker;
