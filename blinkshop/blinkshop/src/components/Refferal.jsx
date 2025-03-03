import React from "react";
import "./Refferal.css";

const Refferal = () => {
  return (
    <div className="referral-container">
      <div className="referral-content">
        <h1 className="referral-title">Refer & Earn Rewards!</h1>
        <p className="referral-text">
          Invite your friends and earn exclusive discounts on your next purchase.
        </p>
        <input
          type="text"
          placeholder="Enter your friend's email"
          className="referral-input"
        />
        <button className="referral-button">Send Invite</button>
        <p className="referral-note">
          Share your referral code: <strong>ABC123</strong>
        </p>
      </div>
    </div>
  );
};

export default Refferal;
