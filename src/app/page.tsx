"use client";

import { useState, useEffect } from "react";
import { messaging } from "@/firebase"; // Ensure this is correctly initialized
import { getToken, onMessage, MessagePayload } from "firebase/messaging";

const PushNotification = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!messaging) {
      console.warn("Firebase messaging is not supported in this browser.");
      return;
    }
    console.log("PushNotification component mounted");

    // Register the service worker
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );
          console.log("Service Worker registered:", registration);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    };

    registerServiceWorker();

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted" && messaging) {
          const currentToken = await getToken(messaging, {
            vapidKey: "BFVs2lwurH-KgXU0y0EVfwIwjeyUhysiOhJ9EKrtdkhpWNeBqVu4CdwScbF4_mgfihoFNCygZoLNY_17zxCsHOQ",
          });
          if (currentToken) {
            setToken(currentToken);
            console.log("FCM Token:", currentToken);
            // Here, you might want to send this token to your server for storing
          } else {
            console.error("No registration token available.");
          }
        } else {
          console.log("Notification permission not granted.");
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    requestPermission();

    const unsubscribe = messaging
      ? onMessage(messaging, (payload: MessagePayload) => {
          console.log("Message received in foreground: ", payload);
          const notificationTitle = payload.notification?.title || "No title";
          const notificationOptions = {
            body: payload.notification?.body || "No body",
            icon: "/lifewwCloud.png",
            data: {
              url: process.env.NEXT_PUBLIC_APP_URL + "/polygon",
            },
          };

          if (Notification.permission === "granted") {
            const notification = new Notification(notificationTitle, notificationOptions);
            notification.onclick = (event) => {
              event.preventDefault();
              window.open(notificationOptions.data.url, "_blank");
            };
          }
        })
      : () => {}; // Ensure messaging is initialized

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const triggerNotification = async () => {
    if (token) {
      if (Notification.permission === "granted") {
        const notification = new Notification("Push Notification Triggered", {
          body: "A push notification should be triggered via Firebase",
          icon: "/lifewwCloud.png",
          data: {
            url: process.env.NEXT_PUBLIC_APP_URL + "/polygon",
          },
        });

        notification.onclick = (event) => {
          event.preventDefault();
          window.open(notification.data.url, "_blank");
        };
      } else {
        alert("User has not granted notification permission.");
      }
    } else {
      alert("Please allow notifications to receive alerts.");
    }
  };

  return (
    <div>
      <h1>Click the button to trigger a push notification!</h1>
      <button onClick={triggerNotification}>Show Notification</button>
    </div>
  );
};

export default PushNotification;
