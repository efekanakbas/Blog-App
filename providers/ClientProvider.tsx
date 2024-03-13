'use client'
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
 const router = useRouter();
 const path = usePathname();
 const [loading, setLoading] = useState(true);
 const loggedIn = Cookies.get("isLoggedIn") === "true";
 const shouldRenderNavbar = !["/login", "/register", "/confirm"].includes(path);


 // Kullanıcının giriş durumunu kontrol etmek için bir kez çalışacak useEffect
 useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      if (!loggedIn) {
        if (path === "/register") {
          router.replace("/register");
        } else if (path === "/confirm") {
          router.replace("/confirm");
        } else {
          router.replace("/login");
        }
      } else if (
        loggedIn &&
        (path === "/login" || path === "/confirm" || path === "/register")
      ) {
        router.replace("/");
      }
      setTimeout(() => {setLoading(false)}, (200) )
    };

    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []); 

 if (loading) {
    return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
       <AcUnitIcon sx={{width:'30%', height:'30%', color:' rgb(37 99 235)',   animation: "spin 4s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },}} />
    </Box>
    )
 }

 return (
    <>
      {shouldRenderNavbar && <Navbar />}
      {children}
    </>
 );
};

export default ClientProvider;
