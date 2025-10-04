


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useBio } from "./BioContext";
// import { useLocation } from "react-router-dom";
// import img from "./image/img3.jpg";
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import AddressList from "./AddressList";

const REASONS = [
  {
    label: "Did not like the product",
    subReasons: [
      "Does not look good on me",
      "Not happy with product quality (material)",
      "Did not like the color",
      "Did not like the product (please give details)",
    ],
  },
  {
    label: "Defective/Damage Product received",
    subReasons: [
      "Color faded/washed out",
      "Received damaged/open package",
      "Received Defective Merchandise",
      "Product is torn/ worn out (please give details)",
    ],
  },
  {
    label: "Size/Colour Issue",
    subReasons: [
      "Size too small",
      "Size too large",
      "Color not as expected",
    ],
  },
  {
    label: "Wrong Item Shipped",
    subReasons: [
      "Received completely different product",
      "Incorrect variant shipped",
    ],
  },
  {
    label: "Others",
    subReasons: [
      "Order delayed, no longer needed",
      "Found better alternative",
      "Other reasons",
    ],
  },
];


const ReturnRequest = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [subReason, setSubReason] = useState("");
  const [returnprd, setReturnPrd] = useState([]);
  const [step, setStep] = useState(1);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [refundMode, setRefundMode] = useState("");
const [refundModeConfirmed, setRefundModeConfirmed] = useState(false);
// const[showmeaddress,setshowmeaddress]=useState(false)

  let { id } = useParams();
  let { userorder, orderreturn,addresssetkro,showmeaddress,setshowmeaddress} = useBio();
  let { updateOrdersWithReturnDetails } = useDashboard();

  useEffect(() => {
    if (userorder) {
      let matchedOrders = userorder.filter(order =>
        order?.products?.some(product => product._id === id)
      );
      setReturnPrd(matchedOrders);
    }
  }, [userorder, id]);

  const currentReasonObj = REASONS.find(r => r.label === reason);
  const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

  const handleNext = () => {
    if (step === 1 && (!reason || !subReason)) {
      alert("Please select reason and sub-reason.");
      return;
    }

    if (step === 2 && uploadedUrls.length < 2) {
      alert("Please upload at least 2 photos.");
      return;
    }

    setStep(step + 1);
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (uploadedUrls.length + files.length > 2) {
      alert("You can upload up to 2 photos only.");
      return;
    }

    setIsUploading(true);
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lewkout");
      formData.append("cloud_name", "ddbz9m39a");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("images are uploaded",data.secure_url)
        setUploadedUrls(prev => [...prev, data.secure_url]);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Image upload failed.");
      }
    }
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    if (!refundMode) {
      alert("Please select a refund mode.");
      return;
    }

    await orderreturn(reason, subReason, refundMode, returnprd, uploadedUrls,addresssetkro);
    await updateOrdersWithReturnDetails();
    navigate("/");
  };

    

