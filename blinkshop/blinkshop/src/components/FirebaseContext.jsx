

// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";
// import { app } from "./firebase"; // Firebase config import

// // Firebase Authentication setup
// const auth = getAuth(app);

// // Firebase Auth Context
// const FirebaseAuthContext = createContext();

// // Custom hook for Firebase Auth context
// export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

// export const FirebaseAuthProvider = ({ children }) => {
//   const apiUrl = import.meta.env.VITE_API_URL; // API URL for fetching data
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userDetails, setUserDetails] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   const inputRefs = useRef([]);

//   // Handle user state changes on authentication
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible',
//         callback: () => console.log("reCAPTCHA verified")
//       });
//     }
//   }, []);

//   // Register User API call
//   const registerUser = async () => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//   console.log("usr h na",user)
//       if (user && !isRegistered) {
//         setLoading(true);
//         const response = await fetch(`${apiUrl}/user/register`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             phoneNumber: user.phoneNumber,
//           }),
//         });
  
//         if (!response.ok) {
//           throw new Error(`Registration failed: ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         setUserDetails(data);
//         setIsRegistered(true);
//       }
//     } catch (e) {
//       setError(`Registration error: ${e.message}`);
//       console.log(`Registration error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch User Details from API after registration
//   const fetchUserDetails = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrl}/user/profile?email=${currentUser.email}`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch user details: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setUserDetails(data);
//     } catch (e) {
//       setError(`Fetch error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Automatically register user when authenticated
//   useEffect(() => {
//     console.log("current user bhi hai naa",currentUser)
//     if (currentUser) {
//         console.log("chall bhi ja sjan")
//       registerUser();
//     }
//   }, [currentUser]);

//   // Fetch user details when authenticated and registered
//   useEffect(() => {
//     if (currentUser && isRegistered) {
//       fetchUserDetails();
//     }
//   }, [currentUser, isRegistered]);

//   // OTP send functionality (Firebase)
//   const sendOTP = async (phoneNumber) => {
//     setLoading(true);
//     try {
//       const appVerifier = window.recaptchaVerifier;
//       const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
//       setConfirmationResult(result);
//       return { success: true };
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // OTP verification functionality (Firebase)
//   const verifyOTP = async (otp) => {
//     setLoading(true);
//     try {
//       const result = await confirmationResult.confirm(otp);
//       setCurrentUser(result.user);
//       return { success: true, user: result.user };
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout functionality
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       setIsRegistered(false);
//       console.log("Logged out successfully");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <FirebaseAuthContext.Provider
//       value={{
//         currentUser,
//         userDetails,
//         isRegistered,
//         loading,
//         error,
//         sendOTP,
//         verifyOTP,
//         logout,
//         fetchUserDetails, // Exposing this functionality
//       }}
//     >
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { app } from "./firebase";

// const auth = getAuth(app);
// const FirebaseAuthContext = createContext();

// export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

// export const FirebaseAuthProvider = ({ children }) => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userDetails, setUserDetails] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const inputRefs = useRef([]);

//   // On mount setup reCAPTCHA
//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible',
//         callback: () => console.log("reCAPTCHA verified")
//       });
//     }
//   }, []);

//   // Firebase auth listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Register User API call
//   const registerUser = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user && !isRegistered) {
//         console.log("Registering user:", user.phoneNumber);
//         setLoading(true);
//         const response = await fetch(`${apiUrl}/user/register`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ phoneNumber: user.phoneNumber }),
//         });

