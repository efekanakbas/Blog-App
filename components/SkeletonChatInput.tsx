import React from "react";
import { Box, Skeleton } from "@mui/material";
import Input from "@/components/Input";



const SkeletonChatInput = ({screen}: {screen: boolean}) => {
  return (
    <Box
      sx={{
        borderRadius: {xs:"20px", md: "0 20px 20px 0"},
        display: {xs: screen ? "block" : "none" , md: "block"},
        width: {xs: screen ? "90%" : 0 , md: "73%" },
        height: "100%",
        padding: "16px",
        pt: "0",
        backgroundColor: "white",
        position: "relative",
        marginX:"auto",
        // paddingRight:"200px",
        overflow:"hidden"
        
      }}
      
    >
      {/* <Box
        sx={{
          backgroundColor: "red",
          position: "absolute",
          bottom: "16px",
         
          width: "98.5%",
          height: "80px",
          marginBottom: "16px",
          borderRadius: "1rem",
        }}
      >
        <Input
          id="messageInput"
          onKeyDownHandler={undefined}
          sx={{ width: "100%", padding: "0 80px", marginTop: "16px" }}
          size="medium"
          className=""
          disabled={false}
          paddingLeft={false}
          autoFocus={false}
          value={"deneme"}
          handleChange={null}
          name="inputValue"
          type="text"
          placeholder="Type here..."
          helperText=""
          error={false}
          handleBlur={null}
          handleSubmit={undefined}
        />
      </Box> */}
      <Box
        sx={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          flexShrink: "0",
        }}
      >
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1rem",
            backgroundColor: "rgb(243 244 246)",
            width: "8rem",
          }}
        />
      </Box>
      <Skeleton
        sx={{
          height: "calc(100% - 80px)",
          backgroundColor: "rgb(243 244 246)",
          borderRadius: "1rem",
          padding: "16px",
          width: "100%",
        }}
        variant="rounded"
      />
    </Box>
  );
};

export default SkeletonChatInput;
