import Card from '@/components/Card';
import { Box, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from "formik";
import validationSchema from "../../../schemas/settingsPasswordSchema";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { patchData } from '@/utils/CRUD';
import toast from 'react-hot-toast';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordProps {
  // Define props here
}

const Password: React.FC<PasswordProps> = () => {
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
      current: "",
      new: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handlePatch({
        current: values.current,
        newP: values.new,
        confirm: values.confirm
      })
    },
  });

  const auth = !!errors.current || !!errors.new || !!errors.confirm || values.current.length === 0 || values.new.length === 0 || values.confirm.length === 0

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  //!
  //todo Functions
      const handlePatch = async (obj: any) => {
        try {
          await patchData('password', obj)
          handleReset(values);
          toast.success('You have successfully changed your password!')
        } catch (error) {
          //@ts-ignore
          if(error.message.endsWith(400)) {
            toast.error("Passwords do not match")
            //@ts-ignore
          } else if(error.message.endsWith(401)) {
            toast.error("Wrong password")
            //@ts-ignore
          } else if(error.message.endsWith(402)) {
            toast.error("Password must be 8 characters or longer")
          }
        }
      }
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Card>
        <Box sx={{display:'flex', flexDirection:'column', gap:'8px'}} >
        <Typography variant='h6' >
        Change a New Password
      </Typography>
      <Typography sx={{color:'gray'}} >
      Create a new password that is at least 8 charecters long.
      </Typography>
        </Box>
        <hr className='my-6' />
        <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="flex flex-col gap-[48px]"
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
            className="absolute right-[51.5%] top-[40px] z-50 text-gray-500 cursor-pointer"
          >
            {!toggle1 ? (
              <VisibilityIcon sx={{ width: "30px", height: "30px" }} />
            ) : (
              <VisibilityOffIcon sx={{ width: "30px", height: "30px" }} />
            )}
          </figure>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="currentInput"
          >
            Type your current password
          </InputLabel>
          <Input
            id="currentInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "50%" }}
            size="medium"
            handleChange={handleChange}
            value={values.current}
            paddingLeft={false}
            className=""
            type= {!toggle1 ? "password" : "text"}
            autoFocus={false}
            name="current"
            placeholder="Password"
            helperText={touched.current && errors.current && errors.current}
            error={!!touched.current && !!errors.current}
            handleBlur={handleBlur}
            handleSubmit={undefined}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          <figure
            onClick={() => {
              setToggle2(!toggle2);
            }}
            className="absolute right-[51.5%] top-[40px] z-50 text-gray-500 cursor-pointer"
          >
            {!toggle2 ? (
              <VisibilityIcon sx={{ width: "30px", height: "30px" }} />
            ) : (
              <VisibilityOffIcon sx={{ width: "30px", height: "30px" }} />
            )}
          </figure>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="newInput"
          >
            Type your new password
          </InputLabel>
          <Input
            id="newInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "50%" }}
            size="medium"
            handleChange={handleChange}
            value={values.new}
            paddingLeft={false}
            className=""
            type= {!toggle2 ? "password" : "text"}
            autoFocus={false}
            name="new"
            placeholder="Password"
            helperText={touched.new && errors.new && errors.new}
            error={!!touched.new && !!errors.new}
            handleBlur={handleBlur}
            handleSubmit={undefined}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          <figure
            onClick={() => {
              setToggle3(!toggle3);
            }}
            className="absolute right-[51.5%] top-[40px] z-50 text-gray-500 cursor-pointer"
          >
            {!toggle3 ? (
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
            sx={{ width: "50%" }}
            size="medium"
            handleChange={handleChange}
            value={values.confirm}
            paddingLeft={false}
            className=""
            type= {!toggle3 ? "password" : "text"}
            autoFocus={false}
            name="confirm"
            placeholder="Confirm"
            helperText={touched.confirm && errors.confirm && errors.confirm}
            error={!!touched.confirm && !!errors.confirm}
            handleBlur={handleBlur}
            handleSubmit={undefined}
          />
        </Box>
        <hr className='mt-2' />
        <Box sx={{display:'flex', justifyContent:'end'}}>
        <Button
        disabled={auth}
        type='contained'
        text='Save'
        buttonType='submit'
        handleClick={undefined}
        />
        </Box>
       
        
      </form>
    </Card>
  );
};

export default Password;