//         if (!response.ok) {
//           throw new Error(`Registration failed: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setUserDetails(data);
//         setIsRegistered(true);
//       }
//     } catch (e) {
//       console.error("Registration error:", e.message);
//       setError(`Registration error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user profile
//   const fetchUserDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${apiUrl}/user/profile?email=${currentUser.email}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch user details: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setUserDetails(data);
//     } catch (e) {
//       setError(`Fetch error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Directly call registerUser after OTP is verified
//   const verifyOTP = async (otp) => {
//     setLoading(true);
//     try {
//       const result = await confirmationResult.confirm(otp);
//       const user = result.user;
//       setCurrentUser(user);
//       console.log("OTP Verified. User:", user.phoneNumber);
//       await registerUser(); // ✅ CALL REGISTER HERE
//       return { success: true, user };
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//       return { success: false, error: error.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendOTP = async (phoneNumber) => {
//     setLoading(true);
//     try {
//       const appVerifier = window.recaptchaVerifier;
//       const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
//       setConfirmationResult(result);
//       return { success: true };
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       setIsRegistered(false);
//       setUserDetails({});
//       console.log("Logged out successfully");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   // Optional: fetch profile when both user & isRegistered are set
//   useEffect(() => {
//     if (currentUser && isRegistered) {
//       fetchUserDetails();
//     }
//   }, [currentUser, isRegistered]);

//   return (
//     <FirebaseAuthContext.Provider
//       value={{
//         currentUser,
//         userDetails,
//         isRegistered,
//         loading,
//         error,
//         sendOTP,
//         verifyOTP,
//         logout,
//         fetchUserDetails,
//       }}
//     >
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const FirebaseAuthContext = createContext();

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const inputRefs = useRef([]);

  // ✅ Setup Recaptcha once on mount
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log("✅ reCAPTCHA verified"),
      });
    }
  }, []);

  // ✅ Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔁 Auth state changed:", user?.phoneNumber);
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Register user to backend
//   const registerUser = async () => {
//     try {
//       await new Promise((res) => setTimeout(res, 500)); // Ensure auth.currentUser is set

//       const user = auth?.currentUser;
//       console.log("📲 Trying to register:", user.phoneNumber);
//       if (!user || isRegistered) return;

//       setLoading(true);

//       console.log("🌐 Sending registration request to:", `${apiUrl}/user/register`);
//       const response = await fetch(`${apiUrl}/user/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ phoneNumber: user.phoneNumber }),
//       });

//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`❌ Registration failed: ${text}`);
//       }

//       const data = await response.json();
//       console.log("✅ User registered:", data);
//       setUserDetails(data);
//       setIsRegistered(true);
//     } catch (e) {
//       console.error("❌ Registration error:", e.message);
//       setError(`Registration error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
const registerUser = async () => {
    try {
      const user = auth.currentUser;
      console.log("🔥 Inside registerUser", user);
  
      if (user && !isRegistered) {
        console.log("📦 Registering user:", user.phoneNumber);
        setLoading(true);
  
        const response = await fetch(`${apiUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: user.phoneNumber }),
        });
  
        console.log("📥 Response status:", response.status);
  
        if (!response.ok) {
          throw new Error(`Registration failed: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("✅ Registered user details:", data);
  
        setUserDetails(data);
        setIsRegistered(true);
      } else {
        console.warn("⛔ No user or already registered:", user, isRegistered);
      }
    } catch (e) {
      console.error("❌ Registration error:", e.message);
      setError(`Registration error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ Verify OTP & Register User
  const verifyOTP = async (otp) => {
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      setCurrentUser(user);
      console.log("✅ OTP Verified:", user.phoneNumber);
      await registerUser(); // ✅ Register after OTP success
      return { success: true, user };
    } catch (err) {
      console.error("❌ OTP verification failed:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Send OTP
  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      console.log("📤 OTP sent to:", phoneNumber);
      return { success: true };
    } catch (err) {
      console.error("❌ Error sending OTP:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsRegistered(false);
      setUserDetails({});
      console.log("👋 Logged out successfully");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  // ✅ Fetch profile from backend
  const fetchUserDetails = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/user/profile?email=${currentUser.email}`);
      if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (e) {
      setError(`Fetch error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch profile only when registered
  useEffect(() => {
    if (currentUser && isRegistered) {
      fetchUserDetails();
    }
  }, [currentUser, isRegistered]);

  return (
    <FirebaseAuthContext.Provider
      value={{
        currentUser,
        userDetails,
        isRegistered,
        loading,
        error,
        sendOTP,
        verifyOTP,
        logout,
        fetchUserDetails,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
