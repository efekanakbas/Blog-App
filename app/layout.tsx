import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeneralContextProvider } from "@/contexts/GeneralContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserDetailProvider } from "@/contexts/UserDetailContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <GeneralContextProvider>
            <AuthProvider>
              <UserDetailProvider>
              <SpeedInsights />
              <Toaster position="top-right" reverseOrder={false} />
              <main>
                {children}
              </main>
              </UserDetailProvider>
            </AuthProvider>
          </GeneralContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
