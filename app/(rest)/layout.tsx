import Navbar from "@/components/Navbar";

export default function RestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar/>
        <main>{children}</main>
    </div>
  );
}
