"use client";

import { Toaster } from "@/components/ui/toaster"; // Assuming you already have Toaster
import useFcmToken from "@/hooks/useFcmToken"; // Your FCM setup hook
import { useEffect } from "react";

export default function PushNotificationHandler() {
  const { token, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (notificationPermissionStatus === "denied") {
      console.log("Push notifications permission is denied.");
    } else if (token) {
      console.log("FCM Token received: ", token);
    }
  }, [token, notificationPermissionStatus]);

  return (
    <>
      {/* Toaster for notifications */}
      <Toaster />
    </>
  );
}
