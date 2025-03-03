import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toasts
import "./CreateAccount.css"
// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Name must only contain alphabets")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain both letters")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
let storedata=(dataval)=>{
    console.log("hello",dataval)
   let response=fetch('http://localhost:3000/user', { // Replace with your API endpoint
      method: 'POST', // Specify the request type
      headers: {
        'Content-Type': 'application/json', // Content-Type header is required for sending JSON data
      },
      body: JSON.stringify(dataval), // Convert JavaScript object to JSON
    })
    // let result=response.json()
    
      .then(response => {
        if (!response.ok) {
          toast.error("email is already exist");

        }
        else{
          navigate('/')
        }
        // return result.json(); // Convert response to JSON
      })
      .then(data => {
        console.log('Success:', data); // Handle the success response
       
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors
      });
  }
  return (
    <div className="signup-form-container">
      <ToastContainer 
        position="top-center" // You can set the position of the toast
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // You can change the theme: light or dark
      />
      <h1 style={{textAlign:"center"}}>Create Account</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data", values);
          storedata(values)
        }}
      >
        {({ touched, errors }) => (
          <Form mathod="POST">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                type="text"
                className={`input-field ${touched.name && errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={`input-field ${touched.email && errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={`input-field ${touched.password && errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`input-field ${
                  touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit" >
              Sign Up
            </button>

            {/* Sign Up with Google */}
            <div className="google-signup">
              <button className="btn-google" type="button">
                <FcGoogle className="google-icon" /> Sign up with Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
