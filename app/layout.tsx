import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeneralContextProvider } from "@/contexts/GeneralContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ClientProvider from "@/providers/ClientProvider";

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
              <SpeedInsights />
              <Toaster position="top-right" reverseOrder={false} />
              <main>
                <ClientProvider>{children}</ClientProvider>
              </main>
            </AuthProvider>
          </GeneralContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
