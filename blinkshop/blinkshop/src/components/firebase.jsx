// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber ,PhoneAuthProvider,signInWithCredential } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyD_RzxHaN-KFmnAhEHCT85VY_jkY0jLw8w",
//     authDomain: "lewkout-bcf84.firebaseapp.com",
//     projectId: "lewkout-bcf84",
//     storageBucket: "lewkout-bcf84.firebasestorage.app",
//     messagingSenderId: "315965564771",
//     appId: "1:315965564771:web:dfd6439dd1330ce8925556",
//     measurementId: "G-EYX24MYHNB"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth, RecaptchaVerifier, signInWithPhoneNumber,PhoneAuthProvider,signInWithCredential};

// firebase.js file
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_RzxHaN-KFmnAhEHCT85VY_jkY0jLw8w",
  authDomain: "lewkout-bcf84.firebaseapp.com",
  projectId: "lewkout-bcf84",
  storageBucket: "lewkout-bcf84.appspot.com",
  messagingSenderId: "315965564771",
  appId: "1:315965564771:web:dfd6439dd1330ce8925556",
  measurementId: "G-EYX24MYHNB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ THIS IS IMPORTANT FIX
auth.languageCode = 'en';

const generateRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        auth,
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha Resolved');
      },
      'expired-callback': () => {
        console.log('Recaptcha expired');
      }
    });
  }
};

export { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, generateRecaptcha };
