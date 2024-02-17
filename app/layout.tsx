import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import TanstackProvider from "../providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeneralContextProvider } from "@/contexts/GeneralContext";

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
        <SpeedInsights/>
        <Toaster
        position="top-right"
        reverseOrder={false}
        />
        <main>
        <Navbar/>
        {children}
        </main>
        </GeneralContextProvider>
        </TanstackProvider>
        </body>
    </html>
  );
}
