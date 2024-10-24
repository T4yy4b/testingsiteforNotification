// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBnPOUDJClMg_jsCfKX1u-QyZs2Jmuer4Q",
  authDomain: "pushnotificationtestingww.firebaseapp.com",
  projectId: "pushnotificationtestingww",
  storageBucket: "pushnotificationtestingww.appspot.com",
  messagingSenderId: "974687550270",
  appId: "1:974687550270:web:3888eebe14680c17018a6f",
  measurementId: "G-4SEG4F43SX"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
