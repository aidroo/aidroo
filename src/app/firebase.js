import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB82Jz4z5GcTDHyieOfz8Lr--frU9LN61U",
  authDomain: "aidroo2.firebaseapp.com",
  projectId: "aidroo2",
  storageBucket: "aidroo2.appspot.com",
  messagingSenderId: "61288973841",
  appId: "1:61288973841:web:74a5f0a6f24082541b93b0",
  measurementId: "G-FD1JB7WM4G"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: "BOHcphIWDobyy6samwuZ_Y8BdtlRZwz5Urz-npk4YxcDX7VIsoD_JVFNqr6jL__Aj_JgRtYmdj-Z8LHmemsp4uI",
      });
      console.log(token);
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };

