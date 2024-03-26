import React, { useEffect, useState } from "react";
import _, { min } from "lodash";
import { toast } from "react-toastify";

import Headroom from "react-headroom";

//redux
import { connect } from "react-redux";
import { getAccessPage } from "./../../redux/actions";
import { changeChargerStatus } from "./../../redux/actions/cambiaEstados";
import { isAppLocked } from "./../../redux/actions/global";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  setDataModal,
  unsetDataModal,
  updateModalData,
  toggleBtnModal,
  getStatusConnetor,
  getStatusConnectorAll,
  stopChargeInternally,
  stopChargerOnFailure,
  stopPendingChargings,
  setChargerFree,
  handleInspectCharger,
  handleSync,
} from "./../../redux/actions/cargas";
import {
  fetchMarquesinas,
  fetchInnerStateChargers,
  makeReserva,
} from "./../../redux/actions/cargas";
import { makeDerivacion } from "../../redux/actions/derivacion";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Marquesina from "./Marquesina";
import Leyenda from "./Leyenda";
import {
  FormControl,
  MenuItem,
  InputLabel,
  FormLabel,
  FormControlLabel,
  Radio,
  Select,
  RadioGroup,
  Typography,
  Button,
  Input,
  TextField,
  Alert,
} from "@mui/material";
import SeleccionDerivacion from "../common/SeleccionDerivacion";
import history from "../../history";
import ModalDialog from "../common/ModalDialog";
import SignpostIcon from "@mui/icons-material/Signpost";

const Reservas = ({
  match,
  location,
  auth,
  isAppLocked,
  marquesinas,
  modalData,
  isBtnAppLocked,
  fetchMarquesinas,
  getStatusConnectorAll,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  stopChargerOnFailure,
  updateModalData,
  makeReserva,
  makeDerivacion,
  selectedDerivacion,
  derivacionList,
}) => {
  const [selectedPuesto, setSelectedPuesto] = useState(null);
  const [accionFinal, setAccionFinal] = useState(0);
  const [textoAccionFinal, setTextoAccionFinal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [socInicial, setSocInicial] = useState(0);

  useEffect(() => {
    getAccessPage();
    let intervalId = 0;
    fetchMarquesinas();
    isAppLocked();

    intervalId = setInterval(() => {
      //fetchMarquesinas();
      isAppLocked();
    }, 10000);
    setIntervalFetchMarquesinas();

    return () => {
      clearInterval(intervalId);
      unsetIntervalFetchMarquesinas();
      setSelectedPuesto(null);
    };
  }, []);

  useEffect(() => {
    if (isBtnAppLocked) {
      toast.info(
        "La función de carga se ha deshabilitado debido al bloque de horario actual."
      );
    }
  }, [isBtnAppLocked]);

  useEffect(() => {
    const parsedSoc = parseInt(socInicial);
    if (!isNaN(parsedSoc) && parsedSoc > 100) {
      setSocInicial(100);
    } else if (!isNaN(parsedSoc) && parsedSoc < 0) {
      setSocInicial(0);
    } else if (isNaN(parsedSoc)) {
      setSocInicial(0);
    }
  }, [socInicial]);

  useEffect(() => {
    switch (accionFinal) {
      case 1:
        setTextoAccionFinal("derivar");
        break;
      case 2:
        setTextoAccionFinal("derivar y reservar");
        break;
      case 3:
        setTextoAccionFinal("reservar");
        break;
      default:
        setTextoAccionFinal("");
        break;
    }
  }, [accionFinal]);

  useEffect(() => {
    if (selectedDerivacion > 1 && !selectedPuesto) {
      setAccionFinal(1);
    } else if (selectedDerivacion > 1 && selectedPuesto) {
      setAccionFinal(2);
    } else if (selectedPuesto && selectedDerivacion == 1) {
      setAccionFinal(3);
    } else {
      setAccionFinal(0);
    }
  }, [selectedPuesto, selectedDerivacion]);

  //actualiza data de modal si esta abierto

  const handleReserva = async (puesto, marquesina, cargadorOrigen) => {
    const { ppu, soc: socBus } = match.params;
    const { enEstudio } = location.state;
    const soc = socBus ? socBus : "--";
    //1 => especual - 0 => normal
    const { especial: puestoEspecial } = puesto;

    //si esta en estudio el bus y el puesto no es epecial
    if (enEstudio && !puestoEspecial) {
      toast.error(
        `El bus ${ppu} está bajo estudio especial por lo que solo puede ingresar (reservar) en puestos marcados como 'especial', por favor seleccione otro cargador.`
      );
      return;
    }
    //si no esta en estudio el bus y el puesto es epecial
    if (!enEstudio && puestoEspecial) {
      toast.error(
        `El cargador que intenta reservar está solo disponible para buses bajo estudio especial. ${ppu} no se encuentra bajo estudio especial, por favor seleccione un cargador común.`
      );
      return;
    }

    //se esta haciendo clic sobre el mismo puesto por lo que se deselecciona
    if (selectedPuesto && verificaMismaPistola(puesto)) {
      console.log("Mismo puesto");
      eliminaMarcaTermporalReserva();
      setSelectedPuesto(null);
      return;
    } else {
      //console.log("No es el mismo puesto");
    }

    if (puesto.estado !== 1)
      return toast.error("No puede reservar puestos que no esten disponibles.");

    selectedPuesto && eliminaMarcaTermporalReserva();

    const marquesinasCopia = [...marquesinas];
    const index = marquesinasCopia.indexOf(marquesina);
    //indice de cargador en marquesinas states
    const indexCargador =
      marquesinasCopia[index].cargadores.indexOf(cargadorOrigen);
    //obtengo pistola de la pistola
    const pistola = [
      ...marquesinas[index].cargadores[indexCargador].pistolas.filter(
        (p) => p.id === puesto.id
      ),
    ];

    //indice de pistola
    const indexPistola = marquesinas[index].cargadores[
      indexCargador
    ].pistolas.indexOf(pistola[0]);

    puesto.estado = 8;
    puesto.bus = {
      ppu: ppu,
    };
    marquesinas[index].cargadores[indexCargador].pistolas[indexPistola] = {
      ...puesto,
    };

    //this.setState({ marquesinas });

    //function que llama a la api
    /*     const marquesinaId = marquesina.id;
    const cargadorId = marquesinas[index].cargadores[indexCargador].id;
    const pistolaId = puesto.id;
    const usuarioId = auth.userData.id; */

    //makeReserva(marquesinaId, cargadorId, pistolaId, ppu, usuarioId);

    const reservaData = {
      indexMarquesina: index,
      indexCargador,
      indexPistola,
      marquesina: marquesina.nombre,
      fila: puesto.fila,
      cargador: puesto.nombre,
      ppu: ppu,
      soc: soc,
    };

    setSelectedPuesto(reservaData);

    //showReserva(reservaData);
  };

  const verificaMismaPistola = (puesto) => {
    const { indexMarquesina, indexCargador, indexPistola } = selectedPuesto;

    const pistolaCopia =
      marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
        indexPistola
      ];

    if (pistolaCopia.id == puesto.id) {
      return true;
    }

    return false;
  };

  //elimina marca temporal de la reserva
  const eliminaMarcaTermporalReserva = () => {
    const { indexMarquesina, indexCargador, indexPistola } = selectedPuesto;

    const pistolaCopia =
      marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
        indexPistola
      ];
    pistolaCopia.bus.ppu = "";
    pistolaCopia.estado = 1;

    marquesinas[indexMarquesina].cargadores[indexCargador].pistolas[
      indexPistola
    ] = {
      ...pistolaCopia,
    };
  };

  //detiene cargas ante averia
  const handleDetienCargaOnAveria = (
    marquesinaId,
    cargadorId,
    puestoId,
    ppu
  ) => {
    /* console.log("Se detuvo una carga por averia", puestoId, ppu);
    stopChargerOnFailure(marquesinaId, cargadorId, puestoId, ppu); */
    return;
  };

  //contador de cargadores
  const setCounter = () => {
    let pistolasTodas = [];
    marquesinas.map((marquesina) =>
      marquesina.cargadores.map((cargadores) =>
        cargadores.pistolas.map((pistolas) => {
          pistolasTodas = [...pistolasTodas, pistolas];
        })
      )
    );

    const countDisponibles = pistolasTodas.filter(
      (pistola) => pistola.estado === 1
    ).length;
    const countReservados = pistolasTodas.filter(
      (pistola) => pistola.estado === 2
    ).length;
    const countCargando = pistolasTodas.filter(
      (pistola) => pistola.estado === 3
    ).length;
    const countOcupados = pistolasTodas.filter(
      (pistola) => pistola.estado === 4
    ).length;
    const countInhabilitados = pistolasTodas.filter(
      (pistola) => pistola.estado === 5
    ).length;

    console.log("COUNTER: ", {
      countDisponibles,
      countReservados,
      countCargando,
      countOcupados,
      countInhabilitados,
    });
    return {
      countDisponibles,
      countReservados,
      countCargando,
      countOcupados,
      countInhabilitados,
    };
  };

  const handleClickConfirmation = () => {
    const { ppu, soc: socBus } = match.params;

    if (selectedPuesto && selectedDerivacion > 1) {
      //

      const marquesinaId = marquesinas[selectedPuesto.indexMarquesina].id;
      const cargadorId =
        marquesinas[selectedPuesto.indexMarquesina].cargadores[
          selectedPuesto.indexCargador
        ].id;
      const pistolaId =
        marquesinas[selectedPuesto.indexMarquesina].cargadores[
          selectedPuesto.indexCargador
        ].pistolas[selectedPuesto.indexPistola].id;
      const usuarioId = auth.userData.id;

      const { cargador, marquesina } = selectedPuesto;

      /*       const confirmReserva = confirm(
        `¿Desea reservar puesto ${cargador} en marquesina ${marquesina} para la ${ppu} y derivar el bus?`
      );
      if (!confirmReserva) return; */
      console.log("Se reserva puesto y se deriva");
      makeReserva(
        marquesinaId,
        cargadorId,
        pistolaId,
        ppu,
        usuarioId,
        socInicial
      );
      makeDerivacion(ppu, selectedDerivacion);
      history.push({ pathname: "/seleccion/", state: { ppu } });
      //
    } else if (selectedDerivacion > 1) {
      //
      console.log("Se deriva unicamente");
      /* const confirmReserva = confirm(`¿Desea derivar el bus ${ppu}?`);
      if (!confirmReserva) return; */
      makeDerivacion(ppu, selectedDerivacion);
      history.push({ pathname: "/seleccion/" });
      //
    } else if (selectedPuesto) {
      //
      const marquesinaId = marquesinas[selectedPuesto.indexMarquesina].id;
      const cargadorId =
        marquesinas[selectedPuesto.indexMarquesina].cargadores[
          selectedPuesto.indexCargador
        ].id;
      const pistolaId =
        marquesinas[selectedPuesto.indexMarquesina].cargadores[
          selectedPuesto.indexCargador
        ].pistolas[selectedPuesto.indexPistola].id;
      const usuarioId = auth.userData.id;

      const { cargador, marquesina } = selectedPuesto;

      /* const confirmReserva = confirm(
        `¿Desea reservar puesto ${cargador} en marquesina ${marquesina} para la ${ppu}?`
      );
      if (!confirmReserva) return; */
      //console.log("Se reserva unicamente");
      makeReserva(
        marquesinaId,
        cargadorId,
        pistolaId,
        ppu,
        usuarioId,
        socInicial
      );
      //revierte estado de la pistola seleccionada
      const copiaPistola = {
        ...marquesinas[selectedPuesto.indexMarquesina].cargadores[
          selectedPuesto.indexCargador
        ].pistolas[selectedPuesto.indexPistola],
      };
      copiaPistola.estado = 2;
      marquesinas[selectedPuesto.indexMarquesina].cargadores[
        selectedPuesto.indexCargador
      ].pistolas[selectedPuesto.indexPistola] = copiaPistola;
      history.push({ pathname: "/seleccion/", state: { ppu } });
      //
    } else {
      toast.error(
        "Debe al menos seleccionar un puesto para reservar o marcar una derivación."
      );
      return;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleChangeSocInicial = (e) => {
    setSocInicial(e.target.value);
  };

  return (
    <>
      <Headroom>
        <Leyenda data={setCounter()} />
      </Headroom>
      <Grid2 container>
        <ModalDialog
          open={openModal}
          title="Confirmar Acción"
          content={`¿Desea ${textoAccionFinal} el bus ${match.params.ppu}?`}
          onClose={handleCloseModal}
          onConfirm={handleClickConfirmation}
          onCancel={handleCancelModal}
          icon={<SignpostIcon sx={{ fontSize: 60 }} color="secondary" />}
        />
        <Grid2 md={12} sx={{ p: 2, paddingBottom: 16 }}>
          {marquesinas.map((marquesina, index) => (
            <Marquesina
              key={index}
              marquesina={marquesina}
              indexMarquesina={index}
              onClick={handleReserva}
              onDetienCargaOnAveria={handleDetienCargaOnAveria}
            />
          ))}
        </Grid2>

        <Grid2
          md={12}
          className="reservaInfo"
          sx={{
            position: "fixed",
            bottom: 0,
            padding: 2,
          }}
        >
          <Grid2 container>
            <Grid2 md={9} xs={12} alignContent="center" justifyContent="center">
              <Grid2 md={12}>
                <Typography component="div" variant="caption">
                  Reserva y Derivación
                </Typography>
              </Grid2>
              <Grid2 md={12}>
                <Grid2 container>
                  <Grid2 md={2}>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ pt: 1, fontWeight: "bold" }}
                    >
                      {match.params.ppu && match.params.ppu}
                    </Typography>

                    {/*  <Grid2 container>
                      <Grid2 md={4}>
                        <Typography
                          component="div"
                          variant="caption"
                          sx={{ fontSize: 10 }}
                        >
                          <WbCloudyIcon sx={{ fontSize: 10 }} /> Mañana
                        </Typography>
                      </Grid2>
                      <Grid2 md={4}>
                        <Typography
                          component="div"
                          variant="caption"
                          sx={{ fontSize: 10 }}
                        >
                          <LightModeIcon sx={{ fontSize: 10 }} /> Tarde
                        </Typography>
                      </Grid2>
                      <Grid2 md={4}>
                        <Typography
                          component="div"
                          variant="caption"
                          sx={{ fontSize: 10 }}
                        >
                          <NightsStayIcon sx={{ fontSize: 10 }} /> Noche
                        </Typography>
                      </Grid2>
        </Grid2>*/}
                  </Grid2>
                  <Grid2 md={1} sx={{ paddingLeft: 2, textAlign: "center" }}>
                    <Typography component="div" variant="h4">
                      <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
                    </Typography>
                  </Grid2>
                  <Grid2 md={2} sx={{ paddingLeft: 2, textAlign: "center" }}>
                    <SeleccionDerivacion />
                  </Grid2>
                  <Grid2 md={1} sx={{ paddingLeft: 2, textAlign: "center" }}>
                    <Typography component="div" variant="h4">
                      <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
                    </Typography>
                  </Grid2>
                  <Grid2
                    md={2}
                    sx={{ paddingLeft: 2, textAlign: "center", pt: 1 }}
                  >
                    <TextField
                      label="SOC"
                      type="number"
                      color="primary"
                      InputProps={{
                        inputProps: { min: 0, max: 100 },
                      }}
                      helperText="% SOC Inicial"
                      fullWidth
                      value={socInicial}
                      onChange={handleChangeSocInicial}
                    />
                  </Grid2>
                  <Grid2 md={1} sx={{ paddingLeft: 2, textAlign: "center" }}>
                    <Typography component="div" variant="h4">
                      <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
                    </Typography>
                  </Grid2>
                  <Grid2
                    md={3}
                    sx={{
                      paddingLeft: 2,
                      textAlign: "center",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <Typography
                      component="div"
                      variant="caption"
                      sx={{ fontSize: "1rem" }}
                    >
                      Cargador Seleccionado
                    </Typography>
                    <Typography
                      component="div"
                      variant="h4"
                      sx={{ fontWeight: "bold" }}
                    >
                      {selectedPuesto ? selectedPuesto.cargador : "--"}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 md={3} xs={12}>
              <Grid2
                container
                alignContent="center"
                sx={{
                  borderLeftStyle: "solid",
                  borderLeftWidth: 1,
                  borderLeftColor: "#000000",
                  pl: 2,
                  height: "100%",
                }}
              >
                {accionFinal > 0 ? (
                  <>
                    <Grid2 md={12}>
                      <Typography
                        component="div"
                        variant="caption"
                        sx={{ fontSize: "1rem" }}
                      >
                        Confirmación
                      </Typography>
                    </Grid2>
                    <Grid2 md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOpenModal}
                      >
                        {textoAccionFinal}
                      </Button>
                    </Grid2>
                  </>
                ) : (
                  <Grid2 md={12}>
                    <Alert severity="error">
                      Para continuar, realice alguna de las siguientes acciones
                      (o ambas): para reservar haga clic sobre un puesto. Para
                      derivar el bus seleccione opción desde la lista.
                    </Alert>
                  </Grid2>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isBtnAppLocked: state.global.isAppLocked,
    isLoading: state.global.loading,
    auth: state.auth,
    intervalId: state.cargas.intervalId,
    marquesinas: state.cargas.marquesinas,
    modalData: state.cargas.modalData,
    statusConnector: state.cargas.statusConnector,
    statusConnectorAll: state.cargas.statusConnectorAll,
    cargadoresEstadoInterno: state.cargas.cargadoresEstadoInterno,
    derivacionList: state.derivacion.derivacionList,
    selectedDerivacion: state.derivacion.selectedDerivacion,
  };
};

export default connect(mapStateToProps, {
  isAppLocked,
  fetchMarquesinas,
  getStatusConnectorAll,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  setDataModal,
  unsetDataModal,
  toggleBtnModal,
  setChargerFree,
  stopChargeInternally,
  getStatusConnetor,
  handleSync,
  handleInspectCharger,
  changeChargerStatus,
  stopChargerOnFailure,
  updateModalData,
  makeReserva,
  makeDerivacion,
})(Reservas);