if(addresssetkro){
  console.log("addresset hua kya",addresssetkro) 
}
     

  if (!returnprd.length) return <p>Loading...</p>;
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "16px",
    fontFamily: "system-ui, -apple-system, sans-serif"
  };

  const cardStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "24px",
    "@media (maxWidth: 768px)": {
      padding: "16px",
      margin: "0"
    }
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#111827",
    textAlign: "center"
  };

  const productCardStyle = {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#f9fafb"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "border-color 0.2s ease",
    outline: "none"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: "16px"
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#9ca3af",
    cursor: "not-allowed"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Return Request</h2>

        {/* Product Information */}
        <div style={productCardStyle}>
          <img 
            src={userorder[0].products[0].image[0]} 
            alt="Product" 
            style={{ 
              width: "80px", 
              height: "110px", 
              objectFit: "cover", 
              borderRadius: "6px",
              border: "1px solid #e5e7eb"
            }} 
            loading="lazy"
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontWeight: "600", 
              marginBottom: "8px",
              fontSize: "16px",
              color: "#111827"
            }}>
              {userorder[0].products[0]?.tag}
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: "#6b7280", 
              marginBottom: "8px",
              lineHeight: "1.4"
            }}>
              {userorder[0].products[0].discription}
            </p>
            <p style={{ 
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827"
            }}>
              ₹{userorder[0].products[0].totalAmount} 
              <span style={{ 
                color: "#9ca3af", 
                fontWeight: "400",
                marginLeft: "4px"
              }}>
                (Includes Fee)
              </span>
            </p>
          </div>
        </div>

        {/* Step 1: Reason Selection */}
        {step === 1 && (
          <div>
            <label style={labelStyle}>Return Reason</label>
            <select 
              value={reason} 
              onChange={e => { 
                setReason(e.target.value); 
                setSubReason(""); 
              }} 
              style={{
                ...inputStyle,
                marginBottom: "16px"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            >
              <option value="">Select Reason</option>
              {REASONS.map(r => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>

            {reason && (
              <>
                <label style={labelStyle}>Specific Reason</label>
                <select 
                  value={subReason} 
                  onChange={e => setSubReason(e.target.value)} 
                  style={{
                    ...inputStyle,
                    marginBottom: "16px"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                >
                  <option value="">Select Specific Reason</option>
                  {subReasonOptions.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </>
            )}

            <button 
              onClick={handleNext} 
              style={buttonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1f2937"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#000000"}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <div>
            <p style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#111827"
            }}>
              Upload Return Proof (Minimum 6 photos)
            </p>
            
            <div style={{
              border: "2px dashed #d1d5db",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "20px",
              backgroundColor: "#f9fafb",
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.backgroundColor = "#eff6ff";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.backgroundColor = "#f9fafb";
            }}
            >
              <label style={{
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "14px",
                display: "block"
              }}>
                <div style={{
                  fontSize: "40px",
                  marginBottom: "8px"
                }}>📷</div>
                Click to Upload Photos
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  style={{ display: "none" }} 
                />
              </label>
            </div>

            {uploadedUrls.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "8px",
                marginBottom: "20px"
              }}>
                {uploadedUrls.map((url, idx) => (
                  <img 
                    key={idx} 
                    src={url} 
                    alt={`Upload ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #e5e7eb"
                    }} 
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div style={{
              fontSize: "12px",
              color: "#6b7280",
              marginBottom: "16px",
              textAlign: "center"
            }}>
              {uploadedUrls.length}/2 photos uploaded
            </div>

            <button 
              disabled={uploadedUrls.length < 2 || isUploading}
              onClick={handleNext}
              style={uploadedUrls.length >= 2 && !isUploading ? buttonStyle : disabledButtonStyle}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#1f2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#000000";
                }
              }}
            >
              {isUploading ? "Uploading..." : "Next"}
            </button>
          </div>
        )}

        {/* Step 3: Refund Mode & Confirmation */}
        {step === 3 && (
          <div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#111827"
            }}>
              Confirm and Submit Request
            </h3>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              padding: "12px",
              backgroundColor: "#fef2f2",
              borderRadius: "8px",
              border: "1px solid #fecaca"
            }}>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>Refund Amount</span>
              <span style={{ 
                color: "#dc2626", 
                fontWeight: "700",
                fontSize: "16px"
              }}>
                ₹{userorder[0].products[0]?.totalAmount}
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#111827"
              }}>
                Choose Refund Mode
              </p>

              {/* Wallet Refund Option */}
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: refundMode === "Lewkout Wallet" ? "#eff6ff" : "white"
              }}
              onClick={() => setRefundMode("Lewkout Wallet")}
              >
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer"
                }}>
                  <input
                    type="radio"
                    name="refund"
                    value="Lewkout Wallet"
                    checked={refundMode === "Lewkout Wallet"}
                    onChange={e => setRefundMode(e.target.value)}
                    style={{ marginTop: "2px" }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "600", fontSize: "14px" }}>Lewkout Wallet</span>
                      <span style={{
                        fontSize: "10px",
                        backgroundColor: "#dcfce7",
                        color: "#16a34a",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "600"
                      }}>
                        ⚡ INSTANT
                      </span>
                    </div>
                    <div style={{
                      color: "#6b7280",
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}>
                      After quality check is passed, ₹{userorder[0].products[0]?.totalAmount} will be returned to your Lewkout Wallet instantly.
                    </div>
                    <div style={{
                      fontSize: "11px",
                      marginTop: "8px",
                      backgroundColor: "#fef2f2",
                      color: "#dc2626",
                      padding: "8px",
                      borderRadius: "6px",
                      lineHeight: "1.3"
                    }}>
                      <strong>Note:</strong> The amount paid by the wallet can only be returned to the wallet and does not support withdrawals.
                    </div>
                  </div>
                </label>
              </div>

              {/* Source Refund Option */}
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: refundMode === "Back to Source" ? "#eff6ff" : "white"
              }}
              onClick={() => setRefundMode("Back to Source")}
              >
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer"
                }}>
                  <input
                    type="radio"
                    name="refund"
                    value="Back to Source"
                    checked={refundMode === "Back to Source"}
                    onChange={e => setRefundMode(e.target.value)}
                    style={{ marginTop: "2px" }}
                  />
                  <div>
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>Back to source</span>
                    <div style={{
                      color: "#6b7280",
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}>
                      After quality check is passed, ₹78 will be returned to your Lewkout Wallet instantly, ₹446 will be returned to your original UPI account 8955**00@ybl within 2 days.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Pickup Address */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#111827"
              }}>
                📍 Pick Up Address
              </p>
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{
                  fontSize: "13px",
                  lineHeight: "1.4",
                  color: "#374151"
                }}>
                  {addresssetkro.uname}<br />
                  {addresssetkro.building}<br />
                  {addresssetkro.locality}, {addresssetkro.city}
                </div>
                <button 
                  onClick={() => setshowmeaddress(true)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#3b82f6",
                    padding: "4px"
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Confirmation Items */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "12px",
                color: "#111827"
              }}>
                Please check & confirm that the following items are in the same condition as when the order was delivered:
              </p>
              <ul style={{
                marginLeft: "20px",
                fontSize: "12px",
                color: "#6b7280",
                lineHeight: "1.5"
              }}>
                <li style={{ marginBottom: "4px" }}>The MRP & SKU ID tag along with the plastic seal</li>
                <li>Brand tag stitched to product which specifies the size</li>
              </ul>
            </div>

            {/* Policy Notice */}
            <div style={{
              fontSize: "11px",
              color: "#6b7280",
              marginBottom: "16px",
              lineHeight: "1.4"
            }}>
              In accordance with{" "}
              <span style={{
                color: "#3b82f6",
                textDecoration: "underline",
                cursor: "pointer"
              }}>
                Lewkout's return policy
              </span>
              , we may deny refunds for ineligible items at the time of return.
            </div>

            {/* Confirmation Checkbox */}
            <div style={{
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              }}>
                <span>I have understood and confirmed the above terms</span>
                <input 
                  type="checkbox" 
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#000000"
                  }}
                  onChange={(e) => setRefundModeConfirmed(e.target.checked)}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!refundModeConfirmed}
              style={refundModeConfirmed ? buttonStyle : disabledButtonStyle}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#1f2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#000000";
                }
              }}
            >
              Submit Return Request
            </button>
          </div>
        )}

        {/* Address Selection Modal */}
        {showmeaddress && (
          <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "60vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
             overflowY:"scroll",
            padding: "16px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "100%",
              Height: "60vh",
              overflowY:"scroll",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}>
              <AddressList 
                loc="return" 
                onClose={() => setshowmeaddress(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return <ReturnRequest />;
}

export default App;