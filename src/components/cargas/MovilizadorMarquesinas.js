import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import Headroom from "react-headroom";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import { changeChargerStatus } from "../../redux/actions/cambiaEstados";
import {
  isAppLocked,
  setLoading,
  setUnloading,
} from "../../redux/actions/global";
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
  stopChargeInternally,
  stopChargerOnFailure,
  stopPendingChargings,
  setChargerFree,
  handleInspectCharger,
  handleSync,
} from "../../redux/actions/cargas";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Marquesina from "./Marquesina";
import Leyenda from "./Leyenda";
import Loading from "../common/Loading";

const MovilizadorMarquesinas = ({
  isLoading,
  isAppLocked,
  marquesinas,
  modalData,
  isBtnAppLocked,
  fetchMarquesinas,
  getStatusConnectorAll,
  stopPendingChargings,
  setUnloading,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  stopChargerOnFailure,
  updateModalData,
}) => {
  const [actualizaModal, setActualizaModal] = useState(false);

  useEffect(() => {
    getAccessPage();
    let intervalId = 0;
    fetchMarquesinas();
    setUnloading();
    isAppLocked();
    getStatusConnectorAll();
    intervalId = setInterval(() => {
      fetchMarquesinas();
      getStatusConnectorAll();
      stopPendingChargings();
      isAppLocked();
    }, 10000);
    setIntervalFetchMarquesinas();
    fetchInnerStateChargers();

    return () => {
      clearInterval(intervalId);
      unsetIntervalFetchMarquesinas();
    };
  }, []);

  useEffect(() => {
    if (isBtnAppLocked) {
      toast.info(
        "La función de carga se ha deshabilitado debido al bloque de horario actual."
      );
    }
  }, [isBtnAppLocked]);

  //actualiza data de modal si esta abierto
  useEffect(() => {
    let intervaloACtualizacionModal = 0;
    if (actualizaModal) {
      console.info("Actualizando modal....");
      intervaloACtualizacionModal = setInterval(() => {
        modalData.hasOwnProperty("puesto") && updateModalData();
      }, 10000);
    } else {
      console.info("Se detuvo la actualizacion de la modal");
      clearInterval(intervaloACtualizacionModal);
    }
  }, [actualizaModal]);

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
    return {
      countDisponibles,
      countReservados,
      countCargando,
      countOcupados,
      countInhabilitados,
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
        <Grid2 md={12} xs={12} sx={{ p: 2 }}>
          {marquesinas.map((marquesina, index) => (
            <Marquesina
              key={index}
              marquesina={marquesina}
              indexMarquesina={index}
              onClick={() => null}
              onDetienCargaOnAveria={handleDetienCargaOnAveria}
            />
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
  getStatusConnectorAll,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  setDataModal,
  unsetDataModal,
  toggleBtnModal,
  setChargerFree,
  setUnloading,
  stopChargeInternally,
  getStatusConnetor,
  handleSync,
  handleInspectCharger,
  changeChargerStatus,
  stopChargerOnFailure,
  updateModalData,
})(MovilizadorMarquesinas);
