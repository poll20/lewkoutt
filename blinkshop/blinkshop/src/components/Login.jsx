import React from "react";
import { CiUser } from "react-icons/ci";
// import { FaRegUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Import the custom hook
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase/firebase"; // adjust path

import { useFirebaseAuth } from "./FirebaseContext";
const LoginButton = () => {
  // const {
  //   user,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   handleLogout,
  //   loading,
  //   error,
  // } = useAuth();
  const navigate=useNavigate()
const{
  user,
  userDetails,
  isRegistered,
  loading,
  error,
  sendOTP,
  verifyOTP,
  logout,
  fetchUserDetails,
  initRecaptcha
}=useFirebaseAuth()
  return (
    <div>
      {/* {loading && <p>Loading...</p>} */}
      { isRegistered ? (
      <NavLink to={"/Profile"}><svg style={{width:"30px",height:"30px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
</NavLink>
     ) : 
     (
      <CiUser size={30} onClick={() =>navigate("/loginn") }></CiUser>
     )
    //  (
    //    <CiUser size={30} onClick={() => loginWithRedirect({
    //     redirect_uri: window.location.origin, // Automatically sets correct URL
    //   })}></CiUser>
    // )
    }
    </div>
  );
};

export default LoginButton;
