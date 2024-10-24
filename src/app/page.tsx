"use client"; 

import { useState, useEffect } from "react";
import { messaging } from "@/firebase";
import { getToken, onMessage } from "firebase/messaging";

const PushNotification = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BFVs2lwurH-KgXU0y0EVfwIwjeyUhysiOhJ9EKrtdkhpWNeBqVu4CdwScbF4_mgfihoFNCygZoLNY_17zxCsHOQ", 
          });
          if (currentToken) {
            setToken(currentToken);
            console.log("FCM Token:", currentToken);
          } else {
            console.error("No registration token available. Request permission to generate one.");
          }
        } catch (error) {
          console.error("Error getting FCM token:", error);
        }
      } else {
        console.log("Notification permission not granted.");
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      const notificationTitle = payload.notification?.title || "No title";
      const notificationOptions = {
        body: payload.notification?.body || "No body",
        icon: "/lifewwCloud.png",
        data: {
          url: "https://www.weatherwalay.com/", // Replace with your desired URL
        },
      };

      if (Notification.permission === "granted") {
        const notification = new Notification(notificationTitle, notificationOptions);
        
        // Handle notification click event
        notification.onclick = (event) => {
          event.preventDefault(); // Prevent the default behavior
          window.open(notificationOptions.data.url, '_blank'); // Open the URL in a new tab
        };
      }
    });
  }, []);

  const triggerNotification = async () => {
    if (token) {
      if (Notification.permission === "granted") {
        const notification = new Notification("Push Notification Triggered", {
          body: "A push notification should be triggered via Firebase",
          icon: "/lifewwCloud.png",
          data: {
            url: "https://www.weatherwalay.com/",
          },
        });

        // Handle notification click event
        notification.onclick = (event) => {
          event.preventDefault(); // Prevent the default behavior
          window.open(notification.data.url, '_blank'); // Open the URL in a new tab
        };
      } else {
        alert("User has not granted notification permission.");
      }
    } else {
      alert("Allow notifications!");
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
