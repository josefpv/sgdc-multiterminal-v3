import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import CheckIcon from "@mui/icons-material/Check";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import BlockIcon from "@mui/icons-material/Block";
//Components
import ListaBusesSeleccion from "./../common/listaBusesSeleccion";
import ReplayIcon from "@mui/icons-material/Replay";
//redux
import { connect } from "react-redux";
import {
  setPuesto,
  setMarquesina,
  setCargadorOrigen,
  setSelectedChargerStatus,
  setSelectedPpu,
  changeChargerStatus,
  resetValuesChangeChargerStatus,
} from "./../../redux/actions/cambiaEstados";
import { showReserva } from "./../../redux/actions/asignador";
import { getAccessPage } from "./../../redux/actions";
import { fetchMarquesinas, makeReserva } from "./../../redux/actions/cargas";
import { makeDerivacion } from "./../../redux/actions/derivacion";
import { fetchBuses } from "./../../redux/actions/buses";
//redux form
import MyField from "./../common/input_redux";
import { Form } from "react-final-form";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Alert, Button, Chip, Divider, Typography } from "@mui/material";
import SeleccionDerivacion from "../common/SeleccionDerivacion";
import { scrollToBottom, scrollToMiddle } from "./../../utils/scrolling";

const CambiaEstadoDetalle = (props) => {
  const [ppu, setPpu] = useState("");
  const [soc, setSoc] = useState("");

  useEffect(() => {
    scrollToMiddle();
  }, [ppu]);

  useEffect(() => {
    if (props.selectedDerivacion > 1) {
      console.log("Se deriva");
    } else {
      console.log("No se deriva");
    }
  }, [props.selectedDerivacion]);

  useEffect(() => {
    let intervalo = 0;
    props.getAccessPage();
    setInitialValues();
    intervalo = setInterval(() => {
      props.fetchMarquesinas();
    }, 10000);
    return () => {
      props.resetValuesChangeChargerStatus(), clearInterval(intervalo);
    };
  }, []);
  const setInitialValues = async () => {
    const { cargadorOrigen, marquesina, puesto } = props.history.location.state;
    props.setPuesto(puesto);
    props.setMarquesina(marquesina);
    props.fetchMarquesinas();
    props.setCargadorOrigen(cargadorOrigen);
    props.fetchBuses();
  };

  const handleSelectedChargerStatus = (newStatus) => {
    props.setSelectedChargerStatus(newStatus);
    if (newStatus !== 2 && newStatus !== 4 && newStatus !== 6) {
      props.setSelectedPpu("");
      setPpu("");
    }
    scrollToBottom();
  };

  const getStatusIcon = () => {
    switch (props.puesto.estado) {
      case 1:
        return (
          <>
            <CheckIcon sx={{ color: "green", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "green" }}>
              Disponible
            </Typography>
          </>
        );
      case 2:
        return (
          <>
            <AccessTimeIcon sx={{ color: "#f0a91d", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "#f0a91d" }}>
              Reservado
            </Typography>
          </>
        );
      case 3:
        return (
          <>
            <ElectricalServicesIcon sx={{ color: "#152f8c", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "#152f8c" }}>
              Cargando
            </Typography>
          </>
        );
      case 4:
        return (
          <>
            <BusAlertIcon sx={{ color: "red", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "red" }}>
              Ocupado
            </Typography>
          </>
        );
      case 6:
        return (
          <>
            <BusAlertIcon sx={{ color: "#ba34eb", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "#ba34eb" }}>
              Operativo
            </Typography>
          </>
        );
      case 5:
        return (
          <>
            <BlockIcon sx={{ color: "#cccccc", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "#cccccc" }}>
              Inhabilitado
            </Typography>
          </>
        );
      default:
        return (
          <>
            <CheckIcon sx={{ color: "green", fontSize: 120 }} />
            <Typography component="div" variant="h2" sx={{ color: "green" }}>
              Disponible
            </Typography>
          </>
        );
    }
  };

  const filterBuses = () => {
    const searchQuery = ppu;
    if (searchQuery && searchQuery.length >= 4) {
      const { buses } = props.buses;
      let filtered = buses;

      if (searchQuery) {
        filtered = buses.filter((bus) =>
          bus.ppu.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }

      return filtered;
    }
    return [];
  };

  const doSubmit = () => {
    return null;
  };

  const handleSelectPatente = (bus) => {
    props.setSelectedPpu(bus);
    //handleChangeStatus();
  };

  const handleChangeStatus = async () => {
    const { busSelected } = props;
    //console.log("BUS SELECCIONADO: ", busSelected.ppu);
    const { userData } = props.auth;
    const { marquesina, puesto, selectedChargerStatus, cargadorOrigen } = props;

    if (props.selectedDerivacion > 1) {
      props.makeDerivacion(busSelected.ppu, props.selectedDerivacion);
    }

    await props.changeChargerStatus(
      marquesina.id,
      cargadorOrigen.id,
      puesto,
      selectedChargerStatus,
      busSelected,
      userData.id
    );

    /*
    if (selectedChargerStatus === 2 || selectedChargerStatus === 4) {
      const reservaData = {
        marquesina: marquesina.nombre,
        fila: puesto.fila,
        cargador: puesto.nombre,
        ppu: busSelected.ppu,
        soc: 0,
      };

      pantalla de turnos
      await props.showReserva(reservaData);
    }
    */
  };

  const {
    nombre: nombrePuesto,
    estado,
    enInspeccion,
    especial,
    fila,
    bus,
    soc: socCarga,
    connectorStatus,
  } = props.puesto;
  const { selectedChargerStatus, busSelected } = props;
  const { ppu: ppuSelected } = busSelected;

  return (
    <>
      <Grid2 container sx={{ p: 2 }}>
        <Grid2 xs={12} md={12} sx={{ marginBottom: 3 }}>
          <Typography component="div" variant="h3">
            {nombrePuesto}
            {bus && bus.ppu ? ` (${bus.ppu})` : null}
          </Typography>
          <Link style={{ textDecoration: "none" }} to="/cambiaestados">
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
            >
              Regresar a marquesinas
            </Button>
          </Link>
        </Grid2>
        <Grid2 xs={12} md={12}>
          <Divider>
            <Typography component="div" variant="h6">
              El cargador se encuentra actualmente como
            </Typography>
          </Divider>
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ textAlign: "center" }}>
          {getStatusIcon()}
        </Grid2>
        <Grid2 xs={12} md={12} sx={{ marginTop: 4 }}>
          <Divider>
            <Typography component="div" variant="h6">
              Seleccione estado al que desea cambiar la pistola{" "}
              {ppuSelected ? `(${ppuSelected})` : ""}
            </Typography>
          </Divider>
        </Grid2>

        <Grid2 xs={12} md={12}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={3}>
              <Button
                color="success"
                variant={selectedChargerStatus === 1 ? "contained" : "outlined"}
                onClick={() => handleSelectedChargerStatus(1)}
                style={{ marginRight: 4 }}
                startIcon={<CheckIcon />}
                fullWidth
                size="large"
              >
                Disponilble
              </Button>
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Button
                color="warning"
                variant={selectedChargerStatus === 2 ? "contained" : "outlined"}
                onClick={() => handleSelectedChargerStatus(2)}
                style={{ marginRight: 4 }}
                startIcon={<AccessTimeIcon />}
                fullWidth
                size="large"
              >
                Reservado
              </Button>
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Button
                color="secondary"
                variant={selectedChargerStatus === 4 ? "contained" : "outlined"}
                onClick={() => handleSelectedChargerStatus(4)}
                style={{ marginRight: 4 }}
                startIcon={<BusAlertIcon />}
                fullWidth
                size="large"
              >
                Ocupado
              </Button>
            </Grid2>
            <Grid2 xs={12} md={3}>
              <Button
                sx={{
                  color: "#ba34eb",
                  borderColor: "#ba34eb",
                  ":hover": {
                    borderColor: "#ba34eb",
                    backgroundColor: "rgba(81, 39, 217, 0.15)",
                  },
                }}
                variant={selectedChargerStatus === 6 ? "contained" : "outlined"}
                onClick={() => handleSelectedChargerStatus(6)}
                style={{ marginRight: 4 }}
                startIcon={<BusAlertIcon sx={{ color: "#ba34eb" }} />}
                fullWidth
                size="large"
              >
                Operativo
              </Button>
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Button
                color="secondary"
                variant={selectedChargerStatus === 5 ? "contained" : "outlined"}
                onClick={() => handleSelectedChargerStatus(5)}
                style={{ marginRight: 4 }}
                startIcon={<BlockIcon />}
                fullWidth
                size="large"
              >
                Deshabilitado
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 xs={12} md={12}>
          {!ppuSelected &&
          (selectedChargerStatus === 2 ||
            selectedChargerStatus === 4 ||
            selectedChargerStatus === 6) ? (
            <Grid2 container spacing={2} sx={{ paddingBottom: 18 }}>
              <Grid2 xs={12} md={12}>
                <Divider>Detalles de la reserva</Divider>
              </Grid2>
              <Grid2 xs={12} md={6}>
                <Form
                  onSubmit={doSubmit}
                  initialValues={{ ppu }}
                  render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{ paddingTop: 2, paddingBottom: 2 }}
                        >
                          Ingrese una PPU
                        </Typography>
                        <MyField
                          name="ppu"
                          component="input"
                          className="form-control"
                          type="text"
                          onChange={(val, prevVal) => setPpu(val)}
                          placeholder="Ingrese una patente..."
                        />
                      </div>
                    </form>
                  )}
                />
                <ListaBusesSeleccion
                  data={filterBuses()}
                  campoFiltro={ppu}
                  onSelect={handleSelectPatente}
                />
              </Grid2>
            </Grid2>
          ) : (
            <Grid2 xs={12} md={6}>
              <Typography
                component="div"
                variant="title"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                {ppuSelected ? `Bus a asignar: ${ppuSelected}` : null}
              </Typography>
            </Grid2>
          )}
          {ppuSelected &&
          (selectedChargerStatus === 2 ||
            selectedChargerStatus === 4 ||
            selectedChargerStatus === 6) ? (
            <Grid2 xs={12} md={6} sx={{ paddingBottom: 18 }}>
              <Grid2 container>
                <Grid2 xs={12} md={12}>
                  <Typography variant="caption" component="div">
                    Seleccione Derivación (opcional)
                  </Typography>
                </Grid2>
                <Grid2 xs={12} md={12}>
                  <SeleccionDerivacion color="secondary" />
                  <Alert severity="info">
                    Si desea solo hacer derivación o eliminar la derivación,
                    diríjase a semáforo y seleccione el bus que desea derivar o
                    desmarcar.
                  </Alert>
                </Grid2>
              </Grid2>
            </Grid2>
          ) : null}
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2
          xs={12}
          md={12}
          sx={{
            position: "fixed",
            bottom: 0,
            p: 2,
            bgcolor: "#ffffff",
            boxShadow: "0 -3px 20px #cccccc",
          }}
        >
          <Grid2 container spacing={3}>
            {props.selectedDerivacion > 1 && (
              <Grid2 xs={6} md={12}>
                <Alert severity="warning">
                  {`Se ha selecionado una derivación para el bus ${busSelected.ppu}, por
                  lo que al cambiar estado del puesto también se marcará el bus
                  con la derivación. Asegúrese de que todo esté correcto.`}
                </Alert>
              </Grid2>
            )}
            {selectedChargerStatus === 5 ||
              (selectedChargerStatus === 1 && (
                <Grid2 xs={6} md={12}>
                  <Alert severity="warning">
                    Cualquier reserva asociada a este puesto quedará anulada,
                    pero la derivación (si existiera) de un bus que esté
                    asociado a este puesto actualmente quedará vigente, si desea
                    anular la derivación diríjase a semáforo y busque el bus que
                    desea desmarcar.
                  </Alert>
                </Grid2>
              ))}
            <Grid2 xs={6} md={6}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleChangeStatus}
                startIcon={<CheckIcon />}
                disabled={selectedChargerStatus ? false : true}
                fullWidth
              >
                Cambiar Estado
              </Button>
            </Grid2>
            <Grid2 xs={6} md={6}>
              {ppuSelected &&
              (selectedChargerStatus === 2 || selectedChargerStatus === 4) ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 5 }}
                  onClick={() => handleSelectPatente("")}
                  fullWidth
                  startIcon={<ReplayIcon />}
                >
                  Asignar otro bus
                </Button>
              ) : null}
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.loading,
    auth: state.auth,
    marquesinas: state.cargas.marquesinas,
    marquesina: state.cambiaEstados.marquesina,
    puesto: state.cambiaEstados.puesto,
    cargadorOrigen: state.cambiaEstados.cargadorOrigen,
    selectedChargerStatus: state.cambiaEstados.selectedChargerStatus,
    buses: state.buses,
    busSelected: state.cambiaEstados.ppuSelected,
    selectedDerivacion: state.derivacion.selectedDerivacion,
  };
};

export default connect(mapStateToProps, {
  setPuesto,
  setMarquesina,
  setCargadorOrigen,
  setSelectedChargerStatus,
  fetchBuses,
  setSelectedPpu,
  changeChargerStatus,
  resetValuesChangeChargerStatus,
  fetchMarquesinas,
  getAccessPage,
  showReserva,
  makeDerivacion,
})(CambiaEstadoDetalle);
