

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



















// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber ,PhoneAuthProvider,signInWithCredential, signOut,onAuthStateChanged } from "firebase/auth";
// import {
//   auth,
// //   RecaptchaVerifier,
// //   signInWithPhoneNumber,
// //   signOut,
// //   onAuthStateChanged,
// } from "./firebase";
// //  import {auth} from "./firebase";

// // const auth = getAuth(app);
// const FirebaseAuthContext = createContext();

// export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

// export const FirebaseAuthProvider = ({ children }) => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [user, setCurrentUser] = useState(null);
//   const [userDetails, setUserDetails] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const inputRefs = useRef([]);


// // useEffect(() => {
// //     // Check if recaptchaVerifier is already initialized
// //     if (!window.recaptchaVerifier) {
// //       console.log("🔄 Initializing reCAPTCHA...");
// //       // Check if the container element exists before initializing
// //       const recaptchaContainer = document.getElementById("recaptcha-container");
// //       if (recaptchaContainer) {
// //         try {
// //           window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
// //             size: "invisible",
// //             callback: () => console.log("✅ reCAPTCHA verified"),
// //           });
// //           console.log("✅ reCAPTCHA initialized successfully.");
// //         } catch (error) {
// //           console.error("❌ Error initializing reCAPTCHA:", error.message);
// //         }
// //       } else {
// //         console.error("❌ reCAPTCHA container element not found.");
// //       }
// //     } else {
// //       console.log("🔄 reCAPTCHA already initialized.");
// //     }
// //   }, []);
// const hasInitialized = useRef(false); // 🚨 Firebase strict mode repeat ko avoid karta hai

// // useEffect(() => {
// //   if (hasInitialized.current) return;

// //   const container = document.getElementById("recaptcha-container");

// //   if (container && !window.recaptchaVerifier) {
// //     try {
// //       console.log("🔄 Initializing reCAPTCHA...");
// //       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
// //         size: "invisible",
// //         callback: (response) => {
// //           console.log("✅ reCAPTCHA verified", response);
// //         },
// //       });
// //       window.recaptchaVerifier.render().then(() => {
// //         console.log("✅ reCAPTCHA rendered successfully");
// //         hasInitialized.current = true;
// //       });
// //     } catch (error) {
// //       console.error("❌ Error initializing reCAPTCHA:", error.message);
// //     }
// //   } else {
// //     console.log("⚠️ reCAPTCHA container not found or already initialized");
// //   }
// // }, []);
  
// const initRecaptcha = () => {
//     const container = document.getElementById("recaptcha-container");
//     if (container && !window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//         callback: () => console.log("✅ reCAPTCHA verified"),
//       });
  
//       return window.recaptchaVerifier.render().then(() => {
//         console.log("✅ reCAPTCHA rendered successfully");
//       });
//     }
//   };
  

  

//   // ✅ Firebase auth state listener
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       console.log("🔁 Auth state changed:", user?.phoneNumber);
// //       setCurrentUser(user);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// useEffect(() => {
//     console.log("👀 Setting up auth state listener...");
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("✅ User signed in:", user.phoneNumber);
//       } else {
//         console.log("❌ No user signed in");
//       }
//       setCurrentUser(user);
//     });
  
//     return () => {
//       console.log("🧹 Cleaning up listener...");
//       unsubscribe();
//     };
//   }, []);

// //   🔁 Manual fallback in case auth listener delays agr optmized  verify otp code usele to tb use lena isse bhiii
// useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (!userDetails && auth.currentUser) {
//         console.warn("⏱ Fallback: Setting currentUser manually from auth.currentUser");
//         setCurrentUser(auth.currentUser);
//       }
//     }, 2000); // wait 2s
  
//     return () => clearTimeout(timeout);
//   }, []);
  
    
// // const registerUser = async () => {
// //     try {
// //       const user = auth.currentUser;
// //       console.log("🔥 Inside registerUser", user);
  
// //       if (user && !isRegistered) {
// //         console.log("📦 Registering user:", user.phoneNumber);
// //         setLoading(true);
  
// //         const response = await fetch(`${apiUrl}/user/register`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ phoneNumber: user.phoneNumber }),
// //         });
  
// //         console.log("📥 Response status:", response.status);
  
// //         if (!response.ok) {
// //           throw new Error(`Registration failed: ${response.statusText}`);
// //         }
  
// //         const data = await response.json();
// //         console.log("✅ Registered user details:", data);
  
// //         setUserDetails(data);
// //         setIsRegistered(true);
// //       } else {
// //         console.warn("⛔ No user or already registered:", user, isRegistered);
// //       }
// //     } catch (e) {
// //       console.error("❌ Registration error:", e.message);
// //       setError(`Registration error: ${e.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const registerUser = async () => {
//     try {
//       const user = auth.currentUser;
//       console.log("🔥 Inside registerUser", user);
  
//       if (user && !isRegistered) {
//         console.log("📦 Registering user:", user.phoneNumber);
//         setLoading(true);
  
//         const response = await fetch(`${apiUrl}/user/register`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phoneNumber: user.phoneNumber }),
//         });
  
//         console.log("📥 Response status:", response.status);
  
//         if (!response.ok) {
//           throw new Error(`Registration failed: ${response.statusText}`);
//         }
  
//         const data = await response.json();
//         console.log("✅ Registered user details:", data);
  
//         setUserDetails(data);
//         setIsRegistered(true);
       
//       } else {
//         console.warn("⛔ No user or already registered:", user, isRegistered);
//       }
//     } catch (e) {
//       console.error("❌ Registration error:", e.message);
//       setError(`Registration error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   // ✅ Verify OTP & Register User
// //   const verifyOTP = async (otp) => {
// //     setLoading(true);
// //     try {
// //         if (!confirmationResult) {
// //             throw new Error("OTP confirmation object not found. Please request OTP again.");
// //           }
// //       const result = await confirmationResult.confirm(otp);
// //       const user = result.user;
// //       setCurrentUser(user);
// //       console.log("✅ OTP Verified:", user.phoneNumber);
// //       await registerUser(); // ✅ Register after OTP success
// //       return { success: true, user };
// //     } catch (err) {
// //       console.error("❌ OTP verification failed:", err);
// //       return { success: false, error: err.message };
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
//   //ye verify otp ka or optimized code h isse use krna agr signed ke badd bhi user null aaaye too okk
//   const verifyOTP = async (otp) => {
//     setLoading(true);
//     try {
//       if (!confirmationResult) {
//         throw new Error("OTP confirmation object not found. Please request OTP again.");
//       }
  
//       const result = await confirmationResult.confirm(otp);
//       const user = result.user;
  
//       // ✅ Manually set user right away
//       setCurrentUser(user);
//       console.log("✅ OTP Verified & user signed in:", user.phoneNumber);
  
//       // ✅ Optional: manually trigger auth state listener fallback
//       if (!auth.currentUser) {
//         auth.currentUser = user;
//       }
  
//       await registerUser();
//       return { success: true, user };
//     } catch (err) {
//       console.error("❌ OTP verification failed:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // ✅ Send OTP
// //   const sendOTP = async (phoneNumber) => {
// //     setLoading(true);
// //     try {
// //         if (!window.recaptchaVerifier) {
// //             throw new Error("reCAPTCHA not initialized yet");
// //           }
// //       const appVerifier = window.recaptchaVerifier;
// //       const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
// //       setConfirmationResult(result);
// //       console.log("📤 OTP sent to:", phoneNumber);
// //       return { success: true };
// //     } catch (err) {
// //       console.error("❌ Error sending OTP:", err);
// //       return { success: false, error: err.message };
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const sendOTP = async (phoneNumber) => {
//     setLoading(true);
//     try {
//       if (!window.recaptchaVerifier) {
//         throw new Error("reCAPTCHA not initialized yet");
//       }
  
//       const appVerifier = window.recaptchaVerifier;
  
//       // ✅ Make sure reCAPTCHA is fully rendered before proceeding
//       await appVerifier.render();
  
//       const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
//       setConfirmationResult(result);
//       console.log("📤 OTP sent to:", phoneNumber);
//       return { success: true };
//     } catch (err) {
//       console.error("❌ Error sending OTP:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // ✅ Logout
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       setIsRegistered(false);
//       setUserDetails({});
//       console.log("👋 Logged out successfully");
//     } catch (err) {
//       console.error("❌ Logout failed:", err);
//     }
//   };

//   // ✅ Fetch profile from backend
//   const fetchUserDetails = async () => {
//     console.log("call ho randiii")
//     if (!user) return;
//     try {
//         console.log("mai usersss ko fetchh kr rha huuu........")
//       setLoading(true);
//       const encodedPhone = encodeURIComponent(user.phoneNumber);
//       const response = await fetch(`${apiUrl}/user/profile?phoneNumber=${encodedPhone}`);
//       if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
//       const data = await response.json();
//       console.log("yha milega usr ka data",data)
//       setUserDetails(data);
//     } catch (e) {
//       setError(`Fetch error: ${e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   ✅ Fetch profile only when registered
//   useEffect(() => {
//     if (user && isRegistered) {
//         console.log("current user to aa hi jayegaa",user,isRegistered)
//       fetchUserDetails();
//     }
// if(userDetails){
// console.log("agyi m tooo",userDetails)    
// }
    
//   }, [user]);

  
//   return (
//     <FirebaseAuthContext.Provider
//       value={{
//         user,
//         userDetails,
//         isRegistered,
//         loading,
//         error,
//         sendOTP,
//         verifyOTP,
//         logout,
//         fetchUserDetails,
//         initRecaptcha
//       }}
//     >
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// };
























import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

const FirebaseAuthContext = createContext();
export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const hasRecaptchaInitialized = useRef(false);

  // ✅ Setup Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("✅ User signed in:", firebaseUser.phoneNumber);
        setUser(firebaseUser);
        await fetchUserDetails(firebaseUser); // 🔥 Fetch details on login
      } else {
        console.log("❌ No user signed in");
        setUser(null);
        setUserDetails({});
        setIsRegistered(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Initialize invisible reCAPTCHA only once
  const initRecaptcha = () => {
    if (!hasRecaptchaInitialized.current && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("✅ reCAPTCHA verified"),
      });

      window.recaptchaVerifier.render().then(() => {
        console.log("✅ reCAPTCHA rendered successfully");
        hasRecaptchaInitialized.current = true;
      });
    }
  };

  // ✅ Send OTP
  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    try {
      initRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      await appVerifier.render(); // Just in case
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

  // ✅ Verify OTP
  const verifyOTP = async (otp) => {
    setLoading(true);
    try {
      if (!confirmationResult) {
        throw new Error("OTP confirmation object not found. Please request OTP again.");
      }

      const result = await confirmationResult.confirm(otp);
      const signedInUser = result.user;
      setUser(signedInUser);
      console.log("✅ OTP Verified:", signedInUser.phoneNumber);

      await registerUser(signedInUser);
      return { success: true };
    } catch (err) {
      console.error("❌ OTP verification failed:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register user in backend
  const registerUser = async (firebaseUser) => {
    try {
      if (!firebaseUser || isRegistered) return;

      console.log("📦 Registering user:", firebaseUser.phoneNumber);
      const res = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: firebaseUser.phoneNumber }),
      });

      if (!res.ok) throw new Error(`Failed to register: ${res.statusText}`);

      const data = await res.json();
      console.log("✅ Registration successful", data);

      setUserDetails(data);
      setIsRegistered(true);
    } catch (e) {
      console.error("❌ Registration error:", e.message);
      setError(e.message);
    }
  };

  // ✅ Fetch user details (like profile info)
  const fetchUserDetails = async (firebaseUser) => {
    try {
      setLoading(true);
      const phone = firebaseUser.phoneNumber;
      const encodedPhone = encodeURIComponent(phone);
      const res = await fetch(`${apiUrl}/user/details?phoneNumber=${encodedPhone}`);
      if (!res.ok) throw new Error("User details fetch failed");

      const data = await res.json();
      setUserDetails(data);
      setIsRegistered(true);
    } catch (err) {
      console.error("❌ Error fetching user details:", err.message);
      setUserDetails({});
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetails({});
      setIsRegistered(false);
      console.log("👋 Logged out successfully");
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
        userDetails,
        isRegistered,
        loading,
        error,
        sendOTP,
        verifyOTP,
        logout,
        initRecaptcha,
        fetchUserDetails,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
