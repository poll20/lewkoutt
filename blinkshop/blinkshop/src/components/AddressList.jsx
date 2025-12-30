import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useBio } from "./BioContext";
import "./AddressList.css";
import SlideUpModal from "./SlideupModel";
import OtpLogin from "./OtpLogin";

import { useFirebaseAuth } from "./FirebaseContext";
import { useLocation } from "react-router-dom";
const AddressList = ({ loc }) => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { handlenewaddress, handlechooseaddress, deleteandeditaddrress, setshowmeaddress,fetchCoupons, setshowloginpage,showloginpage } = useBio();
  const [pincode, setPincode] = useState("");
  const [uname, setUname] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [chooseaddress, setchooseaddress] = useState([]);
  const [fireuser, setfireuser] = useState([]);
  const [actionss, setaction] = useState();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { user, userDetails, fetchUserDetails } = useFirebaseAuth();
  const [userprf, setuserprf] = useState({ address: [] });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});
  const [addressList, setAddressList] = useState([]);
const location = useLocation();
  const { sec } = useParams();
    const isLoggedIn = !!user && !!userDetails?._id;

  // useEffect(() => {
  //   if (userDetails && user) {
  //     setuserprf(userDetails);
  //     setfireuser(user);
  //   }
  // }, [userDetails, user]);

  useEffect(() => {
  // 🔐 Logged-in user
  if (isLoggedIn) {
    setuserprf(userDetails);
    setfireuser(user);
    setAddressList(userDetails?.address || []);
    

  } 
  // 👤 Guest user
  else {
    const guestAddress =
      JSON.parse(localStorage.getItem("guestAddress")) || [];
    setAddressList(guestAddress);
    setuserprf({ address: guestAddress });
  }
}, [isLoggedIn, userDetails, user]);


  const deleteoreditaddress = async (addressid, action, addr) => {
    await deleteandeditaddrress(addressid, action, userDetails, addr);
    await fetchUserDetails(fireuser);
  };

  // useEffect(() => {
  //   if (selectedAddress) {
  //     let a = userprf?.address?.filter((e) => e._id === selectedAddress);
  //     setchooseaddress(a);
  //   }
  // }, [selectedAddress]);
  useEffect(() => {
  if (selectedAddress) {
    const a = addressList.filter((e) => e._id === selectedAddress);
    setchooseaddress(a);
  }
}, [selectedAddress, addressList]);




  useEffect(() => {
  if (isLoggedIn) {
    sessionStorage.removeItem("afterLoginRedirect");
  }
}, [isLoggedIn]);


//   const sendtocheckout = () => {

//     if (chooseaddress) {
//       if(user){
// handlechooseaddress(chooseaddress);
//       navigate("/checkout");
//       }
      
//        else{
//     setshowloginpage(true)
//   }
//     }
//   };
// const sendtocheckout = () => {
//   if (!chooseaddress?.length) return;

//   if (user) {
//     handlechooseaddress(chooseaddress);
//     navigate("/checkout");
//   } else {
//     // ✅ SAVE selected address
//     sessionStorage.setItem(
//       "pendingCheckoutAddress",
//       JSON.stringify(chooseaddress)
//     );

//     sessionStorage.setItem("afterLoginRedirect", location.pathname);
//     setshowloginpage(true);
//   }
// };
const sendtocheckout = () => {
  if (!chooseaddress?.length) return;

  if (isLoggedIn) {
    handlechooseaddress(chooseaddress);
    navigate("/checkout");
    return;
  }

  // 🔐 only guest
  sessionStorage.setItem(
    "pendingCheckoutAddress",
    JSON.stringify(chooseaddress)
  );
  sessionStorage.setItem("afterLoginRedirect", location.pathname);
  setshowloginpage(true);
};



  const sendtoreturncom = () => {
    if (chooseaddress) {
      handlechooseaddress(chooseaddress);
      sessionStorage.setItem("comingBackFromAddress", "true");
      setshowmeaddress(false);
    }
  };

  if (!userprf) return <h2>Loading...</h2>;

