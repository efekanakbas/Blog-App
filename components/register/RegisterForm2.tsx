"use client";
import React, { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Box, Button, Checkbox, InputLabel, Typography } from "@mui/material";
import { useFormik } from "formik";
import Input from "../Input";
import Link from "next/link";
import validationSchema from "../../schemas/register2Schema";
import { useAuth } from "@/contexts/AuthContext";
import WestIcon from "@mui/icons-material/West";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/CRUD";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface RegisterFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: String;
  lastName: String;
  email: String;
  username: String;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  setToggle,
  firstName,
  lastName,
  email,
  username,
}) => {
  //! States
  const router = useRouter();
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
      password: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await registerHandler({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: values.password,
        confirm: values.confirm,
      });
      // handleReset(values);
    },
  });
  const auth =
    !!errors.password ||
    !!errors.confirm ||
    values.password.length === 0 ||
    values.confirm.length === 0;

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  //!
  //todo Functions
  const registerHandler = async (obj: any) => {
    try {
      await postData("register", obj);
      router.push("/confirm");
      handleReset(values);
    } catch (error) {
      console.log("error", error);
      //@ts-ignore
      toast.error(error.response.data.message);
    }
  };
  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box sx={{ height: "100%", padding: {xs: "60px", md: "95px 150px"}, position: "relative", display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <button

        title="Back to register page"
        onClick={() => {
          setToggle(false);
        }}
        className="absolute left-[4em] top-[8.6em]"
      >
        <WestIcon color="primary" />
      </button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <figure className="bg-blue-100 inline-flex p-2 rounded-xl">
          <AcUnitIcon sx={{ width: "40px", height: "40px" }} color="primary" />
        </figure>
        <Typography sx={{ color: "gray" }}>2/3</Typography>
      </Box>

      <Box
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography variant="h4">Generate Password</Typography>
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
        <Box sx={{ position: "relative" }}>
          <figure
            onClick={() => {
              setToggle1(!toggle1);
            }}
            className="absolute right-4 top-[40px] z-50 text-gray-500 cursor-pointer"
          >
            {!toggle1 ? (
              <VisibilityIcon sx={{ width: "30px", height: "30px" }} />
            ) : (
              <VisibilityOffIcon sx={{ width: "30px", height: "30px" }} />
            )}
          </figure>
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
            type= {!toggle1 ? "password" : "text"}
            autoFocus={false}
            name="password"
            placeholder="Password"
            helperText={touched.password && errors.password && errors.password}
            error={!!touched.password && !!errors.password}
            handleBlur={handleBlur}
            handleSubmit={undefined}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          <figure
            onClick={() => {
              setToggle2(!toggle2);
            }}
            className="absolute right-4 top-[40px] z-50 text-gray-500 cursor-pointer"
          >
            {!toggle2 ? (
              <VisibilityIcon sx={{ width: "30px", height: "30px" }} />
            ) : (
              <VisibilityOffIcon sx={{ width: "30px", height: "30px" }} />
            )}
          </figure>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="confirmInput"
          >
            Confirm
          </InputLabel>
          <Input
            id="confirmInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.confirm}
            paddingLeft={false}
            className=""
            type= {!toggle2 ? "password" : "text"}
            autoFocus={false}
            name="confirm"
            placeholder="Username"
            helperText={touched.confirm && errors.confirm && errors.confirm}
            error={!!touched.confirm && !!errors.confirm}
            handleBlur={handleBlur}
            handleSubmit={undefined}
          />
        </Box>

        <Button
          type="submit"
          disabled={auth}
          style={{
            backgroundColor: auth ? "" : "#1976D2",
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
