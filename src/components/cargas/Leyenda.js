import React from "react";
import EvStationIcon from "@mui/icons-material/EvStation";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

const Leyenda = ({ data }) => {
  return (
    <Grid2
      container
      sx={{
        bgcolor: "white",
        p: 2,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      }}
      justifyContent="center"
    >
      <Grid2 xs={12} md={12}>
        <Grid2 container>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#32b343" }} />
              {`Disponible (${data.countDisponibles})`}
            </Typography>
          </Grid2>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#f0c818" }} />
              {`Reservado (${data.countReservados})`}
            </Typography>
          </Grid2>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#03428a" }} />
              {`Cargando (${data.countCargando})`}
            </Typography>
          </Grid2>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#cc1d02" }} />
              {`Ocupado (${data.countOcupados})`}
            </Typography>
          </Grid2>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#ba34eb" }} />
              {`Operativo (${data.countOperativo ? data.countOperativo : 0})`}
            </Typography>
          </Grid2>
          <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#fc9235" }} />
              {`Deshabilitado (${data.countInhabilitados})`}
            </Typography>
          </Grid2>
          {/*    <Grid2 xs={2} md>
            <Typography
              component="div"
              variant="button"
              sx={{ fontSize: isMobile ? "0.4rem" : "0.7rem" }}
            >
              <EvStationIcon sx={{ color: "#cccccc" }} />
              {`Sin Cargador`}
            </Typography>
          </Grid2> */}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Leyenda;

/*

   <div
      className="alert alert-secondary"
      role="alert"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="row" style={{ margin: "5px" }}>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#32b343" }} />
            DISPONIBLE
          </h6>
        </div>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#f0c818" }} />
            RESERVADO
          </h6>
        </div>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#03428a" }} />
            CARGANDO
          </h6>
        </div>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#cc1d02" }} />
            OCUPADO
          </h6>
        </div>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#fc9235" }} />
            DESHABILITADO
          </h6>
        </div>
        <div className="col">
          <h6 style={{ fontSize: "14px" }}>
            <EvStationIcon style={{ color: "#cccccc" }} />
            SIN PUESTO
          </h6>
        </div>
      </div>
    </div>

*/
