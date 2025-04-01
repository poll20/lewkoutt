import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_RzxHaN-KFmnAhEHCT85VY_jkY0jLw8w",
    authDomain: "lewkout-bcf84.firebaseapp.com",
    projectId: "lewkout-bcf84",
    storageBucket: "lewkout-bcf84.firebasestorage.app",
    messagingSenderId: "315965564771",
    appId: "1:315965564771:web:dfd6439dd1330ce8925556",
    measurementId: "G-EYX24MYHNB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
