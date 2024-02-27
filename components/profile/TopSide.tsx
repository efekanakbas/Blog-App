"use client";
import React, { useState, useEffect } from "react";
import Card from "../Card";
import {
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useFormik } from "formik";
import { useDebounce } from "usehooks-ts";
const PhotoModal = React.lazy(() => import(/* webpackChunkName: "PhotoModal" */ "../PhotoModal"));
const CropModal = React.lazy(() => import(/* webpackChunkName: "CropModal" */ "../CropModal"));
import Image from "next/image";
import grayBg from "../../public/images/grayBG.svg";
import ImageIcon from "@mui/icons-material/Image";


interface TopSideProps {
  // Define props here
}

const TopSide: React.FC<TopSideProps> = () => {
  //! States
  const {
    avatar,
    name,
    tabValue,
    handleChange: handleChange2,
    setProfilePage,
    setVerticalTabValue,
  } = useGeneral();
  const [formToggle, setFormToggle] = useState(false);
  const [textToggle, setTextToggle] = useState(false);
  const [inputWidth, setInpıtWidth] = useState(75);
  const [sizeType, setSizeType] = useState<'cover' | 'avatar' | null>(null)

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      inputValue: "",
    },
    onSubmit: (values) => {
      console.log("selaaaaaam");
      setFormToggle(false);
      setTextToggle(true);
      // handleReset(values);
    },
  });

  const debouncedValue = useDebounce<string>(values.inputValue, 500);
  const [modalOpen, setModalOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false)
  const [sizeToggle, setSizeToggle] = useState<'avatar' | 'cover' |  null>(null)

  const { isMe } = useGeneral();
  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  //todo
  //? useEffect
  useEffect(() => {
    const calculatedWidth = values.inputValue.length * 10;
    const finalWidth = calculatedWidth > 250 ? 250 : calculatedWidth;

    setInpıtWidth(finalWidth);
  }, [values.inputValue]);
  //?
  //* consoleLogs
 
  //*

  return (
    <Box sx={{ borderRadius: "15px", backgroundColor: "white" }}>
      <Box
        sx={{
          // backgroundColor: "#eeeeee",
          borderRadius: "10px",
          margin: "4px",
          height: "250px",
          position: "relative",
        }}
      >
        {isMe && (
          <button  onClick={() => {setCropOpen(true); setSizeType('cover')}} className="absolute bottom-3 right-3 z-10 bg-white shadow-lg px-4 py-2 rounded-full flex items-center gap-2">
            <ImageIcon color="primary" /> Add Cover Image
          </button>
        )}
        <Image
          onClick={() => {setModalOpen(true); setSizeToggle('cover')}}
          className="rounded-lg object-cover cursor-pointer"
          src={grayBg}
          alt="cover photo"
          fill
        />
      </Box>
      <Box sx={{ padding: "26px" }}>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <figure className="relative inline-flex">
            <button onClick={() => {setCropOpen(true); setSizeType('avatar')}} className="absolute bottom-0 right-0 z-10 p-1 bg-white rounded-full shadow-xl">
              <PhotoCameraIcon />
            </button>
            <Avatar
              alt="user avatar"
              onClick={() => {
                setModalOpen(true);
                setSizeToggle('avatar')
              }}
              sx={{ width: "100px", height: "100px", cursor: "pointer" }}
              src={avatar}
            />
          </figure>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                height: "20px",
                alignItems: "center",
              }}
            >
              {!formToggle ? (
                !textToggle ? (
                  <Typography
                    onClick={() => {
                      setFormToggle(true);
                    }}
                    sx={{
                      color: "#0071d8",
                      fontWeight: "bold",
                      textDecoration: "underline 2px",
                      textUnderlineOffset: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Add Intro
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        minWidth: "75px",
                      }}
                    >
                      {values.inputValue}
                    </Typography>
                    <Button
                      type="button"
                      onClick={() => {
                        setFormToggle(false);
                        setFormToggle(true);
                      }}
                      sx={{ margin: "0", padding: "0", marginLeft: "16px" }}
                    >
                      Edit
                    </Button>
                  </Box>
                )
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    maxLength={27}
                    name="inputValue"
                    className="min-w-[75px] m-0 p-0 outline-0"
                    value={values.inputValue}
                    onChange={handleChange}
                    style={{ width: inputWidth }}
                  />
                  {debouncedValue.length > 0 && (
                    <Button
                      type="submit"
                      sx={{ margin: "0", padding: "0", marginLeft: "10px" }}
                    >
                      Save
                    </Button>
                  )}
                </form>
              )}
            </Box>
          </Box>
        </Box>

        <hr className="my-8" />

        <Box sx={{ color: "gray" }}>
          <span className="font-bold text-gray-900">100+</span> Conndetions{" "}
          <span className="font-bold text-gray-900">852 </span> Followers{" "}
          <span className="font-bold text-gray-900">156</span> Following
        </Box>

        <hr className="my-8" />

        <Box>
          <Tabs
            value={tabValue}
            onChange={handleChange2}
            aria-label="basic tabs"
          >
            <Tab
              style={{
                backgroundColor: tabValue === 0 ? "#eeeeee" : "",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
                transition: "all .5s",
                marginRight: "8px",
              }}
              label="Feed"
              {...a11yProps(0)}
            />
            <Tab
              onClick={() => {
                setProfilePage(0);
                setVerticalTabValue(0);
              }}
              style={{
                backgroundColor: tabValue === 1 ? "#eeeeee" : "",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
                transition: "all .5s",
              }}
              label="Profile"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Box>
      <React.Suspense >
        <PhotoModal sizeToggle={sizeToggle} open={modalOpen} setOpen={setModalOpen} />
      </React.Suspense>

      <React.Suspense >
        <CropModal sizeType={sizeType} open={cropOpen} setOpen={setCropOpen} />
      </React.Suspense>
    </Box>
  );
};

export default TopSide;
