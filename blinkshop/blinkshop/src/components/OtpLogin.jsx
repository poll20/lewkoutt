

// import { useState, useRef, useEffect } from "react";
// import { FaLock, FaPhone } from "react-icons/fa";
// import { BiTime } from "react-icons/bi";
// import { MdSecurity } from "react-icons/md";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
// const OtpLogin = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showOTP, setShowOTP] = useState(false);

//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (timer > 0 && !canResend) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//   }, [timer, canResend]);

// //   const handlePhoneSubmit = (e) => {
// //     e.preventDefault();
// //     if (phoneNumber.length < 10) {
// //       setError("Please enter a valid phone number");
// //       return;
// //     }
// //     setShowOTP(true);
// //     setError("");
// //   };
// let confirmationResult = null;

// const handlePhoneSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   if (phoneNumber.length < 10) {
//     setError("Please enter a valid phone number");
//     setLoading(false);
//     return;
//   }

//   try {
//     // Initialize invisible reCAPTCHA
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       size: 'invisible',
//       callback: (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         console.log("Recaptcha verified");
//       },
//     });

//     const appVerifier = window.recaptchaVerifier;

//     // Send OTP
//     confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
//     console.log("OTP sent!");
//     setShowOTP(true);
//     setError("");
//   } catch (error) {
//     console.error("Error during signInWithPhoneNumber", error);
//     setError("Failed to send OTP. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return;
//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
//     if (element.value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       if (!otp[index] && index > 0) {
//         inputRefs.current[index - 1].focus();
//       }
//       setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
//     }
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     if (otp.join("").length !== 6) {
// //       setError("Please enter a valid 6-digit OTP");
// //       setLoading(false);
// //       return;
// //     }

// //     setTimeout(() => {
// //       setLoading(false);
// //     }, 2000);
// //   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
  
//     if (otp.join("").length !== 6) {
//       setError("Please enter a valid 6-digit OTP");
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const result = await confirmationResult.confirm(otp.join(""));
//       console.log("User signed in successfully!", result.user);
//       alert("OTP Verified Successfully");
//     } catch (error) {
//       console.error("OTP verification failed", error);
//       setError("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleResend = () => {
//     setTimer(30);
//     setCanResend(false);
//     setOtp(new Array(6).fill(""));
//     setError("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div id="recaptcha-container"></div>
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
//         <div className="text-center">
//           <div className="mb-4 inline-block p-3 rounded-full bg-indigo-100">
//             {showOTP ? (
//               <FaLock className="text-indigo-600 text-2xl" />
//             ) : (
//               <FaPhone className="text-indigo-600 text-2xl" />
//             )}
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {showOTP ? "OTP Verification" : "Phone Verification"}
//           </h1>
//           <p className="mt-2 text-gray-600">
//             {showOTP
//               ? "Please enter the 6-digit code sent to your device"
//               : "Enter your phone number to receive OTP"}
//           </p>
//         </div>

//         {!showOTP ? (
//           <form onSubmit={handlePhoneSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <input
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full px-4 py-3 border-2 rounded-lg text-gray-700
//                            focus:border-indigo-500 focus:outline-none
//                            transition-all duration-200"
//                 // maxLength="10"
//               />
//               {error && (
//                 <p className="text-red-500 text-sm text-center">{error}</p>
//               )}
//                <button
//             //   type="submit"
//             //   disabled={loading || otp.join("").length !== 6}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 backgroundColor: "black",
//                 color: "white",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 opacity: loading ? 0.5 : 1,
//                 transition: "background-color 0.2s",
//               }}
//             >
//               Send Otp
//             </button>
//             </div>
//           </form>
//         ) : (
//             <form
//             onSubmit={handleSubmit}
//             style={{
              
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "16px",
//               width: "100%",
//               maxWidth: "400px",
//               margin: "auto",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: "100%",
//                 gap: "8px",
//               }}
//             >
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   ref={(ref) => (inputRefs.current[index] = ref)}
//                   value={digit}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   style={{
//                     flex: 1,
//                     height: "50px",
//                     border: "2px solidrgb(0, 0, 0)",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                     outline: "none",
//                     transition: "all 0.2s",
//                   }}
//                   disabled={loading}
//                 />
//               ))}
//             </div>
          
//             {error && <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>{error}</p>}
          
//             <button
//               type="submit"
//               disabled={loading || otp.join("").length !== 6}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 backgroundColor: "black",
//                 color: "white",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 opacity: loading ? 0.5 : 1,
//                 transition: "background-color 0.2s",
//               }}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
          
//             <div style={{ textAlign: "center", color: "#555" }}>
//               <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
//                 <BiTime style={{ fontSize: "20px" }} />
//                 <span>
//                   {canResend ? (
//                     <button
//                       onClick={handleResend}
//                       style={{
//                         color: "#4F46E5",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       Resend OTP
//                     </button>
//                   ) : (
//                     `Resend available in ${timer}s`
//                   )}
//                 </span>
//               </div>
//             </div>
//           </form>
          
          
//         )}

//         <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
//           <MdSecurity className="text-lg" />
//           <span>Secure and encrypted verification</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpLogin;

import React, { useState, useRef, useEffect } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
import { FaLock, FaPhone } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => handleSendOtp(),
      },
      auth
    );
  };

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, "+91" + phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowOTP(true);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await confirmationResult.confirm(otp.join(""));
      console.log("User signed in successfully!", res.user);
      alert("OTP Verified Successfully!");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleOtpChange = (e, index) => {
    if (!isNaN(e.target.value)) {
      const newOtp = [...otp];
      newOtp[index] = e.target.value;
      setOtp(newOtp);
      if (e.target.value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    handleSendOtp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="mb-4 inline-block p-3 rounded-full bg-indigo-100">
            {showOTP ? (
              <FaLock className="text-indigo-600 text-2xl" />
            ) : (
              <FaPhone className="text-indigo-600 text-2xl" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {showOTP ? "OTP Verification" : "Phone Verification"}
          </h1>
          <p className="mt-2 text-gray-600">
            {showOTP
              ? "Enter the OTP sent to your phone"
              : "Enter your phone number to get OTP"}
          </p>
        </div>

        {!showOTP ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-bold"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg"
                />
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-bold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-sm text-gray-600 mt-2">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-indigo-600 font-semibold"
                >
                  Resend OTP
                </button>
              ) : (
                `Resend in ${timer}s`
              )}
            </div>
          </form>
        )}
        <div className="text-sm text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
          <MdSecurity className="text-lg" />
          Secure and encrypted verification
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default OtpLogin;
