// import { useState, useRef, useEffect } from "react";
//     import { FaLock } from "react-icons/fa";
//    import { FaPhone } from "react-icons/fa6";
//     import { useLocation } from "react-router-dom";
//     // import { BiTime } from "react-icons/bi";
//     // import { MdSecurity } from "react-icons/md";

//     // import { useFirebaseAuth } from "./firebaseContext"; // Import Firebase Context

//     // import { useUser } from "./userContext"; // Import User Context

//     import { useFirebaseAuth } from "./FirebaseContext";
//     import { useUser } from "./UserContext";
//     import { useNavigate } from "react-router-dom";

//     const OtpLogin = () => {
//     const { sendOTP, verifyOTP, loading ,initRecaptcha,user, isRegistered} = useFirebaseAuth();
//     const { setUser } = useUser();
    
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [showOTP, setShowOTP] = useState(false);
//     const [otp, setOtp] = useState(new Array(6).fill(""));
//     const [error, setError] = useState("");
//     const [timer, setTimer] = useState(30);
//     const [canResend, setCanResend] = useState(false);
//     const inputRefs = useRef([]);
//     // const [confirmationResult, setConfirmationResult] = useState(null);
//     const [referralCode, setReferralCode] = useState("");
//     const navigate=useNavigate()


//     const location = useLocation();
    
//   if( isRegistered){
//     navigate(-1)
//   }
//     useEffect(() => {
//       const params = new URLSearchParams(location.search);
//       const ref = params.get("ref");
//       if (ref) {
//         setReferralCode(ref);
//       }
//     }, [location]);

//     useEffect(() => {
//         if (timer > 0 && !canResend) {
//         const interval = setInterval(() => {
//             setTimer((prev) => prev - 1);
//         }, 1000);
//         return () => clearInterval(interval);
//         } else if (timer === 0) {
//         setCanResend(true);
//         }
//     }, [timer, canResend]);

//     const handlePhoneSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         if (phoneNumber.length < 10) {
//         setError("Please enter a valid phone number");
//         return;
//         }

//         const { success, error } = await sendOTP(phoneNumber);
//         if (success) {
//         setShowOTP(true);
//         } else {
//         setError(error || "Failed to send OTP. Please try again.");
//         }
//     };

//     const handleChange = (element, index) => {
//         if (isNaN(element.value)) return;
//         setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
//         if (element.value && index < 5) {
//         inputRefs.current[index + 1].focus();
//         }
//     };

//     const handleKeyDown = (e, index) => {
//         if (e.key === "Backspace") {
//         if (!otp[index] && index > 0) {
//             inputRefs.current[index - 1].focus();
//         }
//         setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
//         }
//     };

//     const handleSubmit = async (e,refcode) => {
//         e.preventDefault();
//         if (otp.join("").length !== 6) {
//         setError("Please enter a valid 6-digit OTP");
//         return;
//         }

//         const { success, user, error } = await verifyOTP(otp.join(""),referralCode);
//         if (success) {
//         setUser(user); // Store user data in context
//         //   alert("OTP Verified Successfully");
//         setTimeout(() => {
//             navigate(-1)
//         }, 200);
//         } else {
//         setError(error || "Invalid OTP. Please try again.");
//         }
//     };

//     const handleResend = () => {
//         setTimer(30);
//         setCanResend(false);
//         setOtp(new Array(6).fill("")); 
//         setError("");
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//         const el = document.getElementById("recaptcha-container");
//         if (el && !window.recaptchaVerifier) {
//             initRecaptcha();
//         }
//         }, 100); // Thoda delay do DOM render hone ka
    
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div style={{marginTop:"50px"}} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div id="recaptcha-container"style={{ display: 'none' }}></div>
//         <div className="max-w-md w-full bg-black rounded-2xl shadow-xl p-8 space-y-8" style={{backgroundColor:"white"}}>
//             <div className="text-center"style={{backgroundColor:"white"}}>
//             <div className="mb-4 inline-block p-3 rounded-full bg-indigo-100">
//                 {showOTP ? <FaLock className="text-indigo-600 text-2xl" /> : <FaPhone />}
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">{showOTP ? "OTP Verification" : "Phone Verification"}</h1>
//             <p className="mt-2 text-gray-600">
//                 {showOTP ? "Please enter the 6-digit code sent to your device" : "Enter your phone number to receive OTP"}
//             </p>
//             </div>

