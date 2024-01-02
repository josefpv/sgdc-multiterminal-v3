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
import Battery from "./../common/battery";
import FlashAutoIcon from "@mui/icons-material/FlashAuto";
import { green, red } from "@mui/material/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  root: {
    flexGrow: 1,
    maxWidth: "100%",
  },
  demo: {
    backgroundColor: "",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function BusesProximosTerminal({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={12}>
        <div className={classes.demo}>
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
                    {/* <IconButton
                      edge="end"
                      aria-label="autoCharge"
                      title="Reservar (Asignación Inteligente)"
                      disabled
                      size="large"
                    >
                      <FlashAutoIcon style={{ color: green[500] }} />
                    </IconButton> */}
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
                      size="large"
                    >
                      <LocalParkingIcon style={{ color: red[500] }} />
                    </IconButton> */}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
      <div className="row" style={{ color: "#a6a6a6" }}>
        {/*  <div className="col">
          <h6>
            <FlashAutoIcon />
            Reserva Inteligente (Próximamente)
          </h6>
        </div> */}
        <div className="col">
          <h6>
            <EvStationIcon />
            Reserva
          </h6>
        </div>
        {/*  <div className="col">
          <h6>
            <LocalParkingIcon />
            Estacionar (Próximamente)
          </h6>
        </div> */}
      </div>
    </div>
  );
}
