

// import React, { useState } from "react";
// import { useFirebaseAuth } from "./FirebaseContext";

// const Wallet = ({ cashback, points }) => {
//   const [activeTab, setActiveTab] = useState("cashback");
//   const { userDetails } = useFirebaseAuth();

//   if (!userDetails) {
//     return <p>Loading...</p>;
//   }

//   const walletContainerStyle = {
//     padding: "20px",
//     fontFamily: "'Arial', sans-serif",
//     backgroundColor: "#f8f9fa",
//     minHeight: "100vh",
//   };

//   const tabsStyle = {
//     display: "flex",
//     marginBottom: "20px",
//     gap: "10px",
//   };

//   const tabButtonStyle = (active) => ({
//     flex: 1,
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     cursor: "pointer",
//     backgroundColor: active ? "#fff" : "#f1f1f1",
//     color: active ? "#000" : "#555",
//     fontWeight: active ? "600" : "400",
//     textAlign: "center",
//   });

//   const sectionStyle = {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     marginBottom: "10px",
//   };

//   const balanceStyle = {
//     fontSize: "28px",
//     fontWeight: "700",
//     margin: "10px 0",
//   };

//   const rewardCardStyle = (type) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "15px",
//     marginBottom: "10px",
//     borderRadius: "10px",
//     backgroundColor: "#fff",
//     boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//     color: type === "credit" ? "green" : "red",
//     fontWeight: "600",
//   });

//   return (
//     <div style={walletContainerStyle}>
//       <h2 style={{ marginBottom: "20px" }}>Newme Wallet</h2>
//       <p style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
//         ₹{userDetails.wallet.cashback || 0} Lewkout Wallet
//       </p>

//       {/* Tabs */}
//       <div style={tabsStyle}>
//         {/* <div
//           style={tabButtonStyle(activeTab === "cashback")}
//           onClick={() => setActiveTab("cashback")}
//         >
//           Cashback
//         </div> */}
//         {/* <div
//           style={tabButtonStyle(activeTab === "points")}
//           onClick={() => setActiveTab("points")}
//         >
//           Points
//         </div> */}
//       </div>

//       {/* Cashback Section */}
//       {activeTab === "cashback" && (
//         <div style={sectionStyle}>
//           <h3>Cashback Balance</h3>
//           <p style={balanceStyle}>₹{userDetails.wallet.cashback || 0}</p>

//           {/* Rewards */}
//           <div style={rewardCardStyle("debit")}>
//             <span>Super Wallet Credit Reward</span>
//             <span>-₹100</span>
//           </div>
//           <div style={rewardCardStyle("credit")}>
//             <span>Super Wallet Credit Reward</span>
//             <span>+₹100</span>
//           </div>
//           <div style={rewardCardStyle("credit")}>
//             <span>Super Wallet Credit Reward</span>
//             <span>+₹100</span>
//           </div>
//         </div>
//       )}

//       {/* Points Section
//       {activeTab === "points" && (
//         <div style={sectionStyle}>
//           <h3>Earned Points</h3>
//           <p style={balanceStyle}>{userDetails.wallet.points || 0} pts</p>
//         </div>
//       )} */}

//       <button
//         style={{
//           width: "100%",
//           padding: "15px",
//           border: "none",
//           borderRadius: "10px",
//           backgroundColor: "#000",
//           color: "#fff",
//           fontSize: "16px",
//           fontWeight: "600",
//           cursor: "pointer",
//           marginTop: "20px",
//         }}
//       >
//         Shop now
//       </button>
//     </div>
//   );
// };

// export default Wallet;


import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "./FirebaseContext";
import { NavLink } from "react-router-dom";

const Wallet = ({ cashback, points }) => {
  const [activeTab, setActiveTab] = useState("cashback");
  const { userDetails } = useFirebaseAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
const apiUrl = import.meta.env.VITE_API_URL;
  // ✅ Fetch wallet transactions when page loads
  useEffect(() => {
    const fetchWalletTransactions = async () => {
      if (!userDetails?._id) return;

      try {
        const res = await fetch(
          `${apiUrl}/getuserwallet/${userDetails?._id}`
        );
        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching wallet transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletTransactions();
  }, [userDetails]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  const walletContainerStyle = {
    
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  };

  const balanceStyle = {
    fontSize: "28px",
    fontWeight: "700",
    margin: "10px 0",
  };

  const rewardCardStyle = (type) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    color: type === "credit" ? "green" : "red",
    fontWeight: "600",
  });

  return (
    <div style={walletContainerStyle}>
      <h2 style={{ marginBottom: "20px" }}>Newme Wallet</h2>
      <div style={{display:"flex",flexDirection:"column"}}>
      <span style={{ fontSize: "16px", fontWeight: "400"}}>
        Lewkout Wallet
      </span>
      <span style={{ fontSize: "16px", fontWeight: "400", marginBottom: "20px"}}>
        ₹{userDetails?.wallet?.cashback || 0} 
      </span>
      </div>

      <div style={sectionStyle}>
        <h3>Wallet Transactions</h3>

        {loading ? (
          <p>Loading wallet transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found 🪙</p>
        ) : (
          transactions?.map((tx) => (
            <div
              key={tx._id}
              style={rewardCardStyle(
                tx.type === "wallet-refund" ||
                  tx.type === "wallet-partial-refund" ||
                  tx.type === "cashback"
                  ? "credit"
                  : "debit"
              )}
            >
              <span>{tx.description}</span>
              <span>
                {tx.type === "purchase" || tx.type === "withdraw" ? "-" : "+"}₹
                {tx.amount}
              </span>
            </div>
          ))
        )}
      </div>

<NavLink to="/store/store" style={{textDecoration:"none"}}>

      <button
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Shop now
      </button>
      </NavLink>
    </div>
  );
};

export default Wallet;
