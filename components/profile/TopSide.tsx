"use client";
import React, { useState, useEffect } from "react";
import Card from "../Card";
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useGeneral } from "@/contexts/GeneralContext";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useFormik } from "formik";
import { useDebounce } from "usehooks-ts";
const PhotoModal = React.lazy(() =>
  import(/* webpackChunkName: "PhotoModal" */ "../PhotoModal")
);
const CropModal = React.lazy(() =>
  import(/* webpackChunkName: "CropModal" */ "../CropModal")
);
import Image from "next/image";
import grayBg from "../../public/images/grayBG.svg";
import ImageIcon from "@mui/icons-material/Image";
import Cookies from "js-cookie";
import { useUserDetail } from "@/contexts/UserDetailContext";
import IButton from "../Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import { patchData, postData } from "@/utils/CRUD";

interface TopSideProps {
  isLoading: Boolean;
}

const TopSide: React.FC<TopSideProps> = ({ isLoading }) => {
  //! States
  const router = useRouter();
  const {
    followersCount,
    followingsCount,
    firstName,
    lastName,
    intro,
    isFollowed,
    username,
  } = useUserDetail();
  const { profileLoading } = useGeneral();

  const name = firstName + " " + lastName;
  const avatar = Cookies.get("avatar");
  const {
    tabValue,
    handleChange: handleChange2,
    setProfilePage,
    setVerticalTabValue,
  } = useGeneral();
  const [formToggle, setFormToggle] = useState(false);
  const [textToggle, setTextToggle] = useState(false);
  const [inputWidth, setInpıtWidth] = useState(75);
  const [sizeType, setSizeType] = useState<"cover" | "avatar" | null>(null);

  const formik = useFormik({
    initialValues: {
      inputValue: intro ? intro : "",
    },
    onSubmit: async (values) => {
      await patchData('intro', {intro: formik.values.inputValue})
      setFormToggle(false);
      setTextToggle(true);
    },
  });

  const debouncedValue = useDebounce<string>(formik.values.inputValue, 500);
  const [modalOpen, setModalOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [sizeToggle, setSizeToggle] = useState<"avatar" | "cover" | null>(null);

  const { isMe } = useGeneral();
  const [followed, setFollowed] = useState(isFollowed)
  const [count, setCount] = useState(followersCount)
  //!
  //todo Functions
  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const handlerSettingsClick = () => {
    router.push("/settings");
  };

  const handlerFollow = async () => {
    if (followed) {
      try {
        setFollowed(false)
        setCount(Number(count) - 1)
        await postData("unFollow", { username: username });
      } catch (error) {
        console.log("error:", error);
      }
    } else {
      try {
        setFollowed(true)
        setCount(Number(count) + 1)
        await postData("follow", { username: username });
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  //todo
  //? useEffect
  useEffect(() => {
    const calculatedWidth = formik?.values?.inputValue?.length * 10;
    const finalWidth = calculatedWidth > 250 ? 250 : calculatedWidth;

    setInpıtWidth(finalWidth);
  }, [formik.values.inputValue]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      inputValue: intro ? intro : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro]);

  useEffect(() => {
      setFollowed(isFollowed == true ? true : false)
  }, [isFollowed])

  useEffect(() => {
      setCount(followersCount)
  }, [followersCount])

  //?
  //* consoleLogs
  // console.log("isMEMEMEME", isMe);
  // console.log("ers", followersCount)
  // console.log("ing", followingsCount)
  // console.log("İSLOADING", isLoading);
  // console.log("intro", intro);
  // console.log("values", formik.values);
  // console.log("isFollowed", isFollowed);
  // console.log("followed", followed)
  // console.log("formik", formik.values.inputValue)
  //*

  return (
    <Box sx={{ borderRadius: "15px", backgroundColor: "white" }}>
      {isLoading || profileLoading ? (
        <Skeleton
          variant="rounded"
          sx={{ margin: "4px", borderRadius: "10px" }}
          height={250}
        />
      ) : (
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
            <button
              onClick={() => {
                setCropOpen(true);
                setSizeType("cover");
              }}
              className="absolute bottom-3 right-3 z-10 bg-white shadow-lg px-4 py-2 rounded-full flex items-center gap-2"
            >
              <ImageIcon color="primary" /> Add Cover Image
            </button>
          )}
          <Image
            onClick={() => {
              setModalOpen(true);
              setSizeToggle("cover");
            }}
            className="rounded-lg object-cover cursor-pointer"
            src={grayBg}
            alt="cover photo"
            fill
          />
        </Box>
      )}
      <Box sx={{ padding: "26px" }}>
        <Box sx={{ display: "flex", gap: "16px" }}>
          {isLoading || profileLoading ? (
            <Skeleton variant="circular" width={100} height={100} />
          ) : (
            <figure className="relative inline-flex">
              {isMe && (
                <button
                  onClick={() => {
                    setCropOpen(true);
                    setSizeType("avatar");
                  }}
                  className="absolute bottom-0 right-0 z-10 p-1 bg-white rounded-full shadow-xl"
                >
                  <PhotoCameraIcon />
                </button>
              )}
              <Avatar
                alt="user avatar"
                onClick={() => {
                  setModalOpen(true);
                  setSizeToggle("avatar");
                }}
                sx={{ width: "100px", height: "100px", cursor: "pointer" }}
                //@ts-ignore
                src={avatar === "null" ? null : avatar}
              />
            </figure>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {isLoading || profileLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "20px", width: "8rem" }}
              />
            ) : (
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {name}
              </Typography>
            )}

            {isLoading || profileLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "14px", width: "6rem" }}
              />
            ) : (
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
                    isMe ? (
                      !intro ? (
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
                        <Box sx={{ display: "flex", gap: "16px" }}>
                          <Typography>{intro}</Typography>
                          <Button
                            type="button"
                            onClick={() => {
                              setFormToggle(false);
                              setFormToggle(true);
                            }}
                            sx={{
                              margin: "0",
                              padding: "0",
                              marginLeft: "16px",
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      )
                    ) : !intro ? (
                      <Typography sx={{ color: "gray" }}>
                        There is no intro
                      </Typography>
                    ) : (
                      <Typography>{intro}</Typography>
                    )
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          minWidth: "75px",
                        }}
                      >
                        {formik.values.inputValue}
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
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="text"
                      autoComplete="off"
                      maxLength={27}
                      name="inputValue"
                      className="min-w-[75px] m-0 p-0 outline-0"
                      value={formik.values.inputValue}
                      onChange={formik.handleChange}
                      style={{ width: inputWidth }}
                      placeholder="Write..."
                    />
                    {(debouncedValue) && (
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
            )}
          </Box>
        </Box>

        <hr className="my-8" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "40px",
          }}
        >
          <Box
            sx={{
              color: "gray",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {isLoading || profileLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "6.1rem" }}
              />
            ) : (
              <Typography>
                <span className="font-bold text-gray-900">
                  {count}
                </span>{" "}
                Followers{" "}
              </Typography>
            )}
            {isLoading || profileLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "6.1rem" }}
              />
            ) : (
              <Typography>
                <span className="font-bold text-gray-900">
                  {followingsCount}
                </span>{" "}
                Followers{" "}
              </Typography>
            )}
          </Box>

          {!isMe ? (
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {isLoading || profileLoading ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={48}
                  sx={{ borderRadius: "100px" }}
                />
              ) : (
                <IButton
                  text={followed ? "Unfollow" : "Follow"}
                  type={followed ? "contained" : "outlined"}
                  buttonType="button"
                  disabled={!!isLoading || !!profileLoading}
                  handleClick={handlerFollow}
                />
              )}

              {isLoading || profileLoading ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={48}
                  sx={{ borderRadius: "100px" }}
                />
              ) : (
                <IButton
                  text="Message"
                  type="outlined"
                  buttonType="button"
                  disabled={!!isLoading || !!profileLoading}
                  handleClick={null}
                />
              )}
            </Box>
          ) : isLoading || profileLoading ? (
            <Skeleton
              variant="rounded"
              width={140}
              height={48}
              sx={{ borderRadius: "100px" }}
            />
          ) : (
            <Button
              disabled={!!isLoading || !!profileLoading}
              variant="outlined"
              style={{
                borderRadius: "100px",
                height: "48px",
                width: "140px",
                display: "flex",
                gap: "4px",
              }}
              onClick={handlerSettingsClick}
            >
              <SettingsIcon />
              Settings
            </Button>
          )}
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
              disabled={!!isLoading || !!profileLoading}
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
              disabled={!!isLoading || !!profileLoading}
            />
          </Tabs>
        </Box>
      </Box>
      <React.Suspense>
        <PhotoModal
          sizeToggle={sizeToggle}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      </React.Suspense>

      <React.Suspense>
        <CropModal sizeType={sizeType} open={cropOpen} setOpen={setCropOpen} />
      </React.Suspense>
    </Box>
  );
};

export default TopSide;
