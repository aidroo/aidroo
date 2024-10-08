/* eslint-disable @typescript-eslint/no-var-requires */
import admin from "firebase-admin";
import { NextResponse } from "next/server";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require("@/service-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  try {
    // Parse the request body to extract token, title, message, and link
    const { token, title, message, link } = await request.json();

    // Define the payload for the push notification
    const payload = {
      token,
      notification: {
        title,
        body: message,
      },
      webpush: link
        ? {
            fcmOptions: {
              link,
            },
          }
        : undefined,
    };

    // Send the push notification using Firebase Admin SDK
    await admin.messaging().send(payload);

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Notification sent successfully!",
    });
  } catch (error) {
    console.error("Error sending notification:", error);

    // Return an error response
    return NextResponse.json({
      success: false,
      error: error.message || "An unknown error occurred",
    });
  }
}
