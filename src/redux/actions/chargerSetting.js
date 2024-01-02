import {
  CLOSE_MODAL_DATA_SETTINGS,
  COMMIT_CHARGER_SETTING,
  SET_CHARGER_SETTINGS_MODAL,
  SET_MODAL_SETTING_LOADING,
  UPDATE_BUS_SETTING,
  UPDATE_CHARGER_SETTING,
} from "./types";
import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";

export const setDataModalSettings =
  (puesto, marquesina, cargadorOrigen, statusCheck = null, intentos = null) =>
  async (dispatch, getState) => {
    dispatch({
      type: SET_CHARGER_SETTINGS_MODAL,
      payload: {
        data: {
          puesto: puesto,
          marquesina: marquesina,
          cargadorOrigen: cargadorOrigen,
        },
        showModal: true,
        isLoadingModal: false,
      },
    });
  };

export const updateDataModalSettings =
  (puesto, marquesina, cargadorOrigen, statusCheck = null, intentos = null) =>
  async (dispatch, getState) => {
    dispatch({
      type: SET_CHARGER_SETTINGS_MODAL,
      payload: {
        data: {
          puesto: puesto,
          marquesina: marquesina,
          cargadorOrigen: cargadorOrigen,
        },
        showModal: true,
        isLoadingModal: false,
      },
    });
  };

export const closeModalSettings = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL_DATA_SETTINGS,
  });
};

export const commitChargerSetting =
  ({ puesto }) =>
  async (dispatch) => {
    const dataApi = {
      tiempo: puesto.tiempo,
      especial: puesto.especial ? 1 : 0,
      enInspeccion: puesto.enInspeccion ? 1 : 0,
    };

    dispatch({
      type: SET_MODAL_SETTING_LOADING,
      payload: true,
    });

    dispatch({
      type: COMMIT_CHARGER_SETTING,
    });
    dispatch({
      type: CLOSE_MODAL_DATA_SETTINGS,
    });

    const url = `${config.endPoints.updateChargerSetting}${puesto.id}`;
    const { data } = await http.put(url, dataApi);

    toast.success(data.msg);
    dispatch({
      type: SET_MODAL_SETTING_LOADING,
      payload: true,
    });
    dispatch({
      type: SET_MODAL_SETTING_LOADING,
      payload: false,
    });
  };
