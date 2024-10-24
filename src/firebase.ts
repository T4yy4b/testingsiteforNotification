// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging"; // Import Firebase Messaging

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnPOUDJClMg_jsCfKX1u-QyZs2Jmuer4Q",
  authDomain: "pushnotificationtestingww.firebaseapp.com",
  projectId: "pushnotificationtestingww",
  storageBucket: "pushnotificationtestingww.appspot.com",
  messagingSenderId: "974687550270",
  appId: "1:974687550270:web:3888eebe14680c17018a6f",
  measurementId: "G-4SEG4F43SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // Initialize Firebase Messaging

export { messaging }; // Export messaging for use in other parts of your app
