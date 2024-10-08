"use client";

import { fetchToken, messaging } from "@/app/firebase";
import { useToast } from "@/components/ui/use-toast";
import { onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Step 1: Get notification permission and token
async function getNotificationPermissionAndToken() {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return null;
  }

  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await fetchToken();
      return;
    }
  }

  console.log("Notification permission not granted.");
  return null;
}

const useFcmToken = () => {
  const { toast } = useToast(); // Initialize the Shadcn toast hook
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState(null);
  const [token, setToken] = useState(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  // Load token from Firebase and check permissions
  const loadToken = async () => {
    if (isLoading.current) return;

    isLoading.current = true;
    const token = await getNotificationPermissionAndToken();

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info(
        "%cPush Notifications issue - permission denied",
        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
      );
      isLoading.current = false;
      return;
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        console.info(
          "%cPush Notifications issue - unable to load token after 3 retries",
          "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  // Initialize token loading on component mount
  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  // Setup listener for FCM messages
  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      console.log(`onMessage registered with token ${token}`);
      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        console.log("Foreground push notification received:", payload);

        const link = payload.fcmOptions?.link || payload.data?.link;

        // Display the notification in the Shadcn UI Toast
        toast({
          title: payload.notification?.title || "Notification",
          description: payload.notification?.body || "You have a new message.",
          action: link ? (
            <button
              className="text-blue-500 underline"
              onClick={() => router.push(link)}
            >
              Visit
            </button>
          ) : null,
        });

        // Create native browser notification
        const nativeNotification = new Notification(
          payload.notification?.title || "New message",
          {
            body: payload.notification?.body || "This is a new message",
            data: { url: link },
          }
        );

        nativeNotification.onclick = (event) => {
          event.preventDefault();
          const link = event.target.data?.url;
          if (link) {
            router.push(link);
          }
        };

        // Optionally, save the notification in local state or to a server
        saveNotification(payload);
      });

      return unsubscribe;
    };

    let unsubscribe = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
  }, [token, router, toast]);

  // Function to save notifications (you can adjust this as needed)
  const saveNotification = (payload) => {
    // Here you can save the notification to local state, context, or send it to a server
    console.log("Saving notification:", payload);
    // Example: You can store notifications in localStorage or a global state
    // localStorage.setItem('notifications', JSON.stringify([...existingNotifications, payload]));
  };

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
