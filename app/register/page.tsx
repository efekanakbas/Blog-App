import React from 'react';
import { Metadata } from "next";
import RegisterPageLayout from '@/layouts/RegisterPageLayout';

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page of Blog",
};


interface RegisterProps {
  // Define props here
}

const Register: React.FC<RegisterProps> = () => {
  //! States
      
  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <RegisterPageLayout/>
  );
};

export default Register;