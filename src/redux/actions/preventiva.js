import { CLEAR_PREVENTIVA, FETCH_PREVENTIVA, SAVE_PREVENTIVA } from "./types";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";
import { format } from "date-fns";

export const savePreventiva = (ppus, fechas) => async (dispatch, getState) => {
  const terminalId = localStorage.getItem("terminalId");
  const usuarioId = getState().auth.userData.id;
  const url = `${config.endPoints.savePreventiva}`;

  fechas.map(async (fecha) => {
    const fechaFormateada = format(fecha, "yyyy-MM-dd");
    const dataApi = {
      ppus,
      terminalId,
      usuarioId,
      fecha: fechaFormateada,
    };
    http
      .post(url, dataApi)
      .then(({ data }) => {})
      .catch((error) => {
        console.log(error);
        toast.error(
          `No se ha podido guardar la preventiva del día ${fechaFormateada}`
        );
      });
  });

  toast.success("Se han registrado las preventivas según los días.");

  dispatch({
    type: SAVE_PREVENTIVA,
  });
};

export const fetchPreventivas = (fecha) => async (dispatch, getState) => {
  const terminalId = localStorage.getItem("terminalId");
  const fechaFormateada = format(fecha, "yyyy-MM-dd");
  const url = `${config.endPoints.fetchPreventivas}/${terminalId}/${fechaFormateada}`;

  http
    .get(url)
    .then(({ data }) => {
      console.log("resultado: ", data);
      dispatch({
        type: FETCH_PREVENTIVA,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: CLEAR_PREVENTIVA,
      });
      return;
    });
};

export const deletePreventiva = (ppu, fecha) => async (dispatch, getState) => {
  const fechaFormateada = format(fecha, "yyyy-MM-dd");
  const usuarioId = getState().auth.userData.id;
  const url = `${config.endPoints.deletePreventiva}/${ppu}`;

  const dataApi = {
    fecha: fechaFormateada,
    usuarioId,
  };
  http
    .delete(url, { data: dataApi })
    .then(({ data }) => {
      toast.success(data.msg);
      dispatch(fetchPreventivas(fecha));
    })
    .catch((error) => {
      console.log(error);
      toast.success(
        `Ha ocurrido un error al intentar eliminar, por favor intente nuevamente.`
      );
    });
};

export const clearPreventiva = () => {
  return {
    type: CLEAR_PREVENTIVA,
  };
};
