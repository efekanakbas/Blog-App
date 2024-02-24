"use client";
import React, { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box, Button, Checkbox, InputLabel, Typography } from "@mui/material";
import { useFormik } from "formik";
import Input from "../Input";
import Link from "next/link";
import validationSchema from "../../schemas/register1Schema";
import { useAuth } from "@/contexts/AuthContext";

interface RegisterFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterForm: React.FC<RegisterFormProps> = ({setToggle}) => {
  //! States
  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      first: "",
      last: "",
      email: "",
      username: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setToggle(true)
      handleReset(values);
    },
  });
  const { login } = useAuth();
  const auth = !!errors.email || !!errors.first || !!errors.last || !!errors.username || values.email.length === 0 || values.first.length === 0 || values.last.length === 0 || values.username.length === 0
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("values", values);
  //*

  return (
    <Box sx={{ height: "100%", padding: "95px 150px" }}>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <figure className="bg-blue-100 inline-flex p-2 rounded-xl">
        <AcUnitIcon sx={{ width: "40px", height: "40px" }} color="primary" />
      </figure>
      <Typography sx={{color:'gray'}} >
      1/3
      </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography variant="h4">Register</Typography>
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
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              sx={{ marginBottom: "8px", color: "black" }}
              htmlFor="firstInput"
            >
              First Name
            </InputLabel>
            <Input
              id="firstInput"
              onKeyDownHandler={undefined}
              disabled={false}
              sx={{ width: "100%" }}
              size="medium"
              handleChange={handleChange}
              value={values.first}
              paddingLeft={false}
              className=""
              type="text"
              autoFocus={false}
              name="first"
              placeholder="First Name"
              helperText={touched.first && errors.first && errors.first}
              error={touched.first && errors.first}
              handleBlur={handleBlur}
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <InputLabel
              sx={{ marginBottom: "8px", color: "black" }}
              htmlFor="lastInput"
            >
              Last Name
            </InputLabel>
            <Input
              id="lastInput"
              onKeyDownHandler={undefined}
              disabled={false}
              sx={{ width: "100%" }}
              size="medium"
              handleChange={handleChange}
              value={values.last}
              paddingLeft={false}
              className=""
              type="text"
              autoFocus={false}
              name="last"
              placeholder="Last Name"
              helperText={touched.last && errors.last && errors.last}
              error={touched.last && errors.last}
              handleBlur={handleBlur}
            />
          </Box>
        </Box>
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
            error={touched.email && errors.email}
            handleBlur={handleBlur}
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="usernameInput"
          >
            Username
          </InputLabel>
          <Input
            id="usernameInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.username}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={false}
            name="username"
            placeholder="Username"
            helperText={touched.username && errors.username && errors.username}
            error={touched.username && errors.username}
            handleBlur={handleBlur}
          />
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
          Continue
        </Button>
      </form>
      <Box sx={{ marginTop: "40px" }}>
        <Typography sx={{ textAlign: "center" }}>
          Have an account?{" "}
          <Link className="text-blue-600" href="/login">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
