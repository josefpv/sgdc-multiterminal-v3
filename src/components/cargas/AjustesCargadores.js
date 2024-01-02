import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import DetallePuestoAjuste from "./DetallePuestoAjustes";
import Leyenda from "./Leyenda";
import _ from "lodash";

//floating button
import Headroom from "react-headroom";

//redux
import { connect } from "react-redux";
import { getAccessPage } from "../../redux/actions";
import { setUnloading } from "../../redux/actions/global";
import {
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchMarquesinas,
  fetchInnerStateChargers,
  unsetDataModal,
  updateModalData,
  handleInspectCharger,
} from "../../redux/actions/cargas";

import {
  setDataModalSettings,
  updateDataModalSettings,
  commitChargerSetting,
  closeModalSettings,
} from "./../../redux/actions/chargerSetting";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Drawer } from "@mui/material";
import Marquesina from "./Marquesina";

const AjusteCargadores = ({
  isLoading,
  marquesinas,
  modalData,
  statusConnectorAll: connectorStatusData,
  cargadoresEstadoInterno,
  isLoadingModal,
  fetchMarquesinas,
  setUnloading,
  setDataModalSettings,
  updateDataModalSettings,
  closeModalSettings,
  handleInspectCharger,
  getAccessPage,
  setIntervalFetchMarquesinas,
  fetchInnerStateChargers,
  unsetIntervalFetchMarquesinas,
  commitChargerSetting,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const obtieneMarquesinas = async () => {
    await fetchMarquesinas();
    setUnloading();
  };

  const setDataModal = async (puesto, marquesina, cargadorOrigen) => {
    setDataModalSettings(puesto, marquesina, cargadorOrigen);
  };

  const handleUpdateDataModal = async (puesto, marquesina, cargadorOrigen) => {
    updateDataModalSettings(puesto, marquesina, cargadorOrigen);
  };

  const handleClose = () => {
    closeModalSettings();
  };

  const handleInspeccionaPuesto = async (
    dataModal,
    puestoId,
    puestoNombre,
    enInspeccion
  ) => {
    handleInspectCharger(dataModal, puestoId, puestoNombre, enInspeccion);
  };

  const handleChangeCurrentPage = (event) => {
    setCurrentPage(event.target.value);
  };

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

  useEffect(() => {
    getAccessPage();
    let intervalId = 0;
    obtieneMarquesinas();
    intervalId = setInterval(() => {
      obtieneMarquesinas();
    }, 10000);
    //set interval id to redux
    setIntervalFetchMarquesinas(intervalId);
    fetchInnerStateChargers();
    document.title = "SGDC - Ajustes";
    return () => {
      clearInterval(intervalId);
      unsetIntervalFetchMarquesinas();
    };
  }, []);

  const handleCommitChargerSetting = () => {
    const { data } = modalData;
    commitChargerSetting(data);
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
            <DetallePuestoAjuste
              data={modalData.data}
              visible={modalData.showModal}
              onClose={handleClose}
              onUpdateDataModal={handleUpdateDataModal}
              isLoadingBtn={modalData.isLoadingBtn}
              onInspeccionaPuesto={handleInspeccionaPuesto}
              onCommitChanges={handleCommitChargerSetting}
            />
          )}
          <Button color="secondary" onClick={handleClose}>
            cerrar
          </Button>
        </Drawer>
      </Grid2>
      <Grid2 md={12} xs={12}>
        {marquesinas.map((marquesina, index) => (
          <Marquesina
            key={marquesina.id}
            marquesina={marquesina}
            totalCargadores={marquesina.cargadores.length}
            columnas={15}
            onClick={setDataModal}
            onValueUpdate={setDataModal}
            onAccionMasiva={() => null}
            onLiberacionForzadaMasiva={() => null}
            indexMarquesina={index}
            connectorStatusData={connectorStatusData}
            estadosInternos={cargadoresEstadoInterno}
            onDetienCargaOnAveria={() => null}
          />
        ))}
      </Grid2>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.loading,
    isLoadingModal: state.chargerSettings.isLoadingModal,
    auth: state.auth,
    intervalId: state.cargas.intervalId,
    marquesinas: state.cargas.marquesinas,
    modalData: state.chargerSettings.modalData,
    statusConnector: state.cargas.statusConnector,
    statusConnectorAll: state.cargas.statusConnectorAll,
    cargadoresEstadoInterno: state.cargas.cargadoresEstadoInterno,
  };
};

export default connect(mapStateToProps, {
  setIntervalFetchMarquesinas,
  unsetIntervalFetchMarquesinas,
  fetchMarquesinas,
  fetchInnerStateChargers,
  setDataModalSettings,
  updateDataModalSettings,
  closeModalSettings,
  updateModalData,
  commitChargerSetting,
  setUnloading,
  handleInspectCharger,
  getAccessPage,
})(AjusteCargadores);
