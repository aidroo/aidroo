import PushNotificationHandler from "@/components/PushNotificationHandler";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

export const metadata = {
  title: "Aidroo: Explore Reviews",
  description: "Connect with Reliable Companies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={poppins.className}>
        <AuthProvider>
          <main className="w-full ">
            {/* Google Analytics Client Component */}
            <GoogleAnalytics trackingId="G-Q0P2KWDT0B" />
            {children}

            {/* Inject the client-side push notification handler */}
            <PushNotificationHandler />

            <Script
              src="//code.tidio.co/nypfvkwgb7jxvqyd73rwal3ay4bbp5g9.js"
              strategy="afterInteractive"
            />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
