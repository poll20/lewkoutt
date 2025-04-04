import React from "react";
import "./AboutUs.css";
import aboutImage from "./image/img3.jpg"; // Replace with your image path

const AboutUs = () => {
  return (
    <div className="about-container" style={{marginTop:"10px",border:"2px solid red"}}>
      {/* Header with Gradient Text */}
      {/* <h2 className="gradient-text">#iamallcolors</h2> */}

      {/* Image Section */}
      <div className="abtimage-container">
        <img src={aboutImage} alt="Team" />
      </div>

      {/* About Us Content */}
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          <strong>Nothing to wear!</strong> meltdown? Been there. That’s why Lewkout exists—to save you from last-minute outfit crises!
          <br /><br />
          We deliver the trendiest Western wear from Jaipur’s top stores to your doorstep in minutes. No endless scrolling, no week-long waits—just pick, order, and <strong>BOOM!</strong> Your outfit arrives faster than your friends cancel plans.
          <br /><br />
          Date, party, or just another <em>“I need new clothes” moment</em> (we don’t judge), Lewkout’s got your back.
          <br /><br />
          <strong>Ditch the wait. Own the look. Lewkout it!</strong>
        </p>
      </div>
      {/* New Footer Section */}
      <div className="about-footer">
        <p>We’d just let you be whoever you’d like to be.</p>

        <a href="https://instagram.com" className="instagram-button">
          <i className="fab fa-instagram"></i> Follow LEWKOUT on Instagram
        </a>

        <div className="company-info">
          <h3>LEWKOUT (Fraicheur Retail Private Limited)</h3>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, cum.
          </p>
        </div>

        <div className="footer-links" style={{marginBottom:"13px",border:"2px solid red"}}>
          <a href="#">Terms & Conditions</a> •
          <a href="#">Privacy Policy</a> •
          <a href="#">Refund policy</a>
        </div>
      </div>
    
    </div>
  );
};

export default AboutUs;
