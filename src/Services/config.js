// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-lDlkCNMj_NaMnR7or9yJJuydWHNErgY",
  authDomain: "reactify-e-commerce-stor-8ac11.firebaseapp.com",
  projectId: "reactify-e-commerce-stor-8ac11",
  storageBucket: "reactify-e-commerce-stor-8ac11.firebasestorage.app",
  messagingSenderId: "1063387541800",
  appId: "1:1063387541800:web:af62c8389b6d56542ba01d",
  measurementId: "G-764DW8TMFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;
