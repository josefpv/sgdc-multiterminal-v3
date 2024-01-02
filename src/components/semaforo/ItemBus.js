import React from "react";
import { Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import EvStationIcon from "@mui/icons-material/EvStation";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeDerivacion } from "../../redux/actions/derivacion";

const obtieneInfoIconos = (bus) => {
  const info = [];
  if (bus && Object.hasOwn(bus, "cargasJornadas")) {
    //tiene cargas en distintas jornadas
    if (
      Object.hasOwn(bus, "manana") &&
      Object.keys(bus.cargasJornadas.manana).length
    ) {
      //se cargo en jornada mañana
      info.push(
        <Grid2 md={4} xs={12}>
          <Typography component="div" variant="caption">
            <WbCloudyIcon /> Mañana
          </Typography>
        </Grid2>
      );
    }
    if (
      Object.hasOwn(bus, "tarde") &&
      Object.keys(bus.cargasJornadas.tarde).length
    ) {
      //se cargo en jornada tarde
      info.push(
        <Grid2 md={4} xs={12}>
          <Typography component="div" variant="caption">
            <LightModeIcon /> Tarde
          </Typography>
        </Grid2>
      );
    }
    if (
      Object.hasOwn(bus, "noche") &&
      Object.keys(bus.cargasJornadas.noche).length
    ) {
      //se cargo en jornada noche
      info.push(
        <Grid2 md={4} xs={12}>
          <Typography component="div" variant="caption">
            <NightsStayIcon /> Noche
          </Typography>
        </Grid2>
      );
    }
  }

  if (bus.en_estudio) {
    info.push(
      <Grid2 md={12} xs={12}>
        <Typography component="div" variant="caption">
          <BeenhereIcon /> Bajo inspección
        </Typography>
      </Grid2>
    );
  }
  return info;
};

const ItemBus = ({ bus, makeDerivacion, onChangeDerivacion }) => {
  const handleDeleteDerivacion = (ppu) => {
    makeDerivacion(ppu, 1);
    onChangeDerivacion();
  };

  return (
    <Grid2 container>
      <Grid2
        md={12}
        xs={12}
        sx={{
          border: "#f30f0f solid 0.5px",
          borderRadius: 2,
          p: 2,
          marginBottom: 2,
          minHeight: 116,
        }}
      >
        <Grid2 container>
          <Grid2 md={4} xs={4}>
            <Grid2
              container
              spacing={1}
              sx={{ borderRight: "#cccccc solid 0.5px" }}
            >
              <Grid2 md={12} xs={12}>
                <Typography variant="h4" component="div">
                  {bus.ppu}
                </Typography>
              </Grid2>
              <Grid2 md={4} xs={12}>
                <Typography variant="p" component="div">
                  <BatteryChargingFullIcon
                    color="secondary"
                    sx={{ fontSize: 18 }}
                  />{" "}
                  {bus.SOC ? `${bus.SOC}%` : `--`}
                </Typography>
              </Grid2>
              <Grid2 md={8} xs={12}>
                <Typography variant="p" component="div">
                  <CallSplitIcon color="secondary" sx={{ fontSize: 18 }} />{" "}
                  Derivación: {bus.derivacionTipoId > 1 ? bus.derivacion : `--`}
                </Typography>
              </Grid2>
              {bus.derivacionTipoId > 1 && (
                <Grid2 md={12} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleDeleteDerivacion(bus.ppu)}
                  >
                    Eliminar Derivación
                  </Button>
                </Grid2>
              )}
            </Grid2>
          </Grid2>
          <Grid2 md={6} xs={6} sx={{ pl: 2 }}>
            <Grid2 container spacing={1}>
              <Grid2 md={12} xs={12}>
                <Typography component="div" variant="button">
                  Información asociada al bus:
                </Typography>
              </Grid2>
              {obtieneInfoIconos(bus)}
            </Grid2>
          </Grid2>
          <Grid2 md={2} xs={2}>
            <Link
              to={{
                pathname: `/marquesinas/${bus.ppu}/${bus.SOC ? bus.SOC : "--"}`,
                state: { enEstudio: bus.en_estudio },
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ height: "100%", fontSize: 10 }}
                endIcon={<ArrowForwardIcon />}
              >
                Reservar - Derivar
              </Button>
            </Link>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default connect(null, { makeDerivacion })(ItemBus);
