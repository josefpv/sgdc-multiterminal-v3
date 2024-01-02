import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Battery from "./../common/battery";
import { green, red } from "@mui/material/colors";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: "none",
  },
  root: {
    flexGrow: 1,
    maxWidth: "100%",
  },
  demo: {
    //backgroundColor: theme.palette.background.paper,
  },
  title: {
    //margin: theme.spacing(4, 0, 2),
  },
}));

export default function ListaBusesSeleccion({ data, campoFiltro, onSelect }) {
  const classes = useStyles();
  return campoFiltro ? (
    <div className={classes.root}>
      <Grid item xs={12} md={12}>
        <div className={classes.demo}>
          <List dense={false}>
            {data.map((bus, index) => {
              return (
                <ListItem divider key={index} onClick={() => onSelect(bus)}>
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
                      aria-label="seleccionar"
                      title="Seleccionar"
                      onClick={() => onSelect(bus)}
                      size="large"
                    >
                      <DoneAllIcon style={{ color: green[500] }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </div>
  ) : (
    <div className="col" style={{ textAlign: "center" }}>
      <p style={{ color: "#cccccc" }}>
        <i className="fa fa-search"></i>
        <strong> Escriba una PPU para iniciar búsqueda...</strong>
      </p>
    </div>
  );
}
