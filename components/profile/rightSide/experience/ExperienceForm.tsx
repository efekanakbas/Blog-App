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
import { useUserDetail } from "@/contexts/UserDetailContext";
import { patchData } from "@/utils/CRUD";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const contractType = [
  { label: "Part Time" },
  { label: "Temporary" },
  { label: "Permanent" },
  { label: "Freelance" },
];

interface ExperienceFormProps {
  expEdit: number | null;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ expEdit }) => {
  //! States
  const { setProfilePage, setVerticalTabValue } = useGeneral();
  const { experiences, setExperiences } = useUserDetail();

  const editItem = experiences?.find((item: any) => item.itemId === expEdit);

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      company: editItem?.company ? editItem.company : "",
      title: editItem?.title ? editItem.title : "",
      contractType: editItem?.contractType ? editItem.contractType : "",
      startDate: editItem?.startDate ? editItem.startDate : "",
      endDate: editItem?.endDate ? editItem.endDate : "",
      checked: editItem?.current ? editItem.current : false,
      mission: editItem?.missions ? editItem.missions : "",
    },
    onSubmit: async (values) => {
      if (!editItem) {
        const newUuid = await uuidv4();
        const obj = {
          company: values.company,
          title: values.title,
          contractType: values.contractType.label,
          startDate: values.startDate,
          endDate: values.checked ? null : values.endDate,
          current: values.checked,
          missions: values.mission,
          itemId: newUuid,
        };
        setExperiences([...experiences, obj]);
        await patchData("experiences", obj);
        handleReset(values);
      } else {
        const obj = {
          company: values.company,
          title: values.title,
          contractType: values.contractType.label
            ? values.contractType.label
            : values.contractType,
          startDate: values.startDate,
          endDate: values.checked ? null : values.endDate,
          current: values.checked,
          missions: values.mission,
          itemId: expEdit,
          edit: true,
        };

        const updatedExperiences = experiences.map((item: any) => {
          if (item.itemId === expEdit) {
            return {
              ...item,
              company: values.company,
              title: values.title,
              contractType: values.contractType.label
                ? values.contractType.label
                : values.contractType,
              startDate: values.startDate,
              endDate: values.checked ? null : values.endDate,
              current: values.checked,
              missions: values.mission,
            };
          }

          return item;
        });

        setExperiences(updatedExperiences);
        await patchData("experiences", obj);
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
          text: "Your experience has been deleted.",
          icon: "success",
          confirmButtonText: "OK!",
          confirmButtonColor: "#1976d2",
          didOpen: () => {
            document.body.style.overflow = "auto";
          },
        }).then(async () => {
          setProfilePage(0);
          setVerticalTabValue(0);
          const undeletedExperiences = experiences.filter(
            (item: any) => item.itemId !== expEdit
          );
          setExperiences(undeletedExperiences);
          await patchData("experiences", { del: true, itemId: expEdit });
        });
      }
    });
  };
  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("experiences", experiences);
  console.log("expEdit", expEdit);
  console.log("editItem", editItem);
  // console.log("partTİme", values.contractType);
  // console.log("start", values.startDate);
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
            helperText=""
            error={false}
            handleBlur={null}
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
            helperText=""
            error={false}
            handleBlur={null}
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
                value={values.checked ? null : values.endDate}
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

        <Box
          sx={{
            display: "flex",
            justifyContent: !expEdit ? "end" : "space-between",
          }}
        >
          {expEdit && (
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

export default ExperienceForm;
