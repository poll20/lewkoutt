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

const VibeSticker = () => {
    const [visi,setvisi] =useState(true)
  return (
    <NavLink  to='/mood' className="navlink">
    <div className="vibe-sticker"style={{display:visi==true?("block"):("none")}}>
      <div className="sticker-content">
        <span className="cross-icon" ><FaTimes onClick={()=>setvisi(false)}/></span>
        <span>Pick a</span>
        <span className="highlight">VIBE</span>
      </div>
    </div>
    </NavLink>
  );
};

export default VibeSticker;
