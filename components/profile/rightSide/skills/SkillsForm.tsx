import { Box, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Input from "@/components/Input";
import { useGeneral } from "@/contexts/GeneralContext";
import Button from "@/components/Button";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

interface SkillsFormProps {
  // Define props here
}

const SkillsForm: React.FC<SkillsFormProps> = () => {
  //! States
  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: {
      main: "",
      comp: "",
      int: "",
    },
    onSubmit: (values) => {
      console.log("selam");
      handleReset(values);
    },
  });

  const { inputFocus, setProfilePage, setVerticalTabValue } = useGeneral();

  const [mainPool, setMainPool] = useState<Array<string>>([]);
  const [compPool, setCompPool] = useState<Array<string>>([]);
  const [intPool, setIntPool] = useState<Array<string>>([]);
  //!
  //todo Functions
  const handleMainFilter = (main: string) => {
    const updatedMainPool = mainPool.filter((item) => item !== main);
    setMainPool(updatedMainPool);
  };

  const handleCompFilter = (comp: string) => {
    const updatedCompPool = compPool.filter((item) => item !== comp);
    setCompPool(updatedCompPool);
  };

  const handleIntFilter = (int: string) => {
    const updatedIntPool = intPool.filter((item) => item !== int);
    setIntPool(updatedIntPool);
  };

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Add Skills
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
          <InputLabel sx={{marginBottom:'8px', color:'black'}} htmlFor="mainInput" >
            Main Skills
          </InputLabel>
          <Input
            id="mainInput"
            onKeyDownHandler={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if(mainPool.length < 5) {
                  const existingMain = mainPool.find((main) => main === values.main)
                  if(existingMain) {
                    toast.error('You can not add same value')
                  } else {
                    setMainPool([...mainPool, values.main])
                handleReset(values)
                  }
                } else {
                  toast.error('You can add max 5')
                }
              }
            }}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.main}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={inputFocus === 0}
            name="main"
            placeholder="Main Skills"
            helperText=""
            error= {false}
            handleBlur={null}
          />
          <Typography
            sx={{ marginTop: "8px", color: "gray", fontSize: "14px" }}
          >
            You can add up to 5 main skills
          </Typography>
          <Box
            sx={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {mainPool.map((item, i) => (
              <span
                className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 relative"
                key={i}
              >
                <button
                  onClick={() => {
                    handleMainFilter(item);
                  }}
                  className="absolute -top-1 -right-[1px] scale-[0.60]"
                >
                  <CloseIcon color="error" />
                </button>
                #{item}
              </span>
            ))}
          </Box>
        </Box>

        <Box>
        <InputLabel sx={{marginBottom:'8px', color:'black'}} htmlFor="compInput" >
            Complementary Skills
          </InputLabel>
          <Input
            id="compInput"
            onKeyDownHandler={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if(compPool.length < 10) {
                  const existingComp = compPool.find((comp) => comp === values.comp)
                  if(existingComp) {
                    toast.error('You can not add same value')
                  } else {
                    setCompPool([...compPool, values.comp])
                handleReset(values)
                  }
                } else {
                  toast.error('You can add max 10')
                }
              }
            }}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.comp}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={inputFocus === 1}
            name="comp"
            placeholder="Complementary Skills"
            helperText=""
            error= {false}
            handleBlur={null}
          />
          <Typography
            sx={{ marginTop: "8px", color: "gray", fontSize: "14px" }}
          >
            You can add up to 10 complementary skills
          </Typography>
          <Box
            sx={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {compPool.map((item, i) => (
              <span
                className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 relative"
                key={i}
              >
                <button
                  onClick={() => {
                    handleCompFilter(item);
                  }}
                  className="absolute -top-1 -right-[1px] scale-[0.60]"
                >
                  <CloseIcon color="error" />
                </button>
                #{item}
              </span>
            ))}
          </Box>
        </Box>

        <Box>
        <InputLabel sx={{marginBottom:'8px', color:'black'}} htmlFor="intInput" >
            Interests
          </InputLabel>
          <Input
            id="intInput"
            onKeyDownHandler={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if(intPool.length < 10) {
                  const existingInt = intPool.find((int) => int === values.int)
                  if(existingInt) {
                    toast.error('You can not add same value')
                  } else {
                    setIntPool([...intPool, values.int])
                handleReset(values)
                  }
                } else {
                  toast.error('You can add max 10')
                }
              }
            }}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.int}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={inputFocus === 2}
            name="int"
            placeholder="Interest"
            helperText=""
            error= {false}
            handleBlur={null}
          />
          <Typography
            sx={{ marginTop: "8px", color: "gray", fontSize: "14px" }}
          >
            You can add up to 10 Interests
          </Typography>
          <Box
            sx={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {intPool.map((item, i) => (
              <span
                className="border border-blue-500 px-4 py-1 rounded-full text-blue-500 relative"
                key={i}
              >
                <button
                  onClick={() => {
                    handleIntFilter(item);
                  }}
                  className="absolute -top-1 -right-[1px] scale-[0.60]"
                >
                  <CloseIcon color="error" />
                </button>
                #{item}
              </span>
            ))}
          </Box>
        </Box>

        <hr />

        <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
          <Button
            handleClick={() => {setProfilePage(0); setVerticalTabValue(0)}}
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

export default SkillsForm;
