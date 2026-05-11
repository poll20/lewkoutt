import React from "react";
import { motion } from "framer-motion";

export default function OfferBanner() {
  return (
    <div
      style={{
        
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#000",
        padding: "0",
        marginTop:"60px",
         background: "linear-gradient(to right, #ffffff, #f3f3f3, #ececec)", // gradient
        // border:"2px solid red"
      }}
    >
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          display: "flex",
          gap: "50px",
          fontFamily:" 'Cormorant Garamond', serif",
  fontSize: "18px",
  fontWeight:"300",
  color:"black",
  textShadow:"0 1px 8px rgba(0, 0, 0, 0.3)",
    whiteSpace: "nowrap",
        }}
      >
        
        <span>
        🕒 Delivery In⚡60 Mins (JAIPUR)
        </span>

         <span>
        🕒4-6 days Delivery (PAN-INDIA)
        </span>
        <span>
        25% OFF ON FIRST 3 ORDERS 🛍️
        </span>
      </motion.div>
    </div>
  );
}


// import React from "react";
// import "./OfferBanner.css";

// const OFFERS = [
//   "⚡ Delivery in 60 mins",
//   "25% off on your first 3 orders 🛍️",
//   "Free shipping above ₹499",
//   "New arrivals every Friday ✨",
//   "Easy 7-day returns",
// ];

// export default function OfferBanner() {
//   // Duplicate for seamless loop
//   const track = [...OFFERS, ...OFFERS];

//   return (
//     <div className="offer-banner">
//       <div className="offer-track">
//         {track.map((text, i) => (
//           <React.Fragment key={i}>
//             <span className="offer-item">{text}</span>
//             <span className="offer-dot">◆</span>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }