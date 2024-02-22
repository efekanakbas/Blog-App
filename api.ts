'use client'
import { useAuth } from "./contexts/AuthContext"




export const HandleLogin = () => {
    const {isLoggedIn} = useAuth();
    return isLoggedIn
}