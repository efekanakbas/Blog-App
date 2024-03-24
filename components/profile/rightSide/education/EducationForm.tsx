import {
  Autocomplete,
  Box,
  FormControlLabel,
  InputLabel,
  Switch,
  TextField,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Input from "@/components/Input";
import { useGeneral } from "@/contexts/GeneralContext";
import Button from "@/components/Button";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import MuiSwitch from "@/components/MuiSwitch";
import { patchData } from "@/utils/CRUD";
import { useUserDetail } from "@/contexts/UserDetailContext";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const degreeType = [
  { label: "Associate Degree in Administration of Justice" },
  { label: "Associate Degree in Animal Management" },
  {
    label: "Associate Degree in Architectural Building Engineering Technology",
  },
  { label: "Associate Degree in Architecture and Career Options" },
  { label: "Associate Degree in Art" },
  { label: "Associate Degree in Automotive Maintenance Technology" },
  { label: "Associate Degree in Aviation Mechanics" },
  { label: "Associate Degree in Behavioral Science" },
  { label: "Associate Degree in Boat Mechanics" },
  { label: "Associate Degree in Boat Repair and Maintenance" },
];

interface EducationFormProps {
  eduEdit: number | null;
}

const EducationForm: React.FC<EducationFormProps> = ({ eduEdit }) => {
  //! States
  const { setProfilePage, setVerticalTabValue } = useGeneral();
  const { educations, setEducations } = useUserDetail();

  const editItem = educations?.find((item: any) => item.itemId === eduEdit);

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      school: editItem?.school ? editItem.school : "",
      degree: editItem?.degree ? editItem.degree : "",
      startDate: editItem?.startDate ? editItem.startDate : "",
      endDate: editItem?.endDate ? editItem.endDate : "",
      checked: editItem?.current ? editItem.current : false,
      description: editItem?.description ? editItem.description : "",
    },
    onSubmit: async (values) => {
      if (!editItem) {
        const newUuid = await uuidv4();
        const obj = {
          school: values.school,
          degree: values.degree.label,
          startDate: values.startDate,
          endDate: values.checked ? null : values.endDate,
          current: values.checked,
          description: values.description,
          itemId: newUuid,
        };
        setEducations([...educations, obj]);
        await patchData("educations", obj);
        handleReset(values);
      } else {
        const obj = {
          school: values.school,
          degree: values.degree.label ? values.degree.label : values.degree,
          startDate: values.startDate,
          endDate: values.checked ? null : values.endDate,
          current: values.checked,
          description: values.description,
          itemId: eduEdit,
          edit: true,
        };

        const updatedEducations = educations.map((item: any) => {
          if (item.itemId === eduEdit) {
            return {
              ...item,
              school: values.school,
              degree: values.degree.label ? values.degree.label : values.degree,
              startDate: values.startDate,
              endDate: values.checked ? null : values.endDate,
              current: values.checked,
              description: values.description,
            };
          }

          return item;
        });

        setEducations(updatedEducations);
        await patchData("educations", obj);
      }
    },
  });

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
  const handlerDelete = () => {
    document.body.style.overflow = "hidden";
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      customClass: {
        popup: "border-radius-15",
        confirmButton: "swalButton",
        cancelButton: "swalButton",
      },
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Delete",
      backdrop: "rgba(0, 0, 0, 0.5)",
      didOpen: () => {
        document.body.style.overflow = "auto";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.body.style.overflow = "hidden";
        Swal.fire({
          title: "Deleted!",
          text: "Your education has been deleted.",
          icon: "success",
          confirmButtonText: "OK!",
          confirmButtonColor: "#1976d2",
          didOpen: () => {
            document.body.style.overflow = "auto";
          },
        }).then(async () => {
          setProfilePage(0);
          setVerticalTabValue(0);
          const undeletedEducations = educations.filter(
            (item: any) => item.itemId !== eduEdit
          );
          setEducations(undeletedEducations);
          await patchData("educations", { del: true, itemId: eduEdit });
        });
      }
    });
  };
  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("editItem", editItem);
  console.log("eduEdit", eduEdit);
  //*

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Add Education
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
            htmlFor="schoolInput"
          >
            School
          </InputLabel>
          <Input
            id="schoolInput"
            onKeyDownHandler={undefined}
            disabled={false}
            sx={{ width: "100%" }}
            size="medium"
            handleChange={handleChange}
            value={values.school}
            paddingLeft={false}
            className=""
            type="text"
            autoFocus={false}
            name="school"
            placeholder="Ex. Harvard Business School"
            helperText=""
            error={false}
            handleBlur={null}
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="degreeType"
          >
            Degree Type
          </InputLabel>
          <Autocomplete
            //@ts-ignore
            value={values.degree}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "degree", value: newValue },
              });
            }}
            ListboxProps={{ style: { maxHeight: 250 } }}
            disablePortal
            id="degreeType"
            options={degreeType}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                placeholder="Ex. Master"
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
              disabled={
                values.endDate === null
                  ? false
                  : values.endDate !== "" && !values.checked && true
              }
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
          {!values.checked && (
            <Box sx={{ width: "100%" }}>
              <InputLabel
                sx={{ marginBottom: "8px", color: "black" }}
                htmlFor="endDate"
              >
                End Date
              </InputLabel>
              <Autocomplete
                disabled={
                  values.startDate === null
                    ? true
                    : values.startDate === "" && true
                }
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
          )}
        </Box>

        <Box>
          <MuiSwitch
            name="checked"
            checked={values.checked}
            onChange={handleChange}
            label="I am currently working here"
          />
        </Box>

        <Box>
          <InputLabel
            sx={{ marginBottom: "8px", color: "black" }}
            htmlFor="descriptionInput"
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={values.description}
            onChange={handleChange}
            id="descriptionInput"
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
            placeholder="Description & More Information"
          />
        </Box>

        <hr />

        <Box
          sx={{
            display: "flex",
            justifyContent: !eduEdit ? "end" : "space-between",
          }}
        >
          {eduEdit && (
            <MuiButton
              disabled={isSubmitting}
              onClick={handlerDelete}
              type="button"
              variant="outlined"
              color="error"
              style={{
                borderRadius: "100px",
                height: "48px",
                width: "120px",
              }}
            >
              Delete
            </MuiButton>
          )}

          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              disabled={isSubmitting}
              handleClick={() => {
                setProfilePage(0);
                setVerticalTabValue(0);
              }}
              buttonType="button"
              type="outlined"
              text="Cancel"
            />
            <Button
              disabled={isSubmitting}
              handleClick={null}
              buttonType="submit"
              type="contained"
              text="Save"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EducationForm;
