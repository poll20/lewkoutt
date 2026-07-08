import React from "react";
import { NavLink } from 'react-router-dom';
import whatimg from "../components/image/whatimg2.jpeg"
const SubscriptionPopup = ({ onClose }) => {

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(10px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      zIndex: 1000,
    },
    container: {
      width: "100%",
    //   height:"100%",
      maxWidth: "420px",
      background: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
      position: "relative",
    //   border:"2px solid red"
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      border: "none",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(10px)",
      cursor: "pointer",
      fontSize: "18px",
    },
    imageSection: {
       width: "100%",
  maxHeight: "320px",
  overflow: "hidden",
  background: "#f5f5f5",
    },
    image: {
         width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  objectPosition: "center 5%"
      

      
    },
    content: {
      padding: "20px",
      textAlign: "center",
    },
   heading: {
  fontFamily:" 'Cormorant Garamond', serif",
    fontSize: "18px",
    fontWeight:"400",
    color:"black",
    textShadow:"0 1px 8px rgba(0, 0, 0, 0.3)",
  // letterSpacing: "0.01em",
  marginBottom: "10px",
},
    text: {
      fontSize: "12px",
      color: "#666",
      marginBottom: "20px",
    },
    offers: {
        // border:"2px solid red",
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      gap: "10px",
      marginBottom: "20px",
    },
    offerBox: {
     display:"flex",
     alignItems:"center",
     justifyContent:"center",
      background: "#f3f3f3",
      padding: "12px",
      gap:"5px",
    //   borderRadius: "8px",
      textAlign: "center",
    },
    label: {
      fontFamily: "'Cormorant Garamond', serif",
  
  fontWeight: "600",
  fontStyle: "italic",
 letterSpacing: "0.01em",
  
      fontSize: "10px",
      color: "#888",
    },
    price: {
      fontSize: "14px",
      fontFamily: "'Cormorant Garamond', serif",
 
  fontWeight: "600",
  fontStyle: "italic",


    },
    input: {
      width: "100%",
      height: "50px",
      borderRadius: "30px",
      border: "1px solid #ddd",
      padding: "0 20px",
      marginBottom: "15px",
      outline: "none",
    },
    button: {
      width: "100%",
      padding:"10px 0",
      borderRadius: "30px",
      border: "none",
      background: "black",
      color:"white",
    fontFamily: "'Cormorant Garamond', serif",
  fontSize: "18px",
  fontWeight: "600",
  fontStyle: "italic",
 letterSpacing: "0.01em",
  
    },
    footer: {
        // border:"2px solid red",
      marginTop: "20px",
      marginBottom:"0",
      fontSize: "10px",
      color: "#999",
  
      textTransform: "uppercase",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>

        {/* Close */}
        <button style={styles.closeBtn} onClick={onClose}>×</button>

        {/* Image */}
        <div style={styles.imageSection}>
          <img
            src={whatimg}
            alt="banner"
            style={styles.image}
          />
        </div>

        {/* Content */}
        <div style={styles.content}>
          <p style={styles.heading}>Why Pay Full When You Can Get It At Half</p>
          {/* <p style={styles.text}>
            Join our inner circle for early access to curated collections and private offers.
          </p> */}

          {/* Offers */}
          <div style={styles.offers}>
            <div style={styles.offerBox}>
              {/* <div style={styles.label}>VOUCHER 01</div> */}
              <div style={styles.label}>ALL TOPS</div>
              <div style={styles.price}>at ₹399</div>
            </div>

            <div style={styles.offerBox}>
              {/* <div style={styles.label}>VOUCHER 02</div> */}
              <div style={styles.label}>ALL DRESS</div>
              <div style={styles.price}>at ₹699</div>
            </div>
          </div>

          {/* Input */}
          {/* <input
            type="email"
            placeholder="Enter your email address"
            style={styles.input}
          /> */}

          {/* Button */}
          <NavLink to='/member' >
          <button style={styles.button}>
            Start Saving Now
            </button>
          </NavLink>

          {/* Footer */}
          {/* <p style={styles.footer}>
            No spam. Only exclusive deals.
          </p> */}
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPopup;