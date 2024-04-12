"use client";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Zoom from "@mui/material/Zoom";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {  TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/contexts/AuthContext";
import Search from "./Search";
import Cookies from "js-cookie";
import { useGeneral } from "@/contexts/GeneralContext";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utils/CRUD";
import SearchMini from "./SearchMini";

const pages = [
  { icon: HomeIcon, title: "Homepage", link: "/" },
  { icon: ChatIcon, title: "Messages", link: "/messages" },
  { icon: NotificationsIcon, title: "Notifications", link: "/notifications" },
];
const settings = [
  { title: "Profile", icon: AccountBoxIcon },
  { title: "Settings", icon: SettingsIcon },
  { title: "Logout", icon: LogoutIcon },
];

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {
  //! States
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: (values) => {
      console.log("sss", values);
      handleReset(values);
    },
  });

  const router = useRouter();
  const { logout } = useAuth();
  const username = Cookies.get('username')
  const avatar = Cookies.get('avatar')
  const {useAvatar, setUseAvatar} = useGeneral()


  const { error, data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return getData('notifications?from=navbar')
    },
  });

  const myData = data?.filter((item: any) => item.isShown === false)
  //!
  //todo Functions

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //todo
  //? useEffect
useEffect(() => {
  setUseAvatar(avatar)
}, [avatar, setUseAvatar])
  //?
  //* consoleLogs
    // console.log("AVATAAAAAAAAR", avatar)
    // console.log("data", data)
    // console.log("myData", myData)
  //*

  return (
    <AppBar sx={{ bgcolor: "white" }} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AcUnitIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#1976D2",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#1976D2",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              PaperProps={{
                style: {
                  borderRadius: "15px",
                },
              }}
              // id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "#1976D2",
              }}
            >
              <Box
                sx={{
                  p: "2.5rem",
                  pl: "1rem",
                  py: "0.75rem",
                  pt: "1rem",
                  borderRadius: "15px",
                }}
              >
                 {/*@ts-ignore*/}
               <SearchMini/>
                {pages.map((page, i) => (
                  <Link prefetch={true} href={page.link} key={i}>
                    <MenuItem
                      sx={{ display: "flex", gap: "5px" }}
                      onClick={handleCloseNavMenu}
                    >
                      <page.icon color="primary" />
                      <Typography sx={{ color: "#1976d2" }} textAlign="center">
                        {page.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Box>
            </Menu>
          </Box>
          <AcUnitIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#1976D2",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#1976D2",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {/*@ts-ignore*/}
         <Search/>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "20px",
              color: "#1976D2",
              transform: { xs: "0", lg: "translateX(-90px)" },
            }}
          >
            {pages.map((page, i) => (
              <Link className="relative" prefetch={true} href={page.link} key={i}>
                {
                  (page.title === "Notifications" && myData?.length > 0) && <span className="absolute left-[20px] top-[12px] text-red-600 font-bold bg-red-200 p-1 rounded-full h-[20px] w-[20px] flex justify-center items-center">
                  {myData.length}
                </span>
                }
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#1976D2", display: "flex", gap: "8px" }}
                >
                  <page.icon />
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box className="flex items-center gap-3">
              <Tooltip TransitionComponent={Zoom} title="Open settings">
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "8px",
                  }}
                >
                  {/*@ts-ignore*/}
                  <Avatar alt="User avatar" src={useAvatar === "null" ? null : useAvatar} />
                  <Typography color="black">{username}</Typography>
                  <figure>
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  </figure>
                </Box>
              </Tooltip>
            </Box>

            <Menu
              PaperProps={{
                style: {
                  borderRadius: "16px",
                  padding: "10px",
                  width: "187px",
                },
              }}
              sx={{ mt: "45px" }}
              // id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    sx={{ display: "flex", gap: "12px", borderRadius: "16px" }}
                    key={setting.title}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.title === "Profile" &&
                        router.push(`/profile/${username}`);
                      setting.title === "Logout" && logout();
                      setting.title === 'Settings' && router.push("/settings");
                    }}
                  >
                    <setting.icon sx={{ color: "gray" }} />
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
