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
import AdbIcon from "@mui/icons-material/Adb";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Zoom from "@mui/material/Zoom";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { TextField } from "@mui/material";
import avatar1 from "../../public/images/avatars/6.png";
import { useFormik } from "formik";
import Link from "next/link";
import Card from "./Card";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useGeneral } from "@/contexts/GeneralContext";

const pages = [
  { icon: HomeIcon, title: "Homepage", link:"/" },
  { icon: ChatIcon, title: "Messages", link:"/messages" },
  { icon: NotificationsIcon, title: "Notifications", link:"/notifications" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface NavbarProps {
  // Define props here
}

const Navbar: React.FC<NavbarProps> = () => {
  //! States
  const {avatar} = useGeneral()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const {
    values,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: (values) => {
      console.log("sss", values);
      handleReset(values)
    },
  });

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

  //?
  //* consoleLogs

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
                  borderRadius: "15px"
                }, 
              }}
              id="menu-appbar"
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
              <Box sx={{p:"2.5rem", pl:"1rem", py:"0.75rem", pt:"1rem", borderRadius:"15px", }} >
              <form onSubmit={handleSubmit}>
            <TextField
              InputProps={{
                style: {
                  borderRadius: "25px",
                  outline:"none"
                },
              }}
              placeholder="Search"
              sx={{ display: { xs: "flex", md: "none"}, width:"150px", transform:"translateX(10px)", mb:"5px" }}
              name="searchValue"
              type="text"
              value={values.searchValue}
              onChange={handleChange}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </form>
              {pages.map((page, i) => (
                <Link prefetch={true} href={page.link} key={i}>
                  <MenuItem sx={{display:"flex", gap:"5px"}}  onClick={handleCloseNavMenu}>
                  <page.icon color="primary" />
                  <Typography sx={{color:"#1976d2"}} textAlign="center">{page.title}</Typography>
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
          <form style={{position:"relative"}} onSubmit={handleSubmit}>
            <figure style={{position:"absolute", color:"gray", top:"9px", left:"10px"}} >
              <SearchIcon sx={{ display: { xs: "none", md: "block" } }} style={{fontSize:"22px"}} />
            </figure>
            <TextField
              InputProps={{
                style: {
                  borderRadius: "25px",
                  outline:"none",
                  paddingLeft:"20px"
                },
              }}
              placeholder="Search"
              sx={{ display: { xs: "none", md: "flex" } }}
              name="searchValue"
              type="text"
              value={values.searchValue}
              onChange={handleChange}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </form>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "20px",
              color: "#1976D2",
              transform:{xs:"0", lg:"translateX(-90px)"}
            }}
          >
            {pages.map((page, i) => (
              <Link prefetch={true} href={page.link}  key={i}>
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
            <Box className='flex items-center gap-3'>
            <Tooltip TransitionComponent={Zoom} title="Open settings">
              <Box className="flex items-center cursor-pointer gap-2" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={avatar} />
                <Typography color='black'>
                Efekan Akbaş
              </Typography>
              <figure>
                <KeyboardArrowDownIcon sx={{color:"black"}} />
              </figure>
              </Box>
            </Tooltip>
            
            </Box>
            
            <Menu
              PaperProps={{
                style: {
                  borderRadius: "15px",
                  padding:"10px 80px 10px 10px ",
                }, 
              }}
              sx={{ mt: "45px", }}
              id="menu-appbar"
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
             
              <Box  >
                {settings.map((setting) => (
                <MenuItem   key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
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
