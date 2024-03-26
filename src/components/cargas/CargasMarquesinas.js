import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Divider, Drawer } from "@mui/material";
import Loading from "../common/Loading";
import DetallePuesto from "./DetallePuesto";
import _ from "lodash";
import { toast } from "react-toastify";
import Headroom from "react-headroom";
import config from "./../../config.json";
//sound
import notificationSound from "./../../sounds/to-the-point.mp3";

//redux
import { connect } from "react-redux";
import { getAccessPage } from "./../../redux/actions";
import { fetchBuses } from "../../redux/actions/buses";
import { changeChargerStatus } from "./../../redux/actions/cambiaEstados";
import {
  isAppLocked,
  setLoading,
  setUnloading,
} from "./../../redux/actions/global";
import {
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchMarquesinas,
  setDataModal,
  unsetDataModal,
  updateModalData,
  toggleBtnModal,
  getStatusConnetor,
  getStatusConnectorAll,
  fetchInnerStateChargers,
  handleAllTecles,
  stopChargeInternally,
  stopChargerOnFailure,
  stopPendingChargings,
  setChargerFree,
  setChargerOperativo,
  handleInspectCharger,
  handleSync,
  reservaNuevamente,
} from "./../../redux/actions/cargas";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Marquesina from "./Marquesina";
import Leyenda from "./Leyenda";

