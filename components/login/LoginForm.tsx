"use client";
import React, { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box, Button, Checkbox, InputLabel, Typography } from "@mui/material";
import { useFormik } from "formik";
import Input from "../Input";
import Link from "next/link";
import validationSchema from '../../schemas/loginSchema'
import { useAuth } from "@/contexts/AuthContext";
import { postData } from "@/utils/CRUD";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

interface LoginFormProps {
  // Define props here
}

const LoginForm: React.FC<LoginFormProps> = () => {
  //! States
  const router = useRouter()
  const { values, handleChange, handleReset, handleSubmit, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      check: false
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      await loginHandler({
        email: values.email,
        password: values.password
      });
      console.log("values", values);
    },
  });



  const {login} = useAuth()
  const auth = !!errors.email || !!errors.password || values.email.length === 0 || values.password.length === 0
  //!
  //todo Functions
    const loginHandler = async (obj: any) => {
       try {
        const {token, user} = await postData('login', obj)

        Cookies.set('userId', user._id);
        Cookies.set('email', user.email);
        Cookies.set('username', user.username);
        Cookies.set('firstName', user.firstName);
        Cookies.set('lastName', user.lastName);
        Cookies.set('avatar', user.avatar);
        Cookies.set('cover', user.cover)
        Cookies.set('token', token)
        Cookies.set('isLoggedIn', "true")


        login()
        handleReset(values);
       } catch (error) {
          console.log("error", error)
          //@ts-ignore
          toast.error(error.response.data.message)
       }
    }
  //todo
  //? useEffect

  //?
  //* consoleLogs
     console.log("token", Cookies.get('token'))
  //*

  return (
    <Box sx={{ height: "100%", padding: "95px 150px" }}>
      <figure className="bg-blue-100 inline-flex p-2 rounded-xl">
        <AcUnitIcon sx={{ width: "40px", height: "40px" }} color="primary" />
      </figure>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "10px",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Typography sx={{ color: "gray" }}>
          Explore and keep connected with your network.
        </Typography>
      </Box>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="mt-16 flex flex-col gap-[48px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        
        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="emailInput"
          >
            Email
          </InputLabel>
          <Input
            id="emailInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.email}
            paddingLeft={false}
            className=""
            type="email"
            autoFocus={false}
            name="email"
            placeholder="Email"
            helperText={touched.email && errors.email && errors.email}
            error= {touched.email && errors.email}
            handleBlur={handleBlur}
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="passwordInput"
          >
            Password
          </InputLabel>
          <Input
            id="passwordInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.password}
            paddingLeft={false}
            className=""
            type="password"
            autoFocus={false}
            name="password"
            placeholder="Password"
            helperText={touched.password && errors.password && errors.password}
            error= {touched.password && errors.password}
            handleBlur={handleBlur}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Checkbox name="check" checked = {values.check} onChange={handleChange} inputProps={{ "aria-label": "Checkbox" }} />
            <Typography>Keep me logged in</Typography>
          </Box>
          <Box>
            <Link className="text-blue-500 font-bold" href="#">
              Forgot?
            </Link>
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={auth}
          style={{
            backgroundColor: auth  ? "" : "#1976D2",
            padding: "13px 0",
            borderRadius: "100px",
          }}
          variant={auth ? "outlined" : "contained"}
        >
          Login
        </Button>
      </form>
      <Box sx={{marginTop:'40px'}} >
        <Typography sx={{textAlign:'center'}} >
            Don&apos;t have an account? <Link className="text-blue-600" href='/register' >Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
