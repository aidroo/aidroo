"use client";

import { fetchToken, messaging } from "@/app/firebase";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axios";
import { onMessage } from "firebase/messaging";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

const useFcmToken = () => {
  const { currentUser } = useAuth(); // Access current user context
  const { toast } = useToast(); // Initialize the toast hook
  const router = useRouter(); // For navigation
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState(null);
  const [token, setToken] = useState(null);
  const isLoading = useRef(false);

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("fcmToken", token);
    localStorage.setItem("fcmTokenTimestamp", Date.now().toString());
  };

  let tokenAge;
  const checkIfTokenExpired = () => {
    const tokenTimestamp = localStorage.getItem("fcmTokenTimestamp");

    if (!tokenTimestamp) {
      return true; // If no timestamp exists, consider the token expired
    }

    tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
    const tokenExpiryDuration = 7 * 24 * 60 * 60 * 1000; // Example: 7 days in milliseconds

    // Return true if token is older than the expiry duration
    return tokenAge > tokenExpiryDuration;
  };

  const getNotificationPermissionAndToken = async () => {
    if (!("Notification" in window)) {
      console.info("This browser does not support desktop notifications");
      return null;
    }

    if (Notification.permission === "granted") {
      return await fetchToken();
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        return await fetchToken();
      }
    }

    console.log("Notification permission not granted.");
    return null;
  };

  const saveTokenToDatabase = async (token, username) => {
    if (currentUser) {
      try {
        const response = await axiosInstance.put(`/api/user/${username}`, {
          fcmToken: token,
          fcmTokenExpire: tokenAge,
          role: currentUser?.role,
          username,
        });
        console.log("Token saved to database:", response);
      } catch (error) {
        console.error("Error saving token to database:", error);
      }
    }
  };

  const checkLocalStorageToken = () => {
    return localStorage.getItem("fcmToken");
  };

  const loadToken = async () => {
    if (isLoading.current) return;

    isLoading.current = true;

    let token = checkLocalStorageToken();

    // Check if the token is expired
    if (checkIfTokenExpired()) {
      console.log("Token is expired, fetching a new one...");
      token = await getNotificationPermissionAndToken();
      if (token) {
        saveTokenToLocalStorage(token); // Save new token and timestamp
      }
    } else {
      console.log("Using existing token.");
    }

    // Save the token to the database if a username exists
    if (currentUser?.username) {
      await saveTokenToDatabase(token, currentUser?.username);
    } else {
      console.log("Username does not exist, saving token in local storage.");
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  // Watch for changes to the currentUser and save token to database
  useEffect(() => {
    const updateTokenInDatabase = async () => {
      const token = checkLocalStorageToken();

      if (token && currentUser?.username) {
        console.log("Updating token in database for new user.");
        await saveTokenToDatabase(token, currentUser?.username);
      }
    };

    // Only update if currentUser exists
    if (currentUser) {
      updateTokenInDatabase();
    }
  }, [currentUser]);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      console.log(`onMessage registered with token ${token}`);
      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        console.log("Foreground push notification received:", payload);

        const notificationUrl = payload.fcmOptions?.link || "/"; // Default URL if no link in payload
        console.log(notificationUrl);
        // Display the notification using Shadcn toast
        toast({
          title: payload.notification?.title || "Notification",
          description: (
            <div>
              {payload.notification?.body || "You have a new message."}
              <Link
                href={notificationUrl}
                className="ml-2 text-blue-500 underline"
              >
                View
              </Link>
            </div>
          ),
        });
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

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
