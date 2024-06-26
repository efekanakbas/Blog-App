import React, { useEffect, useState } from "react";
import Popper from "@mui/material/Popper";
import { Box, Fade, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SearchBox from "./SearchBox";
import { getData } from "@/utils/CRUD";

interface dataProps {
  avatar: string;
  username: string;
  name: string;
}

interface SearchProps {
  data: dataProps[];
}

const Search: React.FC<SearchProps> = () => {
  //! States
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: (values) => {
      router.push("/search");
      handleReset(values);
    },
  });

  const debouncedValueFirst = useDebounce(values.searchValue.length > 0, 600);
  const [debouncedValue, setDebouncedValue] = useState(debouncedValueFirst);

  const debouncedValueText = useDebounce(values.searchValue, 600);

  const open = debouncedValue;
  const id = open ? "popper" : undefined;

  const { data, isFetching, error, refetch, isFetched, isLoading } = useQuery<
    any
  >({
    queryKey: ["search"],
    queryFn: async () => {
      return await getData(`search?params=${debouncedValueText}`);
    },
    enabled: debouncedValue
  });

  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);

  const router = useRouter();
  const [myData, setMyData] = useState([]);
  const [myFetched, setMyFetched] = useState(isFetched);
  //!

  //todo Functions
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //todo

  //? useEffect
  useEffect(() => {
    setIsTextFieldDisabled(false);
  }, []);

  useEffect(() => {
    if (debouncedValueFirst) {
      setDebouncedValue(debouncedValueFirst);
      if (debouncedValueText.length > 0) {
        refetch();
      }
    } else {
      setDebouncedValue(false);
      setTimeout(() => {
        setMyData([]);
      }, 500);
    }
  }, [debouncedValueFirst, refetch, debouncedValueText]);

  useEffect(() => {
    if (isFetching) {
      setMyFetched(false);
    } else {
      setMyFetched(isFetched);
    }
  }, [isFetched, isFetching]);

  useEffect(() => {
    if (data && myFetched) {
      setMyData(data);
    }
  }, [data, myFetched]);

  //?

  //* consoleLogs
  // console.log("dede", debouncedValue)
  // console.log("data", data);
  // console.log("isFetching", isFetching);
  // console.log("debouncedValueFirst", debouncedValueFirst)
  // console.log("myFetched", myFetched);
  // console.log("myData", myData);
  //*

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
          autoComplete="off"
          disabled={isTextFieldDisabled}
          placeholder="Search"
          name="searchValue"
          type="text"
          value={values.searchValue}
          onChange={(event) => {
            handleChange(event);
            if (event.target.value.length > 0) {
              handleClick(event as any);
            }
          }}
          size="small"
          id="outlinedInput"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ marginLeft: "15px" }}
              ></InputAdornment>
            ),
            style: {
              borderRadius: "25px",
              outline: "none",
            },
          }}
        />
      </form>
      <Popper
        style={{ zIndex: 10000 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              onMouseLeave={() => {
                setDebouncedValue(false);
                handleReset(values);
                setTimeout(() => {
                  setMyData([]);
                }, 500);
              }}
              sx={{
                marginTop: "15.4px",
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "20rem",
                transform: "translateX(-18px)",
                borderRadius: "0 0 15px 15px",
                display: "flex",
              }}
            >
              <SearchBox
                data={myData}
                isLoading={isFetching}
                setDebouncedValue={setDebouncedValue}
                handleReset={handleReset}
                values={values}
                debouncedValueText={debouncedValueText}
                mini = {false}
                handleZero={() => {}}
              />

              {/* <SearchBox
                data={data}
                isLoading={isLoading}
                setDebouncedValue={setDebouncedValue}
                handleReset={handleReset}
                values={values}
                debouncedValueText={debouncedValueText}
              /> */}
              {/* 
              <SearchBox
                data={data}
                isLoading={isLoading}
                setDebouncedValue={setDebouncedValue}
                handleReset={handleReset}
                values={values}
                debouncedValueText={debouncedValueText}
              /> */}
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Search;
