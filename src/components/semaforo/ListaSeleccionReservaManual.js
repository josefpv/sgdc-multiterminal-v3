import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import EvStationIcon from "@mui/icons-material/EvStation";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import Battery from "../common/battery";
import FlashAutoIcon from "@mui/icons-material/FlashAuto";
import { green, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import NightsStayIcon from "@mui/icons-material/NightsStay";

import { Paper, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  root: {
    flexGrow: 1,
    maxWidth: "100%",
  },
  demo: {
    backgroundColor: "#ffffff",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function BusesLista({ data, campoFiltro }) {
  const classes = useStyles();
  return campoFiltro ? (
    <Grid2 container sx={{ marginTop: 2 }}>
      <Grid2 md={12}>
        <Typography variant="caption" component="div" sx={{ color: "#8f8d8d" }}>
          <EvStationIcon sx={{ marginLeft: 2 }} /> Reservar
          <BeenhereIcon sx={{ marginLeft: 2 }} /> Bajo inspección
          <WbCloudyIcon sx={{ marginLeft: 2 }} /> Cargado - mañana
          <LightModeIcon sx={{ marginLeft: 2 }} /> Cargado - tarde
          <NightsStayIcon sx={{ marginLeft: 2 }} /> Cargado - noche
        </Typography>
      </Grid2>
      <Grid2 md={12}>
        <List dense={false}>
          {data.map((bus, index) => {
            return (
              <ListItem divider key={index}>
                <Battery soc={bus.SOC ? bus.SOC : 0} />
                <ListItemText
                  primary={bus.ppu}
                  secondary={bus.SOC ? `SOC: ${bus.SOC}%` : null}
                />
                <ListItemSecondaryAction>
                  {bus.en_estudio ? (
                    <IconButton
                      edge="end"
                      aria-label="en inspeccion"
                      title="En Inspeccion"
                      onClick={() =>
                        toast.info("Este bus se encuentra bajo inspección.")
                      }
                      size="large"
                    >
                      <BeenhereIcon style={{ color: red[500] }} />
                    </IconButton>
                  ) : null}
                  <IconButton
                    edge="end"
                    aria-label="Bus cargado en bloque mañana"
                    title="Cargado - Mañana"
                    onClick={() =>
                      toast.info("Este bus fue cargado en el bloque mañana.")
                    }
                    size="large"
                  >
                    <WbCloudyIcon style={{ color: red[500] }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Bus cargado en bloque tarde"
                    title="Cargado - Tarde"
                    onClick={() =>
                      toast.info("Este bus fue cargado en el bloque tarde.")
                    }
                    size="large"
                  >
                    <LightModeIcon style={{ color: red[500] }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Bus cargado en bloque noche"
                    title="Cargado - Noche"
                    onClick={() =>
                      toast.info("Este bus fue cargado en el bloque noche.")
                    }
                    size="large"
                  >
                    <NightsStayIcon style={{ color: red[500] }} />
                  </IconButton>

                  <Link
                    to={{
                      pathname: `/marquesinas/${bus.ppu}/${
                        bus.SOC ? bus.SOC : "--"
                      }`,
                      state: { enEstudio: bus.en_estudio },
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="charge"
                      title="Reservar"
                      size="large"
                    >
                      <EvStationIcon style={{ color: green[500] }} />
                    </IconButton>
                  </Link>
                  {/* <IconButton
                      edge="end"
                      aria-label="parking"
                      title="Estacionar"
                      disabled
                    >
                      <LocalParkingIcon style={{ color: red[500] }} />
                    </IconButton> */}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid2>
    </Grid2>
  ) : null;
}
