// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";
// import { app } from "./firebase"; // Import your Firebase config

// const auth = getAuth(app);

// const FirebaseAuthContext = createContext();

// export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

// export const FirebaseAuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   const inputRefs = useRef([]);

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

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       console.log("Logged out successfully");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <FirebaseAuthContext.Provider
//       value={{
//         currentUser,
//         loading,
//         sendOTP,
//         verifyOTP,
//         logout,
//         inputRefs,
//       }}
//     >
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// }; 

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase"; // Firebase config import

// Firebase Authentication setup
const auth = getAuth(app);

// Firebase Auth Context
const FirebaseAuthContext = createContext();

// Custom hook for Firebase Auth context
export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL; // API URL for fetching data
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const inputRefs = useRef([]);

  // Handle user state changes on authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log("reCAPTCHA verified")
      });
    }
  }, []);

  // Register User API call
  const registerUser = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  console.log("usr h na",user)
      if (user && !isRegistered) {
        setLoading(true);
        const response = await fetch(`${apiUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: user.phoneNumber,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Registration failed: ${response.statusText}`);
        }
  
        const data = await response.json();
        setUserDetails(data);
        setIsRegistered(true);
      }
    } catch (e) {
      setError(`Registration error: ${e.message}`);
      console.log(`Registration error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Details from API after registration
  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/user/profile?email=${currentUser.email}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.statusText}`);
      }

      const data = await response.json();
      setUserDetails(data);
    } catch (e) {
      setError(`Fetch error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Automatically register user when authenticated
  useEffect(() => {
    console.log("current user bhi hai naa",currentUser)
    if (currentUser) {
      registerUser();
    }
  }, [currentUser]);

  // Fetch user details when authenticated and registered
  useEffect(() => {
    if (currentUser && isRegistered) {
      fetchUserDetails();
    }
  }, [currentUser, isRegistered]);

  // OTP send functionality (Firebase)
  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      return { success: true };
    } catch (err) {
      console.error("Error sending OTP:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // OTP verification functionality (Firebase)
  const verifyOTP = async (otp) => {
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      setCurrentUser(result.user);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("OTP verification failed:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout functionality
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsRegistered(false);
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
        fetchUserDetails, // Exposing this functionality
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
