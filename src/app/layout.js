"use client"
import PushNotificationHandler from "@/components/PushNotificationHandler";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider and QueryClient
import { Poppins } from "next/font/google";
import Script from "next/script";
import { useState } from "react"; // Import useState to manage QueryClient instance
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

// export const metadata = {
//   title: "Aidroo: Explore Reviews",
//   description: "Connect with Reliable Companies",
// };

export default function RootLayout({ children }) {
  // Create a QueryClient instance to be passed to QueryClientProvider
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="light">
      <body className={poppins.className}>
        <AuthProvider>
          {/* Provide the React Query Client to the entire app */}
          <QueryClientProvider client={queryClient}>
            <main className="w-full">
              {/* Google Analytics Client Component */}
              <GoogleAnalytics trackingId="G-Q0P2KWDT0B" />
              {children}
              {/* Inject the client-side push notification handler */}
              <PushNotificationHandler />
              {/* Tidio script */}
              <Script
                src="//code.tidio.co/nypfvkwgb7jxvqyd73rwal3ay4bbp5g9.js"
                strategy="afterInteractive"
              />
            </main>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
