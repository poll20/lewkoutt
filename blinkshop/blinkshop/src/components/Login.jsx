// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from "react-icons/fc"; // Google icon
// import "./CreateAccount.css"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toasts
// // Validation Schema using Yup
// const validationSchema = Yup.object({
//   // name: Yup.string()
//   //   .matches(/^[A-Za-z]+$/, "Name must only contain alphabets")
//   //   .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters long")
//     .matches(/[a-zA-Z]/, "Password must contain both letters")
//     .matches(/\d/, "Password must contain at least one number")
//     .required("Password is required"),
//   // confirmPassword: Yup.string()
//   //   .oneOf([Yup.ref("password"), null], "Passwords must match")
//   //   .required("Confirm Password is required"),
// });

// const Login = () => {
//   const navigate = useNavigate();

//   let logindata=async(logdata)=>{
//     try{
//     let getdata=await fetch("http://localhost:3000/user")
//     let puredata= await getdata.json()
//     console.log(puredata)
//     let uemail=logdata.email
//     let upassword=logdata.password
//     let matchdata=puredata.filter((data)=>{
//    return(data.email==uemail && data.password==upassword)
//     })
//     console.log(matchdata)

//     if(matchdata.length!=0){
//      navigate('/')
//     }
//     else{
      
//         toast.error("wrong credentil fill it right or create account");
      
//     }
//   }
//   catch(e){
//     console.log(e)
//   }
//   }
//   return (
//     <div className="signup-form-container">
//        <ToastContainer 
//         position="top-center" // You can set the position of the toast
//         autoClose={3000} // Automatically close after 3 seconds
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light" // You can change the theme: light or dark
//       />
//       <h1 style={{textAlign:"center"}}>Login</h1>
//       <Formik
//         initialValues={{
//           // name: "",
//           email: "",
//           password: "",
//           // confirmPassword: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log("Form Data", values);
//           logindata(values)
//         }}
//       >
//         {({ touched, errors }) => (
//           <Form>
//             {/* Name Field */}
//             {/* <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <Field
//                 name="name"
//                 type="text"
//                 className={`input-field ${touched.name && errors.name ? "is-invalid" : ""}`}
//                 placeholder="Enter your name"
//               />
//               <ErrorMessage name="name" component="div" className="error" />
//             </div> */}

//             {/* Email Field */}
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <Field
//                 name="email"
//                 type="email"
//                 className={`input-field ${touched.email && errors.email ? "is-invalid" : ""}`}
//                 placeholder="Enter your email"
//               />
//               <ErrorMessage name="email" component="div" className="error" />
//             </div>

//             {/* Password Field */}
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Field
//                 name="password"
//                 type="password"
//                 className={`input-field ${touched.password && errors.password ? "is-invalid" : ""}`}
//                 placeholder="Enter your password"
//               />
//               <ErrorMessage name="password" component="div" className="error" />
//             </div>

//             {/* Confirm Password Field */}
//             {/* <div className="form-group">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <Field
//                 name="confirmPassword"
//                 type="password"
//                 className={`input-field ${
//                   touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
//                 }`}
//                 placeholder="Confirm your password"
//               />
//               <ErrorMessage name="confirmPassword" component="div" className="error" />
//             </div> */}

//             {/* Submit Button */}
//             <button type="submit" className="btn-submit">
//               Sign In
//             </button>

//             {/* Sign Up with Google */}
//             <div className="google-signup">
//               <button className="btn-google" type="button">
//                 <FcGoogle className="google-icon" /> Sign In with Google
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;y
// import React, { useEffect, useState } from "react";
// import { CiUser } from "react-icons/ci";
// import { useAuth0 } from "@auth0/auth0-react";
// import { NavLink } from "react-router-dom";
// const LoginButton = () => {
//   const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
//   const [userdetails, setuserdetails] = useState({});
//   const [isRegistered, setIsRegistered] = useState(false); // Flag to check if registered

//   // Function to save user details to backend
//   const userregister = async () => {
//     try {
//       if (user && !isRegistered) { // Only proceed if user is logged in and not registered
//         setuserdetails(user); // Update the state with user details
  
//         await fetch("http://localhost:3000/user/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(user), // Send the Auth0 user data directly
//         });
//         setIsRegistered(true); // Set the flag to true after registering
//       }
//     } catch (e) {
//       console.log("Registration error:", e.message);
//     }
//   };

//   // Trigger user registration once on component mount
//   useEffect(() => {
//     if (user) {
//       userregister(); // Call registration only if `user` is available
//     }
//   }, [user]); // Dependency only on `user`

//   //Handle logout and delete user on the backend
//   const handleLogout = async () => {
//     try {
//       if (user) {
//         await fetch("http://localhost:3000/user/logout", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: user.email }), // Send email for deletion
//         });
//         setIsRegistered(false); // Reset flag on logout
//       }
//     } catch (e) {
//       console.log("Error during logout:", e.message);
//     }

//     logout(); // Finally log the user out from Auth0
//   };

//   return (
//     isAuthenticated ? (
//      <NavLink to={"/Profile"}><CiUser size={30}></CiUser></NavLink>
//     ) : (
//       <CiUser size={30} onClick={() => loginWithRedirect()}>Log In</CiUser>
//     )
//   );
// };

// export default LoginButton;

import React from "react";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the custom hook
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
