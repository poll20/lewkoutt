import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber ,PhoneAuthProvider,signInWithCredential, signOut,onAuthStateChanged } from "firebase/auth";
console.log("API Key:", import.meta.env.VITE_API_KEY);
console.log("API Key:", import.meta.env.VITE_AUTH_DOMAIN);
console.log("API Key:", import.meta.env.VITE_PROJECT_ID);
const firebaseConfig = {
    apiKey: "AIzaSyDeqpb6-B5N8zS5zbTfZsCnmg9IHPvu6Sw",
    authDomain: "lewkout-bcf84.firebaseapp.com",
    projectId: "lewkout-bcf84",
    storageBucket: "lewkout-bcf84.firebasestorage.app",
    messagingSenderId: "315965564771",
    appId: "1:315965564771:web:dfd6439dd1330ce8925556",
    measurementId: "G-EYX24MYHNB"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth};