//             {!showOTP ? (
//             <form onSubmit={handlePhoneSubmit}>
//                 <div className="space-y-4" style={{backgroundColor:"white"}}>
//                 <input
//                     type="tel"
//                     placeholder="Enter your phone number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     //   onChange={(e) => setPhoneNumber(e.target.value)}
//   style={{
//     width: "100%",             // w-full
//     padding: "12px 16px",      // px-4 py-3
//     border: "2px solid #D1D5DB", // border-2 (gray-300 type)
//     borderRadius: "8px",       // rounded-lg
//     color: "#374151",          // text-gray-700
//     outline: "none",           // focus:outline-none
//     transition: "all 0.2s ease-in-out", // transition-all duration-200
//   }}
//   onFocus={(e) =>
//     (e.target.style.border = "2px solid #6366F1") // focus:border-indigo-500
//   }
//   onBlur={(e) =>
//     (e.target.style.border = "2px solid #D1D5DB") // वापस normal border
//   }
//                     // className="w-full px-4 py-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none transition-all duration-200"
//                 />
//                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                 <button
//                     type="submit"
//                     style={{
//                     width: "100%",
//                     padding: "12px",
//                     backgroundColor: "black",
//                     color: "white",
//                     borderRadius: "8px",
//                     fontWeight: "bold",
//                     boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                     cursor: loading ? "not-allowed" : "pointer",
//                     opacity: loading ? 0.5 : 1,
//                     transition: "background-color 0.2s",
//                     }}
//                 >
//                     Send OTP
//                 </button>
//                 </div>
//             </form>
//             ) : (
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%", maxWidth: "400px", margin: "auto" }}>
//                 <div style={{ display: "flex", width: "100%", gap: "8px",backgroundColor:"white"}}>
//                 {otp.map((digit, index) => (
//                     <input
//                     key={index}
//                     type="tel"
//                     maxLength="1"
//                     ref={(ref) => (inputRefs.current[index] = ref)}
//                     value={digit}
//                     onChange={(e) => handleChange(e.target, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     style={{
//                         flex: 1,
//                         height: "50px",
//                         border: "2px solid rgb(0, 0, 0)",
//                         borderRadius: "8px",
//                         textAlign: "center",
//                         fontSize: "20px",
//                         fontWeight: "bold",
//                         outline: "none",
//                         transition: "all 0.2s",
//                     }}
//                     disabled={loading}
//                     />
//                 ))}
//                 </div>

//                 {error && <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>{error}</p>}

//                 <button
//                 type="submit"
//                 disabled={loading || otp.join("").length !== 6}
//                 style={{
//                     width: "100%",
//                     padding: "12px",
//                     backgroundColor: "black",
//                     color: "white",
//                     borderRadius: "8px",
//                     fontWeight: "bold",
//                     boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                     cursor: loading ? "not-allowed" : "pointer",
//                     opacity: loading ? 0.5 : 1,
//                     transition: "background-color 0.2s",
//                 }}
//                 >
//                 Verify OTP
//                 </button>

//                 <div className="text-center">
//                 <button
//                     type="button"
//                     onClick={handleResend}
//                     disabled={!canResend}
//                     style={{
//                     color: canResend ? "blue" : "gray",
//                     cursor: canResend ? "pointer" : "not-allowed",
//                     fontSize: "14px",
//                     textDecoration: "underline",
//                     }}
//                 >
//                     {canResend ? "Resend OTP" : `Resend in ${timer}s`}
//                 </button>
//                 </div>
//             </form>
//             )}
//         </div>
//         {referralCode && (
//         <div
//           style={{
//             backgroundColor: "#f0f0f0",
//             padding: "10px",
//             borderRadius: "5px",
//             marginBottom: "15px",
//           }}
//         >
//           <strong>Referral Code:</strong> {referralCode}
//         </div>
//       )}
//         </div>


//     );
//     };

//     export default OtpLogin;









import { useState, useRef, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./FirebaseContext";
import { useUser } from "./UserContext";

const OtpLogin = () => {
  const { sendOTP, verifyOTP, loading, initRecaptcha, isRegistered } = useFirebaseAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const inputRefs = useRef([]);

  // Redirect if already registered
  if (isRegistered) navigate(-1);

  // Capture referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, [location]);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) setCanResend(true);
  }, [timer, canResend]);

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // Clear old instance if any
    }
    initRecaptcha(); // Create a new one
  };

  // Handle sending OTP
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (phoneNumber.length < 10) return setError("Enter a valid phone number");

    setupRecaptcha(); // ✅ Always setup before sending OTP

    const { success, error } = await sendOTP(phoneNumber);
    if (success) setShowOTP(true);
    else setError(error || "Failed to send OTP. Try again.");
  };

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value && index < 5) inputRefs.current[index + 1].focus();
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) inputRefs.current[index - 1].focus();
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
    }
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) return setError("Enter a valid 6-digit OTP");

    const { success, user, error } = await verifyOTP(otp.join(""), referralCode);
    if (success) {
      setUser(user);
      navigate(-1);
    } else setError(error || "Invalid OTP. Try again.");
  };

  // Resend OTP
  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(new Array(6).fill(""));
    setError("");
    setupRecaptcha();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" style={{ marginTop: "50px" }}>
      <div id="recaptcha-container" style={{ display: "none" }}></div>

      <div className="max-w-md w-full rounded-2xl shadow-xl p-8 space-y-8 bg-white">
        <div className="text-center">
          <div className="mb-4 inline-block p-3 rounded-full bg-indigo-100">
            {showOTP ? <FaLock className="text-indigo-600 text-2xl" /> : <FaPhone />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{showOTP ? "OTP Verification" : "Phone Verification"}</h1>
          <p className="mt-2 text-gray-600">{showOTP ? "Enter the 6-digit code sent to your device" : "Enter your phone number to receive OTP"}</p>
        </div>

        {!showOTP ? (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg text-gray-700 focus:border-indigo-500 focus:outline-none transition-all duration-200 mb-2"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white font-bold rounded-lg mt-2"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <div className="flex w-full gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength="1"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="flex-1 h-12 border-2 rounded-lg text-center text-xl font-bold outline-none"
                  disabled={loading}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="w-full py-3 bg-black text-white font-bold rounded-lg"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm underline ${canResend ? "text-blue-600" : "text-gray-400 cursor-not-allowed"}`}
            >
              {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </button>
          </form>
        )}

        {referralCode && (
          <div className="bg-gray-100 p-2 rounded-md mt-2 text-center">
            <strong>Referral Code:</strong> {referralCode}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpLogin;
