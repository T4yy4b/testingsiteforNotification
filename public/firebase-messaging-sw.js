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
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);
  const notificationTitle = payload?.notification?.title || "Default Title";
  const notificationOptions = {
    body: payload?.notification?.body || "Default body",
    data: {
      click_action: payload?.data?.click_action || "open_url",
      url: payload?.data?.url || ` ''}`,
    },
  };

  console.log("payLoad notifications :" , payload.notification);
  

  // Show the background notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Event listener for notification click actions
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data;

  // Customize URL if you need to pass dynamic data
  const url = `/polygon?data=${encodeURIComponent(JSON.stringify(data))}`;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
