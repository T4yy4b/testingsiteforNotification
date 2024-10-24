// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBnPOUDJClMg_jsCfKX1u-QyZs2Jmuer4Q",
    authDomain: "pushnotificationtestingww.firebaseapp.com",
    projectId: "pushnotificationtestingww",
    storageBucket: "pushnotificationtestingww.appspot.com",
    messagingSenderId: "974687550270",
    appId: "1:974687550270:web:3888eebe14680c17018a6f",
    measurementId: "G-4SEG4F43SX"
  };

// Retrieve firebase messaging
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(function (payload) {
console.log("Received background message ", payload);
  const notificationTitle = payload?.data?.title;
  const parseNotificationID = JSON.parse(payload?.data?._id);
  const notificationOptions = {
    body: payload?.data?.body,
    data: {
      clickAction: "openUrl",
      url: `https://weatherwalay.com/alerts/${parseNotificationID}`,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// firebase-messaging-sw.js

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification when clicked
  
    // Open a new window or tab with the desired URL
    event.waitUntil(
      self.clients.openWindow('https://www.google.com')
    );
  });
  
  