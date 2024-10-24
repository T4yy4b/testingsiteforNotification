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
            console.error(
              "No registration token available. Request permission to generate one."
            );
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
        icon: "/lifewwCloud.png" ,
      
      };


      if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions);
        
      }
    });
  }, []);


  const triggerNotification = async () => {
    if (token) {
      if (Notification.permission === "granted") {
        new Notification("Push Notification Triggered", {
          body: "A push notification should be triggered via Firebase",
          icon: "/lifewwCloud.png", 
        });
      } else {
        alert("User has not granted notification permission.");
      }
    } else {
      alert("Allow notifications !");
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
