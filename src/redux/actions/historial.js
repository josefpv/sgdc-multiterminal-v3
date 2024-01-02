import {
  FETCH_HISTORIAL,
  FETCH_HISTORIAL_FILTER,
  SET_CURRENT_PAGE_HISTORIAL,
  SET_FILTER_MARQUESINA,
  SET_SEARCH_QUERY_HISTORIAL,
  SET_SORT_COLUMN_HISTORIAL,
} from "./types";
import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";

export const fetchHistorial = () => async (dispatch) => {
  const historial = await getHistorialCarga();
  if (historial && historial.length) {
    dispatch({
      type: FETCH_HISTORIAL,
      payload: historial,
    });
  } else {
    toast.error("No se han conseguido datos, intente con otra fecha");
    dispatch({
      type: FETCH_HISTORIAL,
      payload: [],
    });
  }
};

export const fetchHistorialFiltro = (fecha) => async (dispatch) => {
  const historial = await getHistorialCarga(fecha);
  if (historial && historial.length) {
    dispatch({
      type: FETCH_HISTORIAL,
      payload: historial,
    });
  } else {
    toast.error("No se han conseguido datos, intente con otra fecha");
    dispatch({
      type: FETCH_HISTORIAL,
      payload: [],
    });
  }
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE_HISTORIAL,
    payload: page,
  };
};

export const setFilterMarquesina = (marquesina) => {
  return {
    type: SET_FILTER_MARQUESINA,
    payload: marquesina,
  };
};

export const setSortColum = (sortColum) => {
  return {
    type: SET_SORT_COLUMN_HISTORIAL,
    payload: sortColum,
  };
};

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY_HISTORIAL,
    payload: query,
  };
};

//functions

const getHistorialCarga = async (fecha = "") => {
  const terminalId = localStorage.getItem("terminalId");
  let url = `${config.endPoints.historialCarga}${terminalId}`;

  if (fecha !== "") {
    url = `${config.endPoints.historialCarga}${terminalId}?fecha=${fecha}`;
  }

  const { data } = await http.get(url);
  return data;
};
