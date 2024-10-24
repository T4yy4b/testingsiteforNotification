"use client"

import { useEffect, useState } from "react";
import { messaging } from "@/firebase"; 
import { getToken } from "firebase/messaging";
import styles from "./page.module.css";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Request permission to send notifications
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          // Get the FCM token
          const currentToken = await getToken(messaging, {
            vapidKey: "BFVs2lwurH-KgXU0y0EVfwIwjeyUhysiOhJ9EKrtdkhpWNeBqVu4CdwScbF4_mgfihoFNCygZoLNY_17zxCsHOQ	", 
          });
          if (currentToken) {
            setToken(currentToken);
            console.log("FCM Token:", currentToken);
          } else {
            console.error("No registration token available. Request permission to generate one.");
          }
        }
      } catch (error) {
        console.error("Error getting permission for notifications", error);
      }
    };

    requestPermission();
  }, []);

  return (
    <div className={styles.page}>
      <div>Push Notification Testing</div>
      <button onClick={() => alert(token ? `Token: ${token}` : "No token available")}>
        Allow Notifications
      </button>
    </div>
  );
}
