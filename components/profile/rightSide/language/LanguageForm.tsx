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

const language = [
  { label: "Akan" },
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
  { label: "Elementary" },
  { label: "Limited Working" },
  { label: "Minimum Professional" },
  { label: "Full Professional" },
  { label: "Native" },
];

interface LanguageFormProps {
  lanEdit: number | null;
}

const LanguageForm: React.FC<LanguageFormProps> = ({ lanEdit }) => {
  //! States
  const { setProfilePage, setVerticalTabValue } = useGeneral();
  const { languages, setLanguages } = useUserDetail();

  const editItem = languages?.find((item: any) => item.itemId === lanEdit);

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      language: editItem?.language ? editItem.language : "",
      level: editItem?.level ? editItem.level : "",
    },
    onSubmit: async (values) => {
      if (!editItem) {
        const newUuid = await uuidv4();
        const obj = {
          language: values.language.label,
          level: values.level.label,
          itemId: newUuid,
        };
        setLanguages([...languages, obj]);
        await patchData("languages", obj);
        handleReset(values);
      } else {
        const obj = {
          language: values.language.label
            ? values.language.label
            : values.language,
          level: values.level.label ? values.level.label : values.level,
          itemId: lanEdit,
          edit: true,
        };

        const updatedLanguages = languages.map((item: any) => {
          if (item.itemId === lanEdit) {
            return {
              ...item,
              language: values.language.label
                ? values.language.label
                : values.language,
              level: values.level.label ? values.level.label : values.level,
            };
          }

          return item;
        });

        setLanguages(updatedLanguages);
        await patchData("languages", obj);
      }
    },
  });

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
          text: "Your language has been deleted.",
          icon: "success",
          confirmButtonText: "OK!",
          confirmButtonColor: "#1976d2",
          didOpen: () => {
            document.body.style.overflow = "auto";
          },
        }).then(async () => {
          setProfilePage(0);
          setVerticalTabValue(0);
          const undeletedLanguages = languages.filter(
            (item: any) => item.itemId !== lanEdit
          );
          setLanguages(undeletedLanguages);
          await patchData("languages", { del: true, itemId: lanEdit });
        });
      }
    });
  };
  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("lanEdit", lanEdit);
  // console.log("editItem", editItem);
  // console.log("languages", languages);
  // console.log("isSubmitting", isSubmitting)
  // console.log("editLanguage", editLanguage);
  // console.log("editLevel", editLevel)
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

        <Box
          sx={{
            display: "flex",
            justifyContent: !lanEdit ? "end" : "space-between",
          }}
        >
          {lanEdit && (
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

export default LanguageForm;
