import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "10%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
