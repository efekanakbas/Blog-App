import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { useGeneral } from "@/contexts/GeneralContext";
import Skills from "./skills/Skills";
import Experience from "./experience/Experience";
import Education from "./education/Education";
import Language from "./language/Language";
import SkillsForm from "./skills/SkillsForm";
import ExperienceForm from "./experience/ExperienceForm";
import EducationForm from "./education/EducationForm";
import LanguageForm from "./language/LanguageForm";
import { useUserDetail } from "@/contexts/UserDetailContext";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { patchData } from "@/utils/CRUD";

interface ProfileSelectedProps {
  // Define props here
}

const ProfileSelected: React.FC<ProfileSelectedProps> = () => {
  //! States
  const { isMe, profilePage } = useGeneral();
  const { location, setLocation, job, setJob } = useUserDetail();

  const formik1 = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: async (values) => {
      setLocationValue(values.location);
      setLocation(values.location);
      setToggle1(false);
      await patchData("location", { location: values.location });
      formik1.resetForm();
    },
  });

  const formik2 = useFormik({
    initialValues: {
      job: "",
    },
    onSubmit: async (values) => {
      setJobValue(values.job);
      setJob(values.job);
      setToggle2(false);
      await patchData("job", { job: values.job });
      formik2.resetForm();
    },
  });

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [locationValue, setLocationValue] = useState(location);
  const [jobValue, setJobValue] = useState(job);
  const [expEdit, setExpEdit] = useState<null | number>(null);
  const [eduEdit, setEduEdit] = useState<null | number>(null);
  const [lanEdit, setLanEdit] = useState<null | number>(null);
  //!
  //todo Functions
  const handlerClick1 = () => {
    setToggle1(!toggle1);
  };

  const handlerClick2 = () => {
    setToggle2(!toggle2);
  };
  //todo
  //? useEffect
  useEffect(() => {
    if (location && job) {
      setLocationValue(location);
      setJobValue(job);
    }
  }, [location, job]);
  //?
  //* consoleLogs

  //*

  return (
    <Box
      sx={{ borderRadius: "15px", backgroundColor: "white", padding: "20px" }}
    >
      {(() => {
        switch (profilePage) {
          case 0:
            return (
              <Box sx={{ marginTop: "" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Overview
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    marginTop: "24px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      {React.createElement(LocationOnIcon, {
                        color: "primary",
                      })}
                      {locationValue ? (
                        <Typography>{locationValue}</Typography>
                      ) : isMe ? (
                        <Typography
                          onClick={handlerClick1}
                          sx={{ cursor: "pointer" }}
                          color="primary"
                          fontWeight="bold"
                        >
                          <AddIcon
                            sx={{ transform: "translateY(-2px)" }}
                            color="primary"
                          />{" "}
                          Add Location{" "}
                        </Typography>
                      ) : (
                        <Typography sx={{ color: "gray" }}>
                          - No Location
                        </Typography>
                      )}
                    </Box>
                    {isMe && locationValue && (
                      <ModeEditIcon
                        onClick={handlerClick1}
                        sx={{ color: "lightgray", cursor: "pointer" }}
                      />
                    )}
                  </Box>
                  {toggle1 && (
                    <form className="w-full" onSubmit={formik1.handleSubmit}>
                      <Input
                        id="location"
                        onKeyDownHandler={undefined}
                        disabled={false}
                        sx={null}
                        size="small"
                        autoFocus={false}
                        paddingLeft={false}
                        className="w-full"
                        name="location"
                        type="text"
                        value={formik1.values.location}
                        handleChange={formik1.handleChange}
                        placeholder="Add location..."
                        helperText=""
                        error={false}
                        handleBlur={null}
                      />
                    </form>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "8px" }}>
                      {React.createElement(WorkIcon, {
                        color: "primary",
                      })}
                      {jobValue ? (
                        <Typography>{jobValue}</Typography>
                      ) : isMe ? (
                        <Typography
                          onClick={handlerClick2}
                          sx={{ cursor: "pointer" }}
                          color="primary"
                          fontWeight="bold"
                        >
                          <AddIcon
                            sx={{ transform: "translateY(-2px)" }}
                            color="primary"
                          />{" "}
                          Add Job{" "}
                        </Typography>
                      ) : (
                        <Typography sx={{ color: "gray" }}>- No Job</Typography>
                      )}
                    </Box>
                    {isMe && jobValue && (
                      <ModeEditIcon
                        onClick={handlerClick2}
                        sx={{ color: "lightgray", cursor: "pointer" }}
                      />
                    )}
                  </Box>
                  {toggle2 && (
                    <form className="w-full" onSubmit={formik2.handleSubmit}>
                      <Input
                        id="job"
                        onKeyDownHandler={undefined}
                        disabled={false}
                        sx={null}
                        size="small"
                        autoFocus={false}
                        paddingLeft={false}
                        className="w-full"
                        name="job"
                        type="text"
                        value={formik2.values.job}
                        handleChange={formik2.handleChange}
                        placeholder="Add job..."
                        helperText=""
                        error={false}
                        handleBlur={null}
                      />
                    </form>
                  )}
                </Box>

                <Skills />
                <Experience setExpEdit={setExpEdit} />
                <Education setEduEdit={setEduEdit} />
                <Language setLanEdit={setLanEdit} />
              </Box>
            );
          case 1:
            return <SkillsForm />;
          case 2:
            return <ExperienceForm expEdit={expEdit} />;
          case 3:
            return <EducationForm eduEdit={eduEdit} />;
          case 4:
            return <LanguageForm lanEdit={lanEdit} />;
        }
      })()}
    </Box>
  );
};

export default ProfileSelected;
