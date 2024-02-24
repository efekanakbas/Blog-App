"use client";
import React, { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box, Button, Checkbox, InputLabel, Typography } from "@mui/material";
import { useFormik } from "formik";
import Input from "./Input";
import Link from "next/link";
import validationSchema from '../schemas/loginSchema'
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  // Define props here
}

const LoginForm: React.FC<LoginFormProps> = () => {
  //! States
  const { values, handleChange, handleReset, handleSubmit, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      check: false
    },
    validationSchema,
    onSubmit: (values) => {
      login()
      handleReset(values);
    },
  });
  const {login} = useAuth()
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
    console.log("values", values)
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
            helperText={touched.email && errors.email && 'Invalid Email'}
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
            helperText={touched.password && errors.password && 'Invalid Password'}
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
          disabled={!!errors.email || !!errors.password || values.email.length === 0 || values.password.length === 0}
          style={{
            backgroundColor: errors.email || errors.password  ? "" : "#1976D2",
            padding: "13px 0",
            borderRadius: "100px",
          }}
          variant={errors.email || errors.password ? "outlined" : "contained"}
        >
          Login
        </Button>
      </form>
      <Box sx={{marginTop:'40px'}} >
        <Typography sx={{textAlign:'center'}} >
            Don&apos;t have an account? <Link className="text-blue-600" href='#' >Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
