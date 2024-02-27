import React, { useEffect } from "react";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { Box, Fade, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "usehooks-ts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/api";

interface dataProps {
  avatar: string
  username: string
  name: string
}

interface SearchProps {
  // Define props here
}

const Search: React.FC<SearchProps> = () => {
  //! States
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: (values) => {
      handleReset(values);
    },
  });

  // useDebounce hook'unu kullanarak input değişikliklerini izle
  const debouncedValue = useDebounce(values.searchValue.length > 0, 600);
  const open = debouncedValue;
  const id = open ? "popper" : undefined;

  const {data, isLoading, error} = useQuery({
    queryKey:['search'],
    queryFn: getSearch,
    enabled: debouncedValue
  })
  //! 

  //todo Functions
  // Input alanına her bir değişiklik yapıldığında popover'ın açılmasını tetikle
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //todo

  //? useEffect
  
  //?

  //* consoleLogs
    console.log("data", data)
  //*

  return (
    <Box  sx={{ display: { xs: "none", md: "flex" } }}>
      <form id={id} style={{ position: "relative" }} onSubmit={handleSubmit}>
        <figure
          style={{
            position: "absolute",
            color: "gray",
            top: "9px",
            left: "10px",
          }}
        >
          <SearchIcon
            sx={{ display: { xs: "none", md: "block" } }}
            style={{ fontSize: "22px" }}
          />
        </figure>
        <TextField
          placeholder="Search"
          name="searchValue"
          type="text"
          value={values.searchValue}
          onChange={(event) => {
            handleChange(event);
            // Inputa veri yazıldığında popover'ın açılmasını tetikle
            if (event.target.value.length > 0) {
              handleClick(event as any);
            }
          }}
          size="small"
          id="outlinedInput"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginLeft: "15px" }}>
                {/*  İstenirse buraya bir simge veya içerik eklenebilir */}
              </InputAdornment>
            ),
            style: {
              borderRadius: "25px",
              outline: "none",
            },
          }}
        />
      </form>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        // onClose={handleClose}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "left",
        // }}
        // a    // anchorPosition={{ top:   55, left:   330 }}nchorReference="anchorPosition"
        // anchorPosition={{ top:   55, left:   330 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                
                paddingTop: "15px", 
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "69rem",
                transform: "translateX(215px)",
                borderRadius: "0 0 15px 15px",
                display:'flex'
              }}
            >
              <Box sx={{width:'calc(100% / 3)' }} >
                <Box sx={{borderRight:'1px solid white', bgcolor:'#eeeff3', width:'100%', height:'60px', p:2, px:3}}>
                <Typography variant="h6">
                  Users
                </Typography>
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3',  p:2, px:3, display:'flex', flexDirection:'column', gap:'12px'}}>
                  {data?.users?.map((item: dataProps , i: number) => (
                    <Box key={i}>
                      {
                        item.username
                      }
                    </Box>
                  ))}
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3'}}>
                  
                </Box>
              </Box>

              <Box sx={{width:'calc(100% / 3)' }} >
                <Box sx={{borderRight:'1px solid white', bgcolor:'#eeeff3', width:'100%',  height:'60px', p:2, px:3}}>
                <Typography variant="h6">
                  Projects
                </Typography>
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3',  p:2, px:3}}>
                  selam2
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3'}}>
                  
                </Box>
              </Box>

              <Box sx={{width:'calc(100% / 3)' }} >
                <Box sx={{ bgcolor:'#eeeff3', width:'100%',  height:'60px', p:2, px:3}}>
                <Typography variant="h6">
                  Companies
                </Typography>
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3',  p:2, px:3}}>
                  
                </Box>

                <Box sx={{borderRight:'1px solid #eeeff3'}}>
                  
                </Box>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Search;
