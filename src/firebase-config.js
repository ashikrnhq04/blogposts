// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg7UaLar82pL_tX7mzQeS-y-hU2NE3ki0",
  authDomain: "login-authentication-8fe5e.firebaseapp.com",
  projectId: "login-authentication-8fe5e",
  storageBucket: "login-authentication-8fe5e.appspot.com",
  messagingSenderId: "974450534028",
  appId: "1:974450534028:web:88acb799cb6aa50399bda9",
  measurementId: "G-8MW5HWFX36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
