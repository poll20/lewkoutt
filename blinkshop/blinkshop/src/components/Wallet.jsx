import React, { useState } from "react";
import "./Wallet.css";
import { useAuth } from "./AuthContext";
const Wallet = ({ cashback, points }) => {
  const [activeTab, setActiveTab] = useState("cashback");
  const {userDetails}=useAuth()
  if(!userDetails){
    return (<p>loading...</p>)
  }
  return (
    <div className="wallet-container-mera-wallet">
      {/* Tabs */}
      <div className="wallet-tabs-mera-wallet">
        <button
          className={`wallet-tab-mera-wallet ${activeTab === "cashback" ? "active-mera-wallet" : ""}`}
          onClick={() => setActiveTab("cashback")}
        >
          Cashback
        </button>
        <button
          className={`wallet-tab-mera-wallet ${activeTab === "points" ? "active-mera-wallet" : ""}`}
          onClick={() => setActiveTab("points")}
        >
          Points
        </button>
      </div>

      {/* Cashback Section */}
      {activeTab === "cashback" && (
        <div className="wallet-section-mera-wallet cashback-mera-wallet">
          <h2>Cashback Balance</h2>
          <p className="pppp">₹{cashback}</p>
        </div>
      )}

      {/* Points Section */}
      {activeTab === "points" && (
        <div className="wallet-section-mera-wallet points-mera-wallet">
          <h2>Earned Points</h2>
          <p className="pppp">{!userDetails.wallet.points?(0):(userDetails.wallet.points)} pts</p>
        </div>
      )}
    </div>
  );
};

export default Wallet;
