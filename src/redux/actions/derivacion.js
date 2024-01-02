import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";
import {
  FETCH_DERIVACION_LIST,
  MAKE_DERIVACION,
  RESET_DERIVACION_LIST,
  SET_SELECTED_DERIVACION,
} from "./types";
import { fetchBuses } from "./buses";

export const fetchDerivacionList = () => async (dispatch) => {
  const url = config.endPoints.fetchDerivacionList;
  const { data } = await http.get(url);

  dispatch({
    type: FETCH_DERIVACION_LIST,
    payload: data,
  });
};

export const setSelectedDerivacion = (selectedItem) => {
  return {
    type: SET_SELECTED_DERIVACION,
    payload: selectedItem,
  };
};

export const makeDerivacion =
  (ppu, derivacion) => async (dispatch, getState) => {
    const terminalId = getState().auth.userData.terminalId;
    const usuarioId = getState().auth.userData.id;
    const dataApi = { ppu, terminalId, usuarioId, tipoId: derivacion };
    console.log("se hace derivacion; ", dataApi);

    const url = `${config.endPoints.makeDerivacion}`;
    const { data } = await http.post(url, dataApi);
    //console.log("Respuesta derivacion: ", data);

    toast.info("Se ha marcado la derivación del bus.");
    dispatch({
      type: MAKE_DERIVACION,
    });
    dispatch(fetchBuses());
  };

export const resetDerivacionList = () => {
  return {
    type: RESET_DERIVACION_LIST,
  };
};
