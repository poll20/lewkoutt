import React from "react";
import { NavLink } from 'react-router-dom';

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
    //   minHeight:"80%",
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
    //   aspectRatio: "4/5",
    height:"55%",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    content: {
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "16px",
      fontWeight:"bold",
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
      fontSize: "10px",
      color: "#888",
    },
    price: {
      fontSize: "12px",
      fontWeight: "bold",
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
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize:"12px"
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCILbW6-oovKewC_u24AaqDEmdbqEkHbczEZUZ_qkD1w4vAnPFgAMZ_7tDMUQhetdAoE5wz5bRa2KVj5CvR2qqHfdDB8RUa-c63Az0zQAMoU6RUOVUpHwgbD80QC97iEfZYLG_g_MYXgktDlQu0SnUZwcdmM4B8UlR8eb7DmMaGG3Pe_pTPzwDMYaKywIX1NNsrmDT1nwDHIshyULvVonpnP1fjDvtgesOTyb8NQlfsF635DhOCBIFJzvO3oojUHUefmqzokIhuGT8"
            alt="banner"
            style={styles.image}
          />
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.heading}>Unlock Exclusive Style Deals</h2>
          <p style={styles.text}>
            Join our inner circle for early access to curated collections and private offers.
          </p>

          {/* Offers */}
          <div style={styles.offers}>
            <div style={styles.offerBox}>
              {/* <div style={styles.label}>VOUCHER 01</div> */}
              <div style={styles.price}>₹200 OFF</div>
              <div style={styles.label}>ON PANTS</div>
            </div>

            <div style={styles.offerBox}>
              {/* <div style={styles.label}>VOUCHER 02</div> */}
              <div style={styles.price}>₹150 OFF</div>
              <div style={styles.label}>ON TOPS</div>
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
            Unlock My Discount
            </button>
          </NavLink>

          {/* Footer */}
          <p style={styles.footer}>
            No spam. Only exclusive deals.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPopup;