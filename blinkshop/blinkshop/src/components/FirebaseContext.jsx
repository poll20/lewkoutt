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

export const FirebaseAuthProvider = ({ children,showPopup }) => {
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
  // const initRecaptcha = () => {
  //   if (!hasRecaptchaInitialized.current && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //       size: "invisible",
  //       callback: () => console.log("✅ reCAPTCHA verified"),
  //     });

  //     window.recaptchaVerifier.render().then(() => {
  //       console.log("✅ reCAPTCHA rendered successfully");
  //       hasRecaptchaInitialized.current = true;
  //     });
  //   }
  // };

  // // ✅ Send OTP
  // const sendOTP = async (phoneNumber) => {
  //   setLoading(true);
  //   try {
  //     initRecaptcha();
  //     const appVerifier = window.recaptchaVerifier;
  //     await appVerifier.render(); // Just in case
  //     const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
  //     setConfirmationResult(result);
  //     console.log("📤 OTP sent to:", phoneNumber);
  //     return { success: true };
  //   } catch (err) {
  //     console.error("❌ Error sending OTP:", err);
  //     return { success: false, error: err.message };
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// ✅ Initialize invisible reCAPTCHA only once with better cleanup
const initRecaptcha = () => {
  try {
    // Clear existing verifier if any
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Could not clear existing verifier:", e);
      }
      window.recaptchaVerifier = null;
    }

    // Create new verifier
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("✅ reCAPTCHA verified");
      },
      'expired-callback': () => {
        console.warn("⚠️ reCAPTCHA expired");
        // Reset verifier on expiry
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
          hasRecaptchaInitialized.current = false;
        }
      }
    });

    hasRecaptchaInitialized.current = true;
    console.log("✅ reCAPTCHA initialized");
  } catch (error) {
    console.error("❌ reCAPTCHA init error:", error);
    hasRecaptchaInitialized.current = false;
    throw error;
  }
};

// ✅ Send OTP with better error handling
const sendOTP = async (phoneNumber) => {
  setLoading(true);
  setError(null);
  
  try {
    // Initialize reCAPTCHA if needed
    if (!window.recaptchaVerifier || !hasRecaptchaInitialized.current) {
      initRecaptcha();
    }

    const appVerifier = window.recaptchaVerifier;
    
    // Send OTP
    const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
    setConfirmationResult(result);
    console.log("📤 OTP sent to:", phoneNumber);
    return { success: true };
    
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    
    // Better error messages
    let errorMessage = "Failed to send OTP. Please try again.";
    
    if (err.code === 'auth/too-many-requests') {
      errorMessage = "Too many attempts. Please try again after some time.";
    } else if (err.code === 'auth/invalid-phone-number') {
      errorMessage = "Invalid phone number format.";
    } else if (err.code === 'auth/quota-exceeded') {
      errorMessage = "SMS quota exceeded. Please try again later.";
    } else if (err.message.includes('reCAPTCHA')) {
      errorMessage = "Verification failed. Please refresh and try again.";
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.warn("Could not clear verifier:", e);
        }
        window.recaptchaVerifier = null;
        hasRecaptchaInitialized.current = false;
      }
    }
    
    setError(errorMessage);
    return { success: false, error: errorMessage };
    
  } finally {
    setLoading(false);
  }
};

  // // ✅ Verify OTP
  // const verifyOTP = async (otp,refcode) => {
  //   setLoading(true);
  //   try {
  //     if (!confirmationResult) {
  //       throw new Error("OTP confirmation object not found. Please request OTP again.");
  //     }

  //     const result = await confirmationResult.confirm(otp);
  //     const signedInUser = result.user;
  //     setUser(signedInUser);
  //     console.log("✅ OTP Verified:", signedInUser.phoneNumber);

  //     await registerUser(signedInUser,refcode);
      
  //     return { success: true };
      
  //   } catch (err) {
  //     console.error("❌ OTP verification failed:", err);
  //     return { success: false, error: err.message };
  //   } finally {
  //     setLoading(false);
  //     setTimeout(() => {
  //       window.location.reload();
  //   }, 300);

  //   }
  // };
// ✅ Verify OTP
const verifyOTP = async (otp, refcode) => {
  setLoading(true);
  try {
    if (!confirmationResult) {
      throw new Error("OTP confirmation object not found. Please request OTP again.");
    }

    const result = await confirmationResult.confirm(otp);
    const signedInUser = result.user;
    setUser(signedInUser);
    console.log("✅ OTP Verified:", signedInUser.phoneNumber);

    // 🔑 Firebase ID token lo
    const idToken = await signedInUser.getIdToken();

    // 🔥 Backend ko bhejo
    const res = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      credentials: "include", // cookie set hoga
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, refcode }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Session login failed");
    }

      const data = await res.json();
      console.log("✅ Registration successful", data);

      setUserDetails(data);
      setIsRegistered(true);
      await fetchUserDetails(firebaseUser)
    console.log("✅ Session cookie set");
    return { success: true };
  } catch (err) {
    console.error("❌ OTP verification failed:", err);
    return { success: false, error: err.message };
  } finally {
    setLoading(false);
    // setTimeout(() => window.location.reload(), 300);
  }
};

  // ✅ Register user in backend
  const registerUser = async (firebaseUser,refcode) => {
    try {
      if (!firebaseUser || isRegistered) return;

      console.log("📦 Registering user:", firebaseUser.phoneNumber);
      const res = await fetch(`${apiUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: firebaseUser.phoneNumber,uid:firebaseUser.uid ,refcode:refcode}),
      });

      if (!res.ok) throw new Error(`Failed to register: ${res.statusText}`);

      const data = await res.json();
      console.log("✅ Registration successful", data);

      setUserDetails(data);
      setIsRegistered(true);
      await fetchUserDetails(firebaseUser)
    } catch (e) {
      console.error("❌ Registration error:", e.message);
      setError(e.message);
    }
  };

  const addnameemail = async (data,userid) => {
    console.log("datform ka or userid",data,userid)
    try {
      const response = await fetch(`${apiUrl}/useredit`, {
        method: 'PATCH',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data,userid}),
      });
  
      const result = await response.json();
      console.log('Response:', result);
  
      if (response.ok) {
       fetchUserDetails(user)
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error!');
    }
  };
  

  // ✅ Fetch user details (like profile info)
  const fetchUserDetails = async (firebaseUser) => {
    console.log("phonumber ke liye hai ye huh",firebaseUser)
    try {
      setLoading(true);
      const phone = firebaseUser.phoneNumber;
      const encodedPhone = encodeURIComponent(phone);
      const res = await fetch(`${apiUrl}/user/profile?phoneNumber=${encodedPhone}`);
      if (!res.ok) throw new Error("User details fetch failed");

      const data = await res.json();
      console.log("dat mil afirbasekeauth se",data)
      setUserDetails(data);
      setIsRegistered(true);
    } catch (err) {
      console.error("❌ Error fetching user details:", err.message);
      setUserDetails({});
    } finally {
      setLoading(false);
    }
  };




const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetails({});
      setIsRegistered(false);
  
      // Clear recaptcha
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (err) {
          console.warn("⚠️ Error clearing recaptcha:", err.message);
        }
        window.recaptchaVerifier = null;
      }
  
      hasRecaptchaInitialized.current = false; // 👈 force re-init
      console.log("👋 Logged out successfully");
  
      setTimeout(() => {
        // window.location.reload();
      }, 300);
  
      return { success: true };
  
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
      return { success: false, error: err.message };
    }
  };
  
// //   ✅ Fetch profile only when registered
useEffect(() => {
        if (isRegistered) {
            console.log("current user to aa hi jayegaa",user,isRegistered)
          fetchUserDetails(user);
        }
   
        
      }, [isRegistered]);
    
      
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
        addnameemail
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
