import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import MuiInput from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ToggleButton from "@mui/material/ToggleButton";
import ErrorIcon from "@mui/icons-material/Error";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import EvStationIcon from "@mui/icons-material/EvStation";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const DetallePuestoAjuste = ({
  visible,
  data,
  showModal,
  onUpdateDataModal,
  onClose,
  onCommitChanges,
}) => {
  const { puesto, marquesina, cargadorOrigen } = data;

  const [value, setValue] = useState(25);

  const Input = styled(MuiInput)`
    width: 42px;
  `;

  const StyledToggleButtonGroup = styled(ToggleButton)(({ theme }) => ({
    "& .MuiToggleButton-standard": {
      border: 8,
      "&.Mui-disabled": {
        border: 8,
      },
    },
  }));

  const handleSliderChange = (event, newValue) => {
    //console.log(puesto);
    const puestoCopy = { ...puesto, tiempo: newValue };
    //console.log(puestoCopy);
    //onUpdateDataModal => puesto, marquesina, cargadorOrigen
    onUpdateDataModal(puestoCopy, marquesina, cargadorOrigen);
  };

  const handleInsepccionChange = () => {
    const newValue = !puesto.enInspeccion;
    const puestoCopy = { ...puesto, enInspeccion: newValue };
    onUpdateDataModal(puestoCopy, marquesina, cargadorOrigen);
  };

  const handleEspecialChange = () => {
    const newValue = !puesto.especial;
    const puestoCopy = { ...puesto, especial: newValue };
    onUpdateDataModal(puestoCopy, marquesina, cargadorOrigen);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else {
      setValue(25);
    }
  };

  return (
    <Grid2 container sx={{ p: 3 }} justifyContent="center">
      <Grid2 xs={12} md={12} sx={{ marginBottom: 4 }}>
        <Typography
          component="div"
          variant="h4"
        >{`Ajustes de Cargador: ${puesto.nombre}`}</Typography>
      </Grid2>
      <Grid2 xs={12} md={12}>
        <Typography component="div" variant="button">
          <AccessTimeIcon sx={{ fontSize: 40, color: "#d32f2f" }} /> Tiempo de
          tecle (segundos):
        </Typography>
      </Grid2>
      <Grid2 xs={10} md={10}>
        <Slider
          value={typeof puesto.tiempo === "number" ? puesto.tiempo : 0}
          onChange={handleSliderChange}
          aria-labelledby="tiempo-tecle"
          min={1}
          max={30}
          color="secondary"
        />
      </Grid2>
      <Grid2 xs={2} md={2} sx={{ paddingLeft: 4 }}>
        {/*
          <Input
            value={puesto.tiempo}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 25,
              type: "number",
              "aria-labelledby": "tiempo-tecle",
            }}
          />
        */}
        <Typography component="div" variant="h5">
          {`${puesto.tiempo}s`}
        </Typography>
      </Grid2>
      <Grid2 xs={12} md={12}>
        <Typography component="div" variant="button">
          <EvStationIcon sx={{ fontSize: 40, color: "#d32f2f" }} /> Condición
        </Typography>
      </Grid2>
      <Grid2 xs={12} md={12}>
        <ToggleButton
          value="check"
          selected={puesto.enInspeccion ? true : false}
          onChange={() => {
            handleInsepccionChange();
          }}
          color="secondary"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          <ErrorIcon />
          <Typography variant="button" display="block">
            En Inspección
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="check"
          color="secondary"
          selected={puesto.especial ? true : false}
          onChange={() => {
            handleEspecialChange();
          }}
          sx={{ width: "100%", marginBottom: 2 }}
        >
          <BeenhereIcon />
          <Typography variant="button" display="block">
            Especial
          </Typography>
        </ToggleButton>
      </Grid2>
      <Grid2 md={12} xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onCommitChanges()}
        >
          Guardar cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default DetallePuestoAjuste;
