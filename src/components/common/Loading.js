import { CircularProgress, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import busCarga from "./../../images/bus_carga.gif";

const Loading = ({ label }) => {
  return (
    <Grid2
      container
      justifyContent="center"
      height="100vh"
      alignContent="center"
      alignItems="center"
    >
      <Grid2 xs={12} sx={{ paddingBottom: 3 }}>
        <Typography
          sx={{ textAlign: "center" }}
          component="div"
          variant="button"
        >
          {label}
        </Typography>
      </Grid2>
      <CircularProgress color="secondary" size={80} />
    </Grid2>
  );
};

export default Loading;
