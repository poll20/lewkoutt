// // OTPLogin.js
// import React, { useState } from "react";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber,PhoneAuthProvider,signInWithCredential } from "./firebase";

// const OTPLogin = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [verificationId, setVerificationId] = useState("");

//   // Setup reCAPTCHA verifier
//   const setupRecaptcha = (phoneNumber) => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("reCAPTCHA solved:", response);
//           },
//         }
//       );
//     }
  
//     const appVerifier = window.recaptchaVerifier;
  
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         setVerificationId(confirmationResult.verificationId);
//         setIsOtpSent(true);
//         console.log("OTP Sent Successfully!");
//       })
//       .catch((error) => {
//         console.error("Error during phone authentication:", error);
//       });
//   };
  
//   // Handle OTP Verification
//   const verifyOtp = () => {
//     const credential = PhoneAuthProvider.credential(verificationId, otp);
  
//     signInWithCredential(auth, credential)
//       .then((userCredential) => {
//         console.log("User signed in successfully:", userCredential.user);
//       })
//       .catch((error) => {
//         console.error("Error verifying OTP:", error);
//       });
//   };

//   return (
//     <div>
//       <div id="recaptcha-container"></div>
//       <input
//         type="text"
//         placeholder="Enter phone number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         style={{marginTop:"100px"}}
//       />
//       <button onClick={() => setupRecaptcha(phoneNumber)}>
//         Send OTP
//       </button>

//       {isOtpSent && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default OTPLogin;

// import { useState, useRef, useEffect } from "react";
// import { FaLock } from "react-icons/fa";
// import { BiTime } from "react-icons/bi";
// import { MdSecurity } from "react-icons/md";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "./firebase";

// const OtpLogin = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [verificationId, setVerificationId] = useState("");
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

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//       });
//     }
//     const appVerifier = window.recaptchaVerifier;
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         setVerificationId(confirmationResult.verificationId);
//         setIsOtpSent(true);
//       })
//       .catch((error) => setError("Failed to send OTP. Try again."));
//   };

//   const verifyOtp = () => {
//     setLoading(true);
//     const credential = PhoneAuthProvider.credential(verificationId, otp.join(""));
//     signInWithCredential(auth, credential)
//       .then(() => setError("OTP Verified Successfully!"))
//       .catch(() => setError("Invalid OTP!"))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
//         <div className="text-center">
//           <div className="mb-4 inline-block p-3 rounded-full bg-indigo-100">
//             <FaLock className="text-indigo-600 text-2xl" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">OTP Verification</h1>
//         </div>

//         {!isOtpSent ? (
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full py-2 px-4 border rounded-lg focus:border-indigo-500"
//             />
//             <button onClick={setupRecaptcha} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold">
//               Send OTP
//             </button>
//             <div id="recaptcha-container"></div>
//           </div>
//         ) : (
//           <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} className="space-y-6">
//             <div className="flex justify-center space-x-3">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   ref={(ref) => (inputRefs.current[index] = ref)}
//                   value={digit}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold focus:border-indigo-500 focus:outline-none"
//                   disabled={loading}
//                 />
//               ))}
//             </div>
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             <button type="submit" disabled={loading || otp.join("".length !== 6)} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold">
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </form>
//         )}

//         {isOtpSent && (
//           <div className="text-center">
//             <div className="flex items-center justify-center space-x-2 text-gray-600">
//               <BiTime className="text-xl" />
//               <span>
//                 {canResend ? (
//                   <button onClick={setupRecaptcha} className="text-indigo-600 font-semibold hover:text-indigo-700">
//                     Resend OTP
//                   </button>
//                 ) : (
//                   `Resend available in ${timer}s`
//                 )}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OtpLogin;

import { useState, useRef, useEffect } from "react";
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

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setShowOTP(true);
    setError("");
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (otp.join("").length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(new Array(6).fill(""));
    setError("");
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
              ? "Please enter the 6-digit code sent to your device"
              : "Enter your phone number to receive OTP"}
          </p>
        </div>

        {!showOTP ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg text-gray-700
                           focus:border-indigo-500 focus:outline-none
                           transition-all duration-200"
                maxLength="10"
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg
                           font-semibold shadow-md hover:bg-indigo-700
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           transition-all duration-200"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" style={{border:"2px solid red"}}>
            <div className="flex justify-center space-x-3" >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-2 h-12 border-2 rounded-lg text-center text-xl font-semibold
                            focus:border-indigo-500 focus:outline-none
                            transition-all duration-200
                            disabled:bg-gray-100"
                  disabled={loading}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg
                       font-semibold shadow-md hover:bg-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span className="ml-2">Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <BiTime className="text-xl" />
                <span>
                  {canResend ? (
                    <button
                      onClick={handleResend}
                      className="text-indigo-600 font-semibold hover:text-indigo-700"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    `Resend available in ${timer}s`
                  )}
                </span>
              </div>
            </div>
          </form>
        )}

        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <MdSecurity className="text-lg" />
          <span>Secure and encrypted verification</span>
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;