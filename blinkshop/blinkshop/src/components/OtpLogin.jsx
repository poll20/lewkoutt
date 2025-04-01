// OTPLogin.js
import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState("");

  // Setup reCAPTCHA verifier
  const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      },
      auth
    );

    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        console.log("OTP Sent Successfully!");
      })
      .catch((error) => {
        console.error("Error during phone authentication:", error);
      });
  };

  // Handle OTP Verification
  const verifyOtp = () => {
    const credential = window.firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );

    auth
      .signInWithCredential(credential)
      .then((userCredential) => {
        console.log("User signed in successfully:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{marginTop:"100px"}}
      />
      <button onClick={() => setupRecaptcha(phoneNumber)}>
        Send OTP
      </button>

      {isOtpSent && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      
    </div>
  );
};

export default OTPLogin;
