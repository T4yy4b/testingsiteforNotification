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
  const [messageData, setMessageData] = useState<NotificationPayload>({
    notification: { title: "No new notifications", body: "" },
    data: { click_action: "", url: "" },
  });

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
      <h2>Notification:</h2>
      <p>Title: {messageData.notification?.title}</p>
      <p>Body: {messageData.notification?.body}</p>
    </div>
  );
};

export default PushNotificationListener;
