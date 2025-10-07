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
          color: "black",
          fontSize: "18px",
          fontWeight: "600",
          fontFamily:" 'Playfair Display',serif;",
          whiteSpace: "nowrap",
        }}
      >
        🕒 Delivery In⚡60 Mins
      </motion.div>
    </div>
  );
}
