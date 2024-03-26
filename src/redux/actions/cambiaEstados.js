import {
  SET_PUESTO,
  SET_MARQUESINA,
  SET_CARGADOR_ORIGEN,
  SET_SELECTED_CHARGER_STATUS,
  SET_SELECTED_PPU,
  CHANGE_CHARGER_STATUS,
  RESET_VALUES_CHANGE_CHARGER_STATUS,
  SET_IS_LOADING_BTN,
} from "./types";
import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";
import { fetchMarquesinas } from "./cargas";

export const setPuesto = (puesto) => {
  return {
    type: SET_PUESTO,
    payload: puesto,
  };
};

export const setMarquesina = (marquesina) => {
  return {
    type: SET_MARQUESINA,
    payload: marquesina,
  };
};

export const setCargadorOrigen = (cargadorOrigen) => {
  return {
    type: SET_CARGADOR_ORIGEN,
    payload: cargadorOrigen,
  };
};

export const setSelectedChargerStatus = (newStatus) => {
  return {
    type: SET_SELECTED_CHARGER_STATUS,
    payload: newStatus,
  };
};

export const setSelectedPpu = (ppu) => {
  return {
    type: SET_SELECTED_PPU,
    payload: ppu,
  };
};

export const changeChargerStatus =
  (marquesinaId, cargadorId, puesto, estado, bus, usuarioId, redirect = true) =>
  async (dispatch) => {
    //console.log(bus.hasOwnProperty("ppu"));
    if (
      (estado === 2 || estado === 4 || estado == 6) &&
      !bus.hasOwnProperty("ppu")
    ) {
      toast.error("Debe asignar una patente al puesto (pistola).");
      dispatch(setIsLoadingBtn(false));
    } else if (estado === 2 && !bus.en_estudio && puesto.especial) {
      toast.error(
        `El cargador que intenta reservar está solo disponible para buses bajo estudio especial. ${bus.ppu} no se encuentra bajo estudio especial, por favor seleccione un cargador común.`
      );
      dispatch(setIsLoadingBtn(false));
    } else if (estado === 2 && bus.en_estudio && !puesto.especial) {
      toast.error(
        `El bus ${bus.ppu} está bajo estudio especial por lo que solo puede ingresar (reservar) en puestos marcados como 'especial', por favor seleccione otro cargador.`
      );
      dispatch(setIsLoadingBtn(false));
    } else if (estado === puesto.estado) {
      toast.error("El puesto (pistola) ya se encuentra en ese estado.");
      dispatch(setIsLoadingBtn(false));
    } else {
      const ppu = bus && bus.ppu ? bus.ppu : "";

      const url = config.endPoints.cambiaEstadoPuestos;
      const dataCambiaEstado = {
        marquesinaId,
        cargadorId,
        pistolaId: puesto.id,
        estadoId: estado,
        ppu,
        usuarioId,
      };
      http
        .post(url, dataCambiaEstado)
        .then(({ data }) => {
          dispatch({
            type: CHANGE_CHARGER_STATUS,
          });
          toast.success(`${data.msg}, por favor espere...`);
        })
        .then(() => {
          dispatch(fetchMarquesinas()).then(() => {
            dispatch(setIsLoadingBtn(false));
            redirect ? history.push("/cambiaestados") : null;
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: CHANGE_CHARGER_STATUS,
          });
          dispatch(setIsLoadingBtn(false));
        });
    }
  };

export const resetValuesChangeChargerStatus = () => {
  return {
    type: RESET_VALUES_CHANGE_CHARGER_STATUS,
  };
};

export const setIsLoadingBtn = (isLoading) => {
  return {
    type: SET_IS_LOADING_BTN,
    payload: isLoading,
  };
};
