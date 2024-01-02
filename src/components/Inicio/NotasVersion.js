import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import STPLogo from "./../../images/logo.svg";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrentVersion } from "../../utils/versionControl";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(1.5)" }}
  >
    •
  </Box>
);

const NotasVersion = () => {
  return (
    <Grid2 container spacing={2} justifyContent="center">
      <Grid2 md={7} sx={{ textAlign: "center", marginTop: 3 }}>
        <img src={STPLogo} height={100} />
      </Grid2>
      <Grid2 md={7} sx={{ textAlign: "center" }}>
        <Typography color="secondary" component="div" variant="h3">
          Sistema de Gestión de Cargas (SGDC)
        </Typography>
      </Grid2>
      <Grid2 md={7} sx={{ textAlign: "center" }}>
        <Typography component="div" variant="body">
          Desarrollo de Ingeniería 🇨🇱 - Departamento de Operaciones y Estudios
        </Typography>
      </Grid2>
      <Grid2 md={7}>
        <Divider>
          {" "}
          <Link to="/login">
            <Typography component="div" variant="body">
              Regresar a login...
            </Typography>
          </Link>
        </Divider>
      </Grid2>
      <Grid2 md={7} sx={{ textAlign: "left" }}>
        <Typography component="div" variant="h3">
          Novedades {getCurrentVersion()}
        </Typography>
        <Typography component="div" variant="caption">
          BETA VERSION
        </Typography>
      </Grid2>
      <Grid2 md={7} sx={{ textAlign: "justify", paddingLeft: 3 }}>
        <Typography component="div" variant="body">
          {bull} Se corrige error que bloqueba puestos de cargas impidiendo
          liberarlos, además se agrega nuevo estado 'en espera' como transición
          entre reservado a cargando.
        </Typography>
      </Grid2>
      <Grid2 md={7} sx={{ textAlign: "justify", paddingLeft: 3 }}>
        <Typography component="div" variant="body">
          {bull} Conexión a servicio de cargas y notificaciones, lo que permite
          una mejor experiencia y desempeño en el flujo de cargas.
        </Typography>
      </Grid2>
      <Grid2 md={7}>
        <Divider>
          {" "}
          <Link to="/login">
            <Typography component="div" variant="body">
              Regresar a login...
            </Typography>
          </Link>
        </Divider>
      </Grid2>
    </Grid2>
  );
};

export default NotasVersion;
