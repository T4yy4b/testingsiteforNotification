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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background notification handler
// Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);

  // Log the entire payload to see its structure
  console.log("Payload:", JSON.stringify(payload, null, 2));

  const notificationTitle = payload.notification?.title || "Default Title";
  const notificationBody = payload.notification?.body || "Default body";
  const notificationData = payload.data || {}; // Extract data from payload

  const notificationOptions = {
    body: notificationBody,
    data: {
      click_action: notificationData.click_action || "open_url",
      url: notificationData.url || "", // Set a default URL if needed
    },
  };

  // Show the background notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});


// Event listener for notification click actions
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data;

  const url = data.url || "/polygon"; // Default URL if not provided

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url); // Open a new window if none are matched
    })
  );
});

