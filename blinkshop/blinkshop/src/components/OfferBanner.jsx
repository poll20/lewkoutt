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
        background: "linear-gradient(to right,rgb(0, 0, 0), #ee0979)", // gradient
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
          color: "#fff",
          fontSize: "18px",
          fontWeight: "200",
          fontFamily:" 'Playfair Display',serif;",
          whiteSpace: "nowrap",
        }}
      >
        Lewkout Offer 50% Off on Every Purchase
      </motion.div>
    </div>
  );
}
