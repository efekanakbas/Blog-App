import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import SearchSkeleton from "./SearchSkeleton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';

interface SearchBoxProps {
  data: Data[];
  isLoading: boolean;
  setDebouncedValue: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: (e: any) => void;
  values: {
    searchValue: string;
  };
  debouncedValueText: string;
  mini: boolean;
  handleZero: () => void
}

const SearchBox: React.FC<SearchBoxProps> = ({
  data,
  isLoading,
  setDebouncedValue,
  handleReset,
  values,
  debouncedValueText,
  mini,
  handleZero
}) => {
  //! States
  const myArray = [1, 2, 3, 4];
  const router = useRouter();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  // console.log("data", data);
  //*

  return (
    <Box sx={{ width: "calc(100%)" }}>
      <Box
        sx={{
          // borderRight: "1px solid white",
          bgcolor: "#eeeff3",
          width: "100%",
          height: "60px",
          p: 2,
          px: 3,
          borderRadius: mini ? "15px 15px 0 0" : 0,
          display:"flex",
          justifyContent:"space-between"
        }}
      >
        <Typography variant="h6">Users</Typography>
        {
          mini && (
            <button onClick={handleZero} className="translate-x-2">
          <CloseIcon/>
        </button>
          )
        }
      </Box>

      <Box
        sx={{
          // borderRight: "1px solid #eeeff3",
          p: 2,
          px: 3,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "320px",
        }}
      >
        {isLoading
          ? myArray.map((_, index) => <SearchSkeleton mini = {mini} key={index} />)
          : data?.slice(0, 4).map((item: any, i: number) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`/profile/${item.username}`);
                  setDebouncedValue(false), handleReset(values);
                }}
              >
                <Avatar
                  sx={{ width: "60px", height: "60px" }}
                  alt="user avatar"
                  src={item.avatar}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{item.name}</Typography>

                  <Typography sx={{ color: "gray", fontSize: "14px" }}>
                    {item.username}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>

      <Box
        sx={{
          // borderRight: "1px solid #eeeff3",
          borderTop: "1px solid #eeeff3",
          p: 2,
          px: 3,
          height: "70px",
        }}
      >
        <button
          onClick={() => {
            console.log("debo", debouncedValueText)
            router.push(`/search/${debouncedValueText}`);
            setDebouncedValue(false), handleReset(values);
          }}
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <figure
            style={{
              backgroundColor: "#0071d8",
              color: "white",
              borderRadius: "100px",
              padding: "5px",
              display: "inline-flex",
              height: "40px",
              width: "40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchIcon />
          </figure>

          <Typography>
            Search for <span className="font-bold">{debouncedValueText}</span>
          </Typography>
        </button>
      </Box>
    </Box>
  );
};

export default SearchBox;
