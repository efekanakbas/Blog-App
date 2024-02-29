import Card from '@/components/Card';
import { Box, InputLabel, Typography } from '@mui/material';
import React from 'react';
import { useFormik } from "formik";
import validationSchema from "../../../schemas/settingsEmailSchema";
import Input from '@/components/Input';
import Button from '@/components/Button';

interface CloseYourAccountProps {
  // Define props here
}

const CloseYourAccount: React.FC<CloseYourAccountProps> = () => {
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
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // handleReset(values);
    },
  });


  //!
  //todo Functions
      
  //todo
  //? useEffect
      
  //?
  //* consoleLogs
      
  //*

  return (
    <Card>
        <Box sx={{display:'flex', flexDirection:'column', gap:'8px'}} >
        <Typography variant='h6' >
      Close My Account
      </Typography>
      Hope to see you again on Blog App {String.fromCodePoint(0x1F614)}
      <Typography sx={{color:'gray'}} >
      Give us your feedback and tell how we can improve our networking experience. Your message will be read carefully.
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
            htmlFor="messageInput"
          >
            Your Message
          </InputLabel>
          <Input
            id="messageInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "50%" }}
            size="medium"
            handleChange={handleChange}
            value={values.message}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={false}
            name="message"
            placeholder="Your Message"
            helperText={undefined}
            error={undefined}
            handleBlur={handleBlur}
          />
        </Box>

    

        <hr className='mt-2' />

        <Box sx={{display:'flex', justifyContent:'end'}}>
        <Button
        disabled = {null}
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

export default CloseYourAccount;