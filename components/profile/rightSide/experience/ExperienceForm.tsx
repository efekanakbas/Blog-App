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

const contractType = [
  { label: "Part Time" },
  { label: "Temporary" },
  { label: "Permanent" },
  { label: "Freelance" },
];

interface ExperienceFormProps {
  // Define props here
}

const ExperienceForm: React.FC<ExperienceFormProps> = () => {
  //! States
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      company: "",
      title: "",
      contractType: "",
      startDate: "",
      endDate: "",
      checked: false,
      mission: "",
    },
    onSubmit: (values) => {
      console.log("selam");
      handleReset(values);
    },
  });

  const { setProfilePage, setVerticalTabValue } = useGeneral();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, index) =>
    (currentYear - index).toString()
  );

  const years2 = Array.from(
    { length: currentYear - Number(values?.startDate) },
    (_, index) => (currentYear - index).toString()
  );
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
        Add Experience
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
            htmlFor="companyInput"
          >
            Company
          </InputLabel>
          <Input
            id="companyInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.company}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={false}
            name="company"
            placeholder="Company"
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="titleInput"
          >
            Title
          </InputLabel>
          <Input
            id="titleInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.title}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={false}
            name="title"
            placeholder="Title"
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="contractType"
          >
            Contract Type
          </InputLabel>
          <Autocomplete
            //@ts-ignore
            value={values.contractType}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "contractType", value: newValue },
              });
            }}
            ListboxProps={{ style: { maxHeight: 250 } }}
            disablePortal
            id="contractType"
            options={contractType}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                placeholder="Contract Type"
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

        <Box sx={{ display: "flex", width: "100%", gap: "16px" }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              sx={{ marginBottom: "8px", color: "black" }}
              htmlFor="startDate"
            >
              Start Date
            </InputLabel>
            <Autocomplete
              disabled = {values.endDate === null ? false : values.endDate !== "" && true }
              //@ts-ignore
              value={values.startDate}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: "startDate", value: newValue },
                });
              }}
              ListboxProps={{ style: { maxHeight: 250 } }}
              disablePortal
              id="startDate"
              options={years}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  placeholder="Start Date"
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
          <Box sx={{ width: "100%" }}>
            <InputLabel
              sx={{ marginBottom: "8px", color: "black" }}
              htmlFor="endDate"
            >
              End Date
            </InputLabel>
            <Autocomplete
              disabled = {values.startDate === null ? true : values.startDate === "" && true }
              value={values.endDate}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: "endDate", value: newValue },
                });
              }}
              ListboxProps={{ style: { maxHeight: 250 } }}
              disablePortal
              id="endDate"
              options={years2}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  placeholder="End Date"
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
        </Box>

        <Box>
          <MuiSwitch name='checked' checked = {values.checked} onChange={handleChange} label="I am currently working here" />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="missionsInput"
          >
            Missions
          </InputLabel>
          <TextField
            name="mission"
            value={values.mission}
            onChange={handleChange}
            id="missionsInput"
            InputProps={{
              style: {
                borderRadius: "15px",
                //@ts-ignore
                // padding: '0 4px',
              },
            }}
            sx={{ width: "100%" }}
            variant="outlined"
            multiline
            rows={4}
            placeholder="Ex. Creating new product launch roadmap"
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

export default ExperienceForm;
