"use client";
import React, { useState } from "react";
import SlickSlider from "@/components/login/SlickSlider";
import { Box } from "@mui/material";
import RegisterForm1 from "@/components/register/RegisterForm1";
import RegisterForm2 from "@/components/register/RegisterForm2";

interface RegisterPageLayoutProps {
  // Define props here
}

const RegisterPageLayout: React.FC<RegisterPageLayoutProps> = () => {
  //! States
  const [toggle, setToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{width:{xs:"100%", md: "43%"}}}>
        {!toggle ? (
          <RegisterForm1
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setUsername={setUsername}
            setToggle={setToggle}
          />
        ) : (
          <RegisterForm2
            firstName={firstName}
            lastName={lastName}
            email={email}
            username={username}
            setToggle={setToggle}
          />
        )}
      </Box>
      <Box sx={{ width: {xs: 0, md: '57%'}, backgroundColor: "white" }}>
        <SlickSlider />
      </Box>
    </Box>
  );
};

export default RegisterPageLayout;
