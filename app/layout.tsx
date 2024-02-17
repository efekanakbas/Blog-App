import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import TanstackProvider from "../providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

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
        <Toaster
        position="top-right"
        reverseOrder={false}
        />
        <main>
        <Navbar/>
        {children}
        </main>

        </TanstackProvider>
        
        
        </body>
    </html>
  );
}
