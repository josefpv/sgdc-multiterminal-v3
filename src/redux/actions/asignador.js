import { INSERT_RESERVA_SCREEN, SHOW_RESERVA } from "./types";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";

export const showReserva = (reservaData) => async (dispatch) => {
  const pantallaReserva = await insertReservaScreen(
    reservaData.marquesina,
    reservaData.fila,
    reservaData.cargador,
    reservaData.ppu,
    reservaData.soc
  );

  if (pantallaReserva) {
    dispatch({
      type: SHOW_RESERVA,
      payload: reservaData,
    });
  }
};

const insertReservaScreen = async (marquesina, fila, cargador, ppu, soc) => {
  const url = `${config.endPoints.insertaReservaPantalla}`;
  const validSoc = soc === "--" ? 0 : soc;
  const dataReserva = {
    marquesina,
    fila,
    cargador,
    ppu,
    soc: validSoc,
  };
  console.log("Datos Reserva: ", dataReserva);
  const { data } = await http.post(url, dataReserva);
  console.log(data);
  if (!data.completado) {
    toast.error(
      "Ha ocurrido un error al intentar mostrar reserva en pantalla, por favor intente nuevamente."
    );
    return false;
  }

  return true;
};
