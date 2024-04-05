import { Avatar, Box, InputLabel, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import validationSchema from "../../../schemas/settingsEmailSchema";
import { useQuery } from "@tanstack/react-query";
import { getData } from '@/utils/CRUD';

interface BlockedList {
  id: string;
  avatar: string;
  username: string;
  text: string;
}

interface BlockListProps {
  data: BlockedList[];
}

const BlockList: React.FC<BlockListProps> = () => {
  //! States
  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      current: "",
      new: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // handleReset(values);
    },
  });

  const { error, data, isLoading } = useQuery({
    queryKey: ["blocked"],
    queryFn: async () => {
      return getData('blocked')
    },
  });

  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs
  console.log("data", data);
  //*

  return (
    <Box sx={{borderRadius:'15px', backgroundColor:'white', padding:'20px', pb:'0'}}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography variant="h6">See people that I blocked</Typography>
        <Typography sx={{ color: "gray" }}>
          You can select who can see your connections, your followers and your
          following list.
        </Typography>
      </Box>
      <hr className="mt-6 " />

      {data.length === 0 ? (
        <Box sx={{ paddingY: "32px" }}>- Blocked person not found</Box>
      ) : (
        <Box
          className="scrollBarHidden"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            overflow: "auto",
            maxHeight: "calc(100vh - 230px)",
            paddingTop: "32px",
            paddingBottom:'32px'
          }}
        >
          {data.map((item: BlockedList, i: number) => (
            <Box sx={{ display: "flex", gap: "12px" }} key={i}>
              <Avatar
                sx={{ width: "70px", height: "70px" }}
                alt="user avatar"
                src={item.avatar}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{item.username}</Typography>
                <Typography>{item.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BlockList;
