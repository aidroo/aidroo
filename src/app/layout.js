import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify the font weights you need
});

export const metadata = {
  title: "Aidroo: Explore Reviews",
  description: "Connect with Reliable Companies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={roboto.className}>
        {/* <ThemeProvider
          attribute="class"
          enableSystem
          themes={["light", "dark"]}
          disableTransitionOnChange
        > */}
        <AuthProvider>
          <main className="w-full ">{children}</main>
          <Toaster />
        </AuthProvider>

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
