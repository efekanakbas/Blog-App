import Card from '@/components/Card';
import { Box, InputLabel, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from "formik";
import validationSchema from "../../../schemas/settingsEmailSchema";
import Input from '@/components/Input';
import Button from '@/components/Button';
import Cookies from 'js-cookie';
import { patchData } from '@/utils/CRUD';
import toast from 'react-hot-toast';

interface EmailProps {
  // Define props here
}

const Email: React.FC<EmailProps> = () => {
  //! States
  const Iemail = Cookies.get('email')
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
      email: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("deneme")
      handlePatch({
        email: values.email
      })
    },
  });

  const auth = !!errors.email || !!errors.confirm || values.email.length === 0 || values.confirm.length === 0 
  //!
  //todo Functions
      const handlePatch = async(obj: any) => {
        try {
          await patchData('email', obj)
        Cookies.set('email', values.email)
        handleReset(values);
        toast.success('You have successfully changed your email!')
        } catch (error) {
          console.log("error:", error)
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
      Update Email Address
      </Typography>
      <Typography>
      Your current email address is: {Iemail}
      </Typography>
      <Typography sx={{color:'gray'}} >
      Updating your email will be effective immediatly. You will have to confirm your new address mail.
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
            sx={{ width: "50%" }}
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
            error={!!touched.email && !!errors.email}
            handleBlur={handleBlur}
          />
        </Box>

        <Box>
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
            type="email"
            autoFocus={false}
            name="confirm"
            placeholder="Confirm"
            helperText={touched.confirm && errors.confirm && errors.confirm}
            error={!!touched.confirm && !!errors.confirm}
            handleBlur={handleBlur}
          />
        </Box>

        <hr className='mt-2' />

        <Box sx={{display:'flex', justifyContent:'end'}}>
        <Button
        disabled ={auth}
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

export default Email;