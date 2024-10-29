 
import PushNotificationHandler from "@/components/PushNotificationHandler";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
 // Import QueryClientProvider and QueryClient
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryClientProviderO from "./provider/query-client-prodiver";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

export const metadata = {
  title: "Aidroo: Explore Reviews",
  description: "Connect with Reliable Companies",
  openGraph: {
    title: "Aidroo: Explore Reviews",
    description: "Connect with Reliable Companies",
    images: [
      {
        url: "http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724335517/ifjzafpc9nyewdnt6z79.jpg", // Replace with the actual image URL
        width: 800,
        height: 600,
        alt: "Aidroo Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aidroo: Explore Reviews",
    description: "Connect with Reliable Companies",
    image:
      "http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724335517/ifjzafpc9nyewdnt6z79.jpg", // Replace with the actual image URL
  },
};

export default function RootLayout({ children }) {
  

  return (
    <html lang="en" className="light">
      <body className={poppins.className}>
        <AuthProvider>
          {/* Provide the React Query Client to the entire app */}
          <QueryClientProviderO >
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
          </QueryClientProviderO>
        </AuthProvider>
      </body>
    </html>
  );
}
// http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724335517/ifjzafpc9nyewdnt6z79.jpg;