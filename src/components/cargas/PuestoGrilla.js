import React, { Component } from "react";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { LinearProgress, Toolbar, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

const PuestoGrilla = ({
  estado,
  puesto,
  marquesina,
  connectorStatus,
  cargadorOrigen,
  estadoInterno,
  onClick,
  onDetienCargaOnAveria,
}) => {
  const estableceEstado = (estado) => {
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1) classes = { backgroundColor: "#32b343", height: "120px" };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2 || estado === 7)
      classes = { backgroundColor: "#f0c818", height: "120px" };
    //cargando (3) => azul
    if (estado === 3) classes = { backgroundColor: "#03428a", height: "120px" };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4) classes = { backgroundColor: "#cc1d02", height: "120px" };
    //deshabilitado (5) => naranjs
    if (estado === 5) classes = { backgroundColor: "#fc9235", height: "120px" };
    //(6) => operativo
    if (estado === 6) classes = { backgroundColor: "#ba34eb", height: "120px" };
    //(7) => a punto de reservar, estado interno temporal para semaforo
    if (estado === 8)
      classes = {
        backgroundColor: "#f0c818",
        borderWidth: 2,
        borderStyle: "dashed",
        height: "120px",
      };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0) classes = { backgroundColor: "#ebebeb", height: "120px" };

    return classes;
  };

  const handleOnClickPuesto = (puesto, marquesina, cargadorOrigen) => {
    //QUITAR COMENTARIOS!!!!!!!

    if (puesto && marquesina && cargadorOrigen)
      onClick(puesto, marquesina, cargadorOrigen);
  };

  const obtieneAlerta = () => {
    //console.log("Connector status: ", connectorStatus);

    //para evitar errores por puestos que nos puestos
    const cargadorId = cargadorOrigen ? cargadorOrigen.id : 0;

    if (connectorStatus != null) {
      if (cargadorOrigen && puesto) {
        const statusConnetorPuesto = connectorStatus.filter(
          (cs) =>
            cs.nombre === `STP_${cargadorOrigen.nombre}` &&
            cs.pistolaNro === puesto.nro
        );

        if (statusConnetorPuesto.length > 0) {
          /*
          console.log(
            `STP_${cargadorOrigen.nombre}`,
            statusConnetorPuesto[0].estado
          );
          console.log(`STP_${cargadorOrigen.nombre}`, puesto.estado);
          */
          if (
            statusConnetorPuesto[0].estado !== "cargando" &&
            puesto.estado === 3
          ) {
            //cambia a estado ocupado internamente porque connectorStatus es distinto a cargando
            onDetienCargaOnAveria(
              marquesina.id,
              cargadorId,
              puesto.id,
              puesto.bus.ppu
            );
            return true;
          }
        }
      }
    }

    return false;
  };

  const estiloTemporal = (estadoActual) => {
    if (estadoActual == 7) {
      return "#ffffff";
    }

    return "#ffffff";
  };

  const obtieneClaseMarcaInspeccion = (estado) => {
    console.log("ESTADO: ", estado);
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //cargando (3) => azul 042f61
    if (estado === 3)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //deshabilitado (5) => naranjs
    if (estado === 5)
      classes = {
        position: "absolute",
        top: -4,
        right: -2,
        height: 20,
        width: 20,
      };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0)
      classes = {
        backgroundColor: "#ebebeb",
        position: "absolute",
        top: -2,
        right: -2,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderColor: "#ebebeb",
        borderWidth: 2,
        borderStyle: "solid",
      };

    return classes;
  };

  const obtieneClaseMarcaEspecial = (estado) => {
    let classes = {};
    //disponilbe (1) => verde
    if (estado === 1)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //camino a estacionar "reservado" (2) => amarillo
    if (estado === 2)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //cargando (3) => azul 042f61
    if (estado === 3)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //ocuapdo pero con carga finalizada (4)=> rojo
    if (estado === 4)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //deshabilitado (5) => naranjs
    if (estado === 5)
      classes = {
        position: "absolute",
        top: -5,
        right: -1,
        height: 20,
        width: 20,
      };
    //ocupado sin conectar
    //???????????
    //no existe (0)=> gris
    if (estado === 0)
      classes = {
        backgroundColor: "#ebebeb",
        position: "absolute",
        top: -2,
        right: -2,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderColor: "#ebebeb",
        borderWidth: 2,
        borderStyle: "solid",
      };

    return classes;
  };

  const estiloPuesto =
    (puesto.alertas && puesto.alertas.length > 0) ||
    (puesto.soc >= 99 && puesto.estado > 2)
      ? "puestoGrilla blink"
      : puesto.estado != 8
      ? "puestoGrilla"
      : "puestoGrilla pop-outin";
  return (
    <Grid2
      container
      spacing={0}
      xs
      className={estiloPuesto}
      sx={{ ...estableceEstado(estado), overflow: "hidden" }}
      alignItems="flex-start"
      onClick={() => handleOnClickPuesto(puesto, marquesina, cargadorOrigen)}
    >
      {puesto.estado === 7 ? (
        <Grid2 xs={12}>
          <LinearProgress color="secondary" />
        </Grid2>
      ) : null}
      <Grid2 xs={10} sx={{ color: "#ffffff", textAlign: "center", height: 30 }}>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{
            textAlign: "center",
            color: estiloTemporal(puesto.estado),
          }}
        >
          {puesto.nombre ? puesto.nombre : null}
        </Typography>
      </Grid2>
      <Grid2 xs={2} sx={{ color: "#ffffff", textAlign: "center", height: 30 }}>
        {puesto.enInspeccion && !puesto.especial ? (
          <Tooltip title="En inspección">
            <ErrorIcon
              sx={{
                color: estiloTemporal(puesto.estado),
                verticalAlign: "top",
                fontSize: 16,
              }}
            />
          </Tooltip>
        ) : null}

        {puesto.especial ? (
          <Tooltip title="Puesto especial">
            <BeenhereIcon
              fontSize="small"
              sx={{
                color: estiloTemporal(puesto.estado),
                verticalAlign: "top",
                fontSize: 16,
              }}
            />
          </Tooltip>
        ) : null}
      </Grid2>
      {puesto.nombre && puesto.estado > 1 && puesto.bus.ppu ? (
        <Tooltip title="Bus en puesto de carga">
          <Grid2
            xs={12}
            sx={{
              color: estiloTemporal(puesto.estado),
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{
                fontSize: isMobile ? "0.5rem" : "0.8rem",
                color: estiloTemporal(puesto.estado),
              }}
            >
              {puesto.bus.ppu}
            </Typography>
          </Grid2>
        </Tooltip>
      ) : null}
      {puesto.alertas && puesto.alertas.length > 0 ? (
        <Grid2
          xs={6}
          sx={{
            fontSize: "0.9vw",
            color: estiloTemporal(puesto.estado),
            textAlign: "center",
          }}
        >
          <Tooltip title="Este cargador tiene alertas.">
            <ReportProblemIcon
              fontSize="small"
              sx={{
                color: estiloTemporal(puesto.estado),
                verticalAlign: "top",
                fontSize: 16,
              }}
            />
          </Tooltip>
        </Grid2>
      ) : null}
      {obtieneAlerta() ? (
        <Grid2
          xs={6}
          sx={{
            fontSize: "0.9vw",
            color: estiloTemporal(puesto.estado),
            textAlign: "center",
          }}
        >
          <Tooltip title="Revisar estado del cargador">
            <ReportProblemIcon
              fontSize="small"
              sx={{
                color: estiloTemporal(puesto.estado),
                verticalAlign: "top",
                fontSize: 16,
              }}
            />
          </Tooltip>
        </Grid2>
      ) : null}
      {puesto.soc >= 1 && puesto.estado == 3 ? (
        <Tooltip title="SOC actual">
          <Grid2
            xs={6}
            sx={{
              fontSize: "0.9vw",
              color: estiloTemporal(puesto.estado),
              textAlign: "center",
            }}
          >
            <Typography
              component="div"
              variant="caption"
              sx={{
                fontSize: isMobile ? "0.5rem" : "0.8rem",
                color: estiloTemporal(puesto.estado),
              }}
            >
              {`${parseInt(puesto.soc, 10)}%`}
            </Typography>
          </Grid2>
        </Tooltip>
      ) : (
        <Grid2
          xs={6}
          sx={{
            fontSize: "0.9vw",
            color: estiloTemporal(puesto.estado),
            textAlign: "center",
          }}
        ></Grid2>
      )}
      {puesto.temperatura && puesto.temperatura > 20 ? (
        <Tooltip title="Temperatura del cargador">
          <Grid2
            xs={6}
            sx={{
              fontSize: "0.9vw",
              color: estiloTemporal(puesto.estado),
              textAlign: "center",
            }}
          >
            <Typography
              component="div"
              variant="caption"
              sx={{
                fontSize: isMobile ? "0.5rem" : "0.8rem",
                color: estiloTemporal(puesto.estado),
              }}
            >
              {`${Math.round(puesto.temperatura)}°`}
            </Typography>
          </Grid2>
        </Tooltip>
      ) : null}
      {(puesto.estado === 3 || puesto.estado === 4 || puesto.estado === 6) &&
      puesto.tiempoCarga &&
      puesto.tiempoCarga !== "" ? (
        <Tooltip title="Tiempo transcurrido del cargador en estado actual">
          <Grid2
            xs={12}
            sx={{
              fontSize: "0.9vw",
              color: estiloTemporal(puesto.estado),
              textAlign: "center",
            }}
          >
            <Typography
              component="div"
              variant="caption"
              sx={{
                fontSize: isMobile ? "0.5rem" : "0.8rem",
                color: estiloTemporal(puesto.estado),
              }}
            >
              {`${puesto.tiempoCarga}`}
            </Typography>
          </Grid2>
        </Tooltip>
      ) : null}
    </Grid2>
  );
};

export default PuestoGrilla;
