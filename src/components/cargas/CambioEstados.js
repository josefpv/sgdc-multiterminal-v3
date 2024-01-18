import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import _ from "lodash";
import { toast } from "react-toastify";
import Headroom from "react-headroom";

//redux
import { connect } from "react-redux";
import { changeChargerStatus } from "./../../redux/actions/cambiaEstados";
import { isAppLocked, setUnloading } from "./../../redux/actions/global";
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
} from "./../../redux/actions/cargas";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Marquesina from "./Marquesina";
import Leyenda from "./Leyenda";
import history from "../../history";

const CambioEstados = ({
  isLoading,
  auth,
  isAppLocked,
  marquesinas,
  isBtnAppLocked,
  fetchMarquesinas,
  getStatusConnectorAll,
  stopPendingChargings,
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  stopChargerOnFailure,
  setUnloading,
}) => {
  const [intervalo, setIntervalo] = useState(0);

  useEffect(() => {
    let intervalId = 0;
    fetchMarquesinas();
    isAppLocked();

    intervalId = setInterval(() => {
      fetchMarquesinas();
      isAppLocked();
    }, 10000);

    setIntervalFetchMarquesinas(intervalId);

    setUnloading();

    return () => {
      clearInterval(intervalId);
      unsetIntervalFetchMarquesinas(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isBtnAppLocked) {
      toast.info(
        "La función de carga se ha deshabilitado debido al bloque de horario actual."
      );
    }
  }, [isBtnAppLocked]);

  //establece detalles en drawer
  const handleDetalle = async (puesto, marquesina, cargadorOrigen) => {
    clearInterval(intervalo);
    history.push({
      pathname: "/cambiaestadosdetalle",
      state: { puesto, marquesina, cargadorOrigen },
    });
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
        <Grid2 md={12} xs={12}>
          {marquesinas.map((marquesina, index) => (
            <Marquesina
              key={index}
              marquesina={marquesina}
              indexMarquesina={index}
              onClick={handleDetalle}
              onDetienCargaOnAveria={handleDetienCargaOnAveria}
              opcionesVisible={true}
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
  stopChargeInternally,
  getStatusConnetor,
  handleSync,
  handleInspectCharger,
  changeChargerStatus,
  stopChargerOnFailure,
  updateModalData,
  setUnloading,
})(CambioEstados);
