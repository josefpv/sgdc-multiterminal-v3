import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SettingsRemoteRoundedIcon from "@mui/icons-material/SettingsRemoteRounded";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PanToolIcon from "@mui/icons-material/PanTool";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { handleReinicioForzado } from "./../../redux/actions/cargas";
import { connect } from "react-redux";

const MasDetallePuesto = ({ data, handleReinicioForzado }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onReinicioForzado = () => {
    const pistolaId = data.puesto.id;
    handleReinicioForzado(pistolaId);
    setOpen(false);
  };

  const energiaIngresada =
    data && data.puesto
      ? data.puesto.energy_active_import_register_actual -
        data.puesto.energy_active_import_register
      : 0;
  return (
    <Grid2 container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ADVERTENCIA</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El reinicio forzado permite pasar el cargador a su estado inicial
            (disponible) saltándose todas las restricciones, lo que pudiera
            ocasionar inconsistencia en los estados de las pistolas. Por favor,
            realice esta acción solo si es estrictamente necesario y si la
            pistola o sistema SGDC presenta fallas. ¿Está seguro de realizar el
            reinicio forzoso?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={onReinicioForzado} autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
      <Grid2 xs={6} md={4}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            <SettingsRemoteRoundedIcon />
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Soporte: ${data.puesto.dhemaxId}`}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={6} md={4}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            <BatteryChargingFullIcon />
          </Typography>
          <Typography component="div" variant="subtitle1">
            {data.puesto.bus.ppu ? `SOC: ${data.puesto.soc}` : "N/A"}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={6} md={4}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            <ElectricalServicesIcon />
          </Typography>
          <Typography component="div" variant="subtitle1">
            {data.puesto.energiaCarga
              ? `Potencia: ${data.puesto.energiaCarga} kW`
              : "Desconec."}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={6} md={4}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            <ElectricBoltIcon />
          </Typography>
          <Typography component="div" variant="subtitle1">
            {energiaIngresada
              ? `kWh: ${Math.round(energiaIngresada * 100) / 100} kWh`
              : "Desconec."}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={6} md={8}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            textAlign: "center",
          }}
        >
          <Typography component="div" variant="h6">
            <NotificationImportantIcon />
          </Typography>
          <Typography component="div" variant="subtitle1">
            {data.puesto.alertas && data.puesto.alertas.length
              ? `Hay alertas`
              : "Sin alertas"}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={12} md={12}>
        <Divider>
          <Chip label="Avanzado" color="secondary" />
        </Divider>
      </Grid2>
      <Grid2 xs={6} md={12}>
        <Button
          startIcon={<PanToolIcon />}
          color="secondary"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Reinicio Forzado
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default connect(null, { handleReinicioForzado })(MasDetallePuesto);
