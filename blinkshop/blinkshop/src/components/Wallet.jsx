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
            <p className="pppp">₹{!userDetails.wallet.cashback?(0):(userDetails.wallet.cashback)}</p>
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

//   import React, { useState } from "react";
// import "./Wallet.css";
// import { useAuth } from "./AuthContext";
// import { useBio } from "./BioContext";
// import { useNavigate } from "react-router-dom";
//   const Wallet = () => {
//   const [activeTab, setActiveTab] = useState("cashback");
//   const [selectedAmount, setSelectedAmount] = useState(0);
//   const { userDetails } = useAuth();
//   const navigate=useNavigate()
// const{setwalletkapesa}=useBio()
//   if (!userDetails) {
//     return <p>Loading...</p>;
//   }

//   const handleSelection = (value) => {
//     if (value === "cashback") {
//       setSelectedAmount(userDetails.wallet.cashback || 0);
//       setwalletkapesa(userDetails.wallet.cashback || 0)
//     } else {
//       const convertedPoints = (userDetails.wallet.points || 0) * 2.5;
//       setSelectedAmount(convertedPoints);
//       setwalletkapesa(convertedPoints)
//     }
//   };

//   return (
//     <div className="wallet-container-mera-wallet">
//       {/* Tabs */}
//       <div className="wallet-tabs-mera-wallet">
//         <button
//           className={`wallet-tab-mera-wallet ${activeTab === "cashback" ? "active-mera-wallet" : ""}`}
//           onClick={() => setActiveTab("cashback")}
//         >
//           Cashback
//         </button>
//         <button
//           className={`wallet-tab-mera-wallet ${activeTab === "points" ? "active-mera-wallet" : ""}`}
//           onClick={() => setActiveTab("points")}
//         >
//           Points
//         </button>
//       </div>

//       {/* Cashback Section */}
//       {activeTab === "cashback" && (
//         <div className="wallet-section-mera-wallet cashback-mera-wallet">
//           <h2>Cashback Balance</h2>
//           <p className="pppp">₹{userDetails?.wallet?.cashback || 0}</p>
//         </div>
//       )}

//       {/* Points Section */}
//       {activeTab === "points" && (
//         <div className="wallet-section-mera-wallet points-mera-wallet">
//           <h2>Earned Points</h2>
//           <p className="pppp">{userDetails.wallet.points || 0} pts</p>
//         </div>
//       )}

//       {/* Selection Dropdown */}
//       <div className="wallet-selection">
//         <label>Select Option:</label>
//         <select
//           onChange={(e) => handleSelection(e.target.value)}
//           className="wallet-dropdown"
//         >
//           <option value="cashback">Cashback</option>
//           <option value="points">Points</option>
//         </select>
//       </div>

//       {/* Display Selected Amount */}
//       <div className="wallet-amount-display">
//         <h3>Selected Amount: ₹{selectedAmount}</h3>
//       </div>
//       <button style={{background:"black",color:"white",marginTop:"70px"}} onClick={()=>{navigate(-1)}}>Apply</button>
//     </div>
//   );
// };

// export default Wallet;