const CargasMarquesinas = ({
  isLoading,
  auth,
  isAppLocked,
  marquesinas,
  modalData,
  isBtnAppLocked,
  fetchMarquesinas,
  getStatusConnectorAll,
  setDataModal,
  unsetDataModal,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  toggleBtnModal,
  setChargerFree,
  setChargerOperativo,
  stopChargeInternally,
  getStatusConnetor,
  handleSync,
  handleInspectCharger,
  reservaNuevamente,
  changeChargerStatus,
  stopChargerOnFailure,
  updateModalData,
  setUnloading,
  setLoading,
  fetchBuses,
}) => {
  const [audio, setAudio] = useState(null);
  const [playingNotification, setPlayingNotification] = useState(false);
  const [actualizaModal, setActualizaModal] = useState(false);
  const [intervaloACtualizacionModal, setIntervaloACtualizacionModal] =
    useState(0);

  useEffect(() => {
    let intervalId = 0;
    obtieneMarquesinas();
    isAppLocked();
    fetchBuses();
    intervalId = setInterval(() => {
      obtieneMarquesinas();
      isAppLocked();
    }, 5000);

    setIntervalFetchMarquesinas(intervalId);
    fetchInnerStateChargers();

    const audio_ = new Audio(notificationSound);
    audio_.load();
    audio_.addEventListener("canplaythrough", () => {
      console.log("Notificaction audio loaded.");
      setAudio(audio_);
    });

    return () => {
      console.log("se elimino intervalo de marquesinas");
      clearInterval(intervalId);
      unsetIntervalFetchMarquesinas(intervalId);
    };
  }, []);

  useLayoutEffect(() => {
    if (auth.userData) {
      const { terminalId } = auth.userData;
      const token = window.localStorage.getItem("token");
      const eventCargas = new EventSource(
        `${config.endPoints.sse}/events/${token}`
      );

      eventCargas.onmessage = (event) => {
        const notificacion = JSON.parse(event.data);
        if (
          Object.keys(notificacion).length > 0 &&
          notificacion.terminalId === terminalId
        ) {
          setPlayingNotification(true);
          toast.info(notificacion.msg);
        }
      };

      return () => {
        eventCargas.close();
      };
    }
  }, [auth, auth.userData]);

  useEffect(() => {
    if (isBtnAppLocked) {
      toast.info(
        "La función de carga se ha deshabilitado debido al bloque de horario actual."
      );
    }
  }, [isBtnAppLocked]);

  useEffect(async () => {
    if (audio) {
      playingNotification ? audio.play() : audio.pause();
    }

    setTimeout(() => {
      setPlayingNotification(false);
    }, 5000);
  }, [playingNotification]);

  //actualiza data de modal si esta abierto
  useEffect(() => {
    if (actualizaModal) {
      let intervaloACtualizacionModal = setInterval(() => {
        modalData.data.hasOwnProperty("puesto") && updateModalData();
      }, 10000);
      setIntervaloACtualizacionModal(intervaloACtualizacionModal);
    } else {
      fetchBuses();
      console.info("Se detuvo la actualizacion de la modal");
      clearInterval(intervaloACtualizacionModal);
    }

    return () => {
      clearInterval(intervaloACtualizacionModal);
    };
  }, [actualizaModal]);

  const obtieneMarquesinas = async () => {
    await fetchMarquesinas();
    setUnloading();
  };

  //establece detalles en drawer
  const handleDetalle = async (puesto, marquesina, cargadorOrigen) => {
    setActualizaModal(true);
    setDataModal(puesto, marquesina, cargadorOrigen);
  };

  //cierra y limpia drawer
  const handleClose = () => {
    setActualizaModal(false);
    unsetDataModal();
  };

  //acciona pistola
  const handlePistola = (dataModal, estado) => {
    toggleBtnModal();
    handleTecle(dataModal, estado);
  };

  //libera puesto
  const handleLiberaPuesto = (dataModal) => {
    setChargerFree(dataModal);
  };

  //coloca puesto a ocupado
  const handleSetPuestoOperativo = (dataModal, errorId, socket) => {
    setChargerOperativo(dataModal, errorId, socket);
  };

  //detenciones de cargas internamente
  const handleDetieneCargaInterna = (dataModal) => {
    stopChargeInternally(dataModal);
  };

  //obtencion de conector status
  const obtieneConnectorStatus = (data) => {
    return getStatusConnetor(data);
  };

  //sincroniza cargador
  const handleSyncCargador = (
    cargadorId,
    marquesinaId,
    puestoId,
    puestoNombre
  ) => {
    handleSync(cargadorId, marquesinaId, puestoId, puestoNombre);
    setActualizaModal(false);
  };

  //establece inspeccion en puesto
  const handleInspeccionaPuesto = (
    dataModal,
    puestoId,
    puestoNombre,
    enInspeccion
  ) => {
    handleInspectCharger(dataModal, puestoId, puestoNombre, enInspeccion);
  };

  //reserva nuevamente
  const handleReservaNuevamente = (dataModal, errorId, socket) => {
    reservaNuevamente(dataModal, errorId, socket);
    handleClose();
  };

  //detiene cargas ante averia
  const handleDetienCargaOnAveria = (
    marquesinaId,
    cargadorId,
    puestoId,
    ppu
  ) => {
    console.log("Se detuvo una carga por averia", puestoId, ppu);
    stopChargerOnFailure(marquesinaId, cargadorId, puestoId, ppu);
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
    const countOperativo = pistolasTodas.filter(
      (pistola) => pistola.estado === 6
    ).length;
    return {
      countDisponibles,
      countReservados,
      countCargando,
      countOcupados,
      countInhabilitados,
      countOperativo,
    };
  };

  return isLoading ? (
    <Loading label="Cargando Marquesinas..." />
  ) : (
    <>
      <Headroom>
        <Leyenda data={setCounter()} />
      </Headroom>
      <Grid2 container>
        <Drawer
          anchor="bottom"
          open={modalData && modalData.showModal}
          onClose={() => console.info("Cerrando modal")}
        >
          {modalData && modalData.showModal && (
            <DetallePuesto
              origen="cargas"
              onAccionaPistola={handlePistola}
              onLiberaPuesto={handleLiberaPuesto}
              onSetPuestoOperativo={handleSetPuestoOperativo}
              onDetencionInterna={handleDetieneCargaInterna}
              onConnectorStatus={obtieneConnectorStatus}
              onSync={handleSyncCargador}
              onInspeccionaPuesto={handleInspeccionaPuesto}
              toggleIniciaCargaBoton={isBtnAppLocked}
              onReservaNuevamente={handleReservaNuevamente}
              topButtons={true}
            >
              <Button color="secondary" onClick={handleClose} fullWidth>
                cerrar
              </Button>
            </DetallePuesto>
          )}
        </Drawer>
        <Grid2 md={12} xs={12}>
          {marquesinas.map((marquesina, index) => (
            <React.Fragment key={index}>
              <Marquesina
                marquesina={marquesina}
                indexMarquesina={index}
                onClick={handleDetalle}
                onDetienCargaOnAveria={handleDetienCargaOnAveria}
                opcionesVisible={true}
              />
              {index === 1 && auth.userData.terminal.id === 2 && (
                <Divider sx={{ borderWidth: 60 }} />
              )}
            </React.Fragment>
          ))}
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
  };
};

export default connect(mapStateToProps, {
  isAppLocked,
  fetchMarquesinas,
  fetchBuses,
  getStatusConnectorAll,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  setDataModal,
  unsetDataModal,
  toggleBtnModal,
  setChargerFree,
  setChargerOperativo,
  stopChargeInternally,
  getStatusConnetor,
  handleSync,
  reservaNuevamente,
  handleInspectCharger,
  changeChargerStatus,
  stopChargerOnFailure,
  updateModalData,
  setUnloading,
  setLoading,
})(CargasMarquesinas);
