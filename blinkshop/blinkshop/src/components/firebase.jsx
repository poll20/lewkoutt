import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber ,PhoneAuthProvider,signInWithCredential, signOut,onAuthStateChanged } from "firebase/auth";
console.log("API Key:", import.meta.env.VITE_API_KEY);
console.log("API Key:", import.meta.env.VITE_AUTH_DOMAIN);
console.log("API Key:", import.meta.env.VITE_PROJECT_ID);
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_ID,
//     measurementId:import.meta.env.VITE_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyDeqpb6-B5N8zS5zbTfZsCnmg9IHPvu6Sw",
    authDomain: "lewkout-bcf84.firebaseapp.com",
    projectId: "lewkout-bcf84",
    storageBucket: "lewkout-bcf84.firebasestorage.app",
    messagingSenderId: "315965564771",
    appId: "1:315965564771:web:dfd6439dd1330ce8925556",
    measurementId: "G-EYX24MYHNB"
  };
console.log("Firebase config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
// console.log("App initialized:", app);
const auth = getAuth(app);
// console.log("auth",auth)
// export { auth, RecaptchaVerifier, signInWithPhoneNumber,PhoneAuthProvider,signInWithCredential,signOut,onAuthStateChanged};
export { auth};

// firebase.js file
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyD_RzxHaN-KFmnAhEHCT85VY_jkY0jLw8w",
//   authDomain: "lewkout-bcf84.firebaseapp.com",
//   projectId: "lewkout-bcf84",
//   storageBucket: "lewkout-bcf84.appspot.com",
//   messagingSenderId: "315965564771",
//   appId: "1:315965564771:web:dfd6439dd1330ce8925556",
//   measurementId: "G-EYX24MYHNB"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // ✅ THIS IS IMPORTANT FIX
// auth.languageCode = 'en';

// const generateRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'invisible',
//           callback: (response) => {
//             console.log('Recaptcha Resolved');
//           },
//           'expired-callback': () => {
//             console.log('Recaptcha expired');
//           }
//         },
//         auth // ✅ Pass `auth` as third parameter
//       );
//       window.recaptchaVerifier.render(); // optional, ensures it's rendered
//     }
//   };
  

// export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, generateRecaptcha };
