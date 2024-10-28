// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, isSupported ,Messaging } from "firebase/messaging"; // Import Firebase Messaging

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

// Initialize Firebase Messaging with browser support check
let messaging: Messaging | null = null;

async function initializeMessaging() {
  const supported = await isSupported();
  if (!supported) {
    console.warn("This browser doesn't support Firebase messaging.");
    return;
  }

  messaging = getMessaging(app); // Initialize Firebase Messaging
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    // You can handle foreground notifications here if needed
  });
}

if (typeof window !== "undefined") {
  initializeMessaging();
}

export { messaging }; // Export messaging for use in other parts of your app
