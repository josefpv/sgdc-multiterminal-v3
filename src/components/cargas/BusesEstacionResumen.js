import React, { useEffect, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { fetchBusesResume } from "./../../redux/actions/cargas";
import LinearProgress from "@mui/material/LinearProgress";
import { format } from "date-fns";
import { toDate, zonedTimeToUtc } from "date-fns-tz";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "& .Cargando": { backgroundColor: "#1f4178", color: "#ffffff" },
    "& .Reservado": { backgroundColor: "#ffd633", color: "#000000" },
    "& .Ocupado": { backgroundColor: "#f20707", color: "#ffffff" },
    "& .Vacio": { backgroundColor: "#ffffff", color: "#000000" },
  },
});

const columns = [
  { field: "buses", headerName: "", width: 150 },
  { field: "reserva", headerName: "Reserva", width: 150 },
  { field: "cargando", headerName: "Cargando", width: 150 },
  { field: "ocupado", headerName: "Ocupado", width: 150 },
  { field: "total", headerName: "Total", width: 150 },
];

const columns2 = [
  { field: "patente", headerName: "PPU", width: 150 },
  { field: "estado", headerName: "Estado", width: 150 },
  { field: "cargador", headerName: "Cargador", width: 150 },
  { field: "eje", headerName: "Eje", width: 75 },
  { field: "fila", headerName: "Fila", width: 75 },
  {
    field: "fechaHoraReserva",
    headerName: "Reservado a las:",
    width: 150,
    valueFormatter: (params) => {
      var d = new Date(params.value);

      return params.value
        ? `${d.getDate()}/${
            d.getMonth() + 1
          }/${d.getFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}`
        : "--:--";
    },
  },
  {
    field: "fechaHoraInicio",
    headerName: "Iniciado a las:",
    width: 150,
    valueFormatter: (params) => {
      var d = new Date(params.value);
      return params.value
        ? `${d.getDate()}/${
            d.getMonth() + 1
          }/${d.getFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}`
        : "--:--";
    },
  },
];

const BusesEstacionResumen = ({ fetchBusesResume, busesResume }) => {
  const [isLoading, setLoading] = useState(false);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    fetchBusesResume();
    const intervaloId = setInterval(() => {
      fetchBusesResume();
    }, 10000);

    return () => {
      console.log("se limpio: ", intervaloId);
      clearInterval(intervaloId);
    };
  }, []);

  const classes = useStyles();

  return (
    <Grid2 container justifyContent="center">
      <Grid2 xs={12} md={12}>
        <Grid2 container justifyContent="center">
          {isLoading ? (
            <Grid2 xs={12} md={12}>
              <LinearProgress variant="indeterminate" color="error" />
            </Grid2>
          ) : null}
          <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              Resumen
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <DataGrid
              className={classes.root}
              autoHeight
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={
                busesResume && busesResume.resumen ? busesResume.resumen : []
              }
              columns={columns}
              getCellClassName={(params) => {
                if (params.field === "reserva") {
                  return "Reservado";
                } else if (params.field === "cargando") {
                  return "Cargando";
                } else if (params.field === "ocupado") {
                  return "Ocupado";
                }
              }}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 xs={12} md={12}>
        <Grid2 container justifyContent="center">
          <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
            <Typography component="div" variant="h4">
              Detalle
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={7}>
            <DataGrid
              className={classes.root}
              autoHeight
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={
                busesResume && busesResume.detalle ? busesResume.detalle : []
              }
              columns={columns2}
              getCellClassName={(params) => {
                if (params.field === "estado") {
                  return params.value;
                }
              }}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    busesResume: state.cargas.busesResume,
  };
};

export default connect(mapStateToProps, { fetchBusesResume })(
  BusesEstacionResumen
);