const containerStyle = {
  marginTop: "60px",
  backgroundColor: "#fff",
  padding: "15px",
  height: "calc(100vh - 60px)", // 👈 total visible area me fit ho
  overflowY: "auto",             // 👈 scroll enable
  WebkitOverflowScrolling: "touch",
  scrollBehavior: "smooth",
  fontFamily: "Poppins, sans-serif",
  boxSizing: "border-box",
  paddingBottom: "80px",         // 👈 fixed button ke liye space niche
};


  const headerStyle = {
    borderBottom: "1px solid #ddd",
    paddingBottom: "8px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const addBtnStyle = {
    backgroundColor: "black",
    border: "none",
    color: "#fff",
    fontSize: "12px",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const addressCardStyle = {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const actionBtnStyle = {
    border: "1px solid #000",
    borderRadius: "6px",
    color: "#000",
    padding: "6px 10px",
    fontSize: "13px",
    background: "#fff",
    cursor: "pointer",
    marginRight: "6px",
  };

  return (
    <>    <div style={containerStyle}>
      {userprf?.address?.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>Address</h2>
          {loc !== "return" ? (
            <NavLink to="/maps">
              <button style={addBtnStyle}>+ Add Address</button>
            </NavLink>
          ) : (
            <span style={{ fontSize: "12px" }}>Select or Edit address for return pickup.</span>
          )}
        </div>
      ) : (
        <>
          <div style={headerStyle}>
            {loc !== "return" ? (
              <>
                <h2 style={{ fontSize: "15px", fontWeight: "bold", margin: 0 }}>Select Address</h2>
                <NavLink to="/maps">
                  <button style={addBtnStyle}>+ Add Address</button>
                </NavLink>
              </>
            ) : (
              <span style={{ fontSize: "14px" }}>
                Select or edit address for return pickup.
              </span>
            )}
          </div>

          <h2 style={{ fontWeight: "bold", fontSize: "15px" }}>Saved Address</h2>

          {userprf?.address?.map((addr) => (
            <div key={addr._id} style={addressCardStyle}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  onClick={() => setSelectedAddress(addr._id)}
                  style={{ marginRight: "10px" }}
                />
                <p style={{ fontWeight: "600", fontSize: "14px", margin: 0 }}>{addr.uname}</p>
              </div>

              {editingAddressId === addr._id ? (
                <>
                  <input
                    type="text"
                    value={editedAddress.uname}
                    onChange={(e) => setEditedAddress({ ...editedAddress, uname: e.target.value })}
                    placeholder="Name"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={editedAddress.building}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, building: e.target.value })
                    }
                    placeholder="House/Flat/Block no."
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={editedAddress.locality}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, locality: e.target.value })
                    }
                    placeholder="Locality"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={editedAddress.pincode}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, pincode: e.target.value })
                    }
                    placeholder="Pincode"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={editedAddress.phone}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, phone: e.target.value })
                    }
                    placeholder="Phone"
                    style={inputStyle}
                  />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "13px", margin: "4px 0" }}>
                    Address: {addr.building}, {addr.locality}, {addr.city}, {addr.state}
                  </p>
                  <p style={{ fontSize: "13px", margin: "4px 0" }}>Pincode: {addr.pincode}</p>
                  <p style={{ fontSize: "13px", margin: "4px 0" }}>Phone: {addr.phone}</p>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
                {loc !== "return" && (
                  <button
                    style={actionBtnStyle}
                    onClick={() => deleteoreditaddress(addr._id, "delete", addr)}
                  >
                    Delete
                  </button>
                )}
                {editingAddressId === addr._id ? (
                  <>
                    <button
                      style={actionBtnStyle}
                      onClick={() => setEditingAddressId(null)}
                    >
                      Back
                    </button>
                    <button
                      style={actionBtnStyle}
                      onClick={() => {
                        deleteoreditaddress(addr._id, "edit", editedAddress);
                        setEditingAddressId(null);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    style={actionBtnStyle}
                    onClick={() => {
                      setEditingAddressId(addr._id);
                      setEditedAddress(addr);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {userprf?.address?.length <= 0 && (
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              width: "100%",
              maxWidth: "350px",
              display: "block",
              margin: "30px auto",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Home
          </button>
        </NavLink>
      )}

      
    </div>
    {sec !== "upp" && chooseaddress.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
            backgroundColor: "#fff",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          
            zIndex: 1000,
          }}
        >
          {loc != "return" ? (
            <button
              style={{
                width: "90%",
                backgroundColor: "black",
                color: "white",
                border: "2px solid black",
                borderRadius: "6px",
                padding: "12px 0",
                fontWeight: "600",
              }}
              onClick={sendtocheckout}
            >
              Checkout
            </button>
          ) : (
            <button
              style={{
                width: "90%",
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
                borderRadius: "6px",
                padding: "12px 0",
                fontWeight: "600",
              }}
              onClick={sendtoreturncom}
            >
              Return Address
            </button>
          )}
          {showloginpage==true?(
      <div>
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin/>
        </SlideUpModal>
      </div>
    ):('')}
        </div>
      )}
      </>

  );
};

export default AddressList;
