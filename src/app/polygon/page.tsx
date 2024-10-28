"use client";

import { useEffect, useState } from "react";

interface NotificationPayload {
  notification?: {
    title: string;
    body: string;
  };
  data?: {
    click_action?: string;
    url?: string;
  };
}

const PushNotificationListener = () => {
  const [messageData, setMessageData] = useState<NotificationPayload | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const payload = event.data as NotificationPayload;  
        console.log("Message from service worker:", payload);
        setMessageData(payload);
      });
    }
  }, []);

  return (
    <div>
      {messageData ? (
        <div>
          <h2>New Notification:</h2>
          <p>Title: {messageData.notification?.title}</p>
          <p>Body: {messageData.notification?.body}</p>
        </div>
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
};

export default PushNotificationListener;
