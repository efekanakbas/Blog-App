import {
  Autocomplete,
  Box,
  FormControlLabel,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Input from "@/components/Input";
import { useGeneral } from "@/contexts/GeneralContext";
import Button from "@/components/Button";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import MuiSwitch from "@/components/MuiSwitch";

const language = [
  { label: "Akan"},
  { label: "Amharic" },
  { label: "Arabic" },
  { label: "Assamese" },
  { label: "Awadhi" },
  { label: "Azerbaijani" },
  { label: "Balochi" },
  { label: "Belarusian" },
  { label: "Bengali" },
  { label: "Bhojpuri" },
];

const level = [
  { label: "Elementary"},
  { label: "Limited Working" },
  { label: "Minimum Professional" },
  { label: "Full Professional" },
  { label: "Native" },
];

interface LanguageFormProps {
  // Define props here
}

const LanguageForm: React.FC<LanguageFormProps> = () => {
  //! States
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      language: "",
      level: "",
    },
    onSubmit: (values) => {
      console.log("selam");
      handleReset(values);
    },
  });

  const { setProfilePage, setVerticalTabValue } = useGeneral();

  
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  
  //*

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Add Language
      </Typography>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="mt-8 flex flex-col gap-[48px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        
        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="language"
          >
            Language
          </InputLabel>
          <Autocomplete
            //@ts-ignore
            value={values.language}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "language", value: newValue },
              });
            }}
            ListboxProps={{ style: { maxHeight: 250 } }}
            disablePortal
            id="language"
            options={language}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                placeholder="Language"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    borderRadius: "100px",
                    padding: "0 12px",
                    height: "48px",
                    //@ts-ignore
                    ...params.InputProps.style,
                  },
                }}
                label=""
              />
            )}
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="level"
          >
            Level
          </InputLabel>
          <Autocomplete
            //@ts-ignore
            value={values.level}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "level", value: newValue },
              });
            }}
            ListboxProps={{ style: { maxHeight: 250 } }}
            disablePortal
            id="level"
            options={level}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                placeholder="Level"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  style: {
                    borderRadius: "100px",
                    padding: "0 12px",
                    height: "48px",
                    //@ts-ignore
                    ...params.InputProps.style,
                  },
                }}
                label=""
              />
            )}
          />
        </Box>

        <hr />

        <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
          <Button
            handleClick={() => {
              setProfilePage(0);
              setVerticalTabValue(0);
            }}
            buttonType="button"
            type="outlined"
            text="Cancel"
          />
          <Button
            handleClick={null}
            buttonType="submit"
            type="contained"
            text="Save"
          />
        </Box>
      </form>
    </Box>
  );
};

export default LanguageForm;
