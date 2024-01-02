import {
  FETCH_BUSES,
  FETCH_BUSES_APROXIMADOS,
  SET_FILTERED_BUSES,
  FETCH_SOH_COLS,
  FETCH_SOH_BUSES,
  SET_EDITING_MODE,
  FETCH_SOH_HISTORY,
  CLEAR_SOH_HISTORY,
  CLEAR_SOH,
  UPDATE_BUS_SETTING,
} from "./types";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import LightModeIcon from "@mui/icons-material/LightMode";
import _ from "lodash";

export const fetchBuses = () => async (dispatch, getState) => {
  const terminalId = parseInt(localStorage.getItem("terminalId"));
  const urlBuses = `${config.endPoints.consultaBuses}${terminalId}`;
  const { data } = await http.get(urlBuses);

  console.log("Se buscaron buses", data);
  dispatch({
    type: FETCH_BUSES,
    payload: data,
  });
};

export const fetchBusesAproximados = () => async (dispatch) => {
  dispatch({
    type: FETCH_BUSES_APROXIMADOS,
    payload: [],
  });

  //DESCOMENTAR UNA VEZ SOLUCIONADO LA API

  /* const urlBuses = `${config.global}${config.endPoints.consultaBusesAproximados}`;
  const { data } = await http.get(urlBuses);

  //no ahce falta porque cuando no hay buses aproximandose se rtornara false
  //!data.completado && toast.error("No se ha podido cargar los buses aproximados.");

  if (data.completado) {
    dispatch({
      type: FETCH_BUSES_APROXIMADOS,
      payload: data.buses,
    });
  } else {
    dispatch({
      type: FETCH_BUSES_APROXIMADOS,
      payload: [],
    });
  } */
};

export const setFilteredBuses = (patente) => async (dispatch, getState) => {
  let filtered = [];
  const buses = getState().buses.buses;
  const searchQuery = patente;
  if (searchQuery && searchQuery.length >= 4) {
    if (searchQuery) {
      filtered = buses.filter((bus) =>
        bus.ppu.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
  }

  dispatch({
    type: SET_FILTERED_BUSES,
    payload: filtered,
  });
};

export const setSohCols = () => {
  const cols = [
    {
      field: "ppu",
      headerName: "PPU",
      width: 90,
    },
    {
      field: "soh",
      headerName: "SOH %",
      width: 90,
      editable: true,
    },
    {
      field: "",
      headerName: "",
      width: 160,
      sortable: false,
      filterable: false,
      hideable: false,
      disableExport: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
          endIcon={<DepartureBoardIcon />}
          onClick={() => dispatch(fetchHistorySoh(params))}
        >
          Historial
        </Button>
      ),
    },
  ];

  return {
    type: FETCH_SOH_COLS,
    payload: cols,
  };
};

export const fetchSohBuses = (fecha) => async (dispatch) => {
  const terminalId = parseInt(localStorage.getItem("terminalId"));
  const fechaConsulta = new Date(fecha);
  console.log(
    `${fechaConsulta.getUTCFullYear()}-${
      fechaConsulta.getUTCMonth() + 1
    }-${fechaConsulta.getUTCDate()}`
  );
  const fechaQuery = `${fechaConsulta.getUTCFullYear()}-${
    fechaConsulta.getUTCMonth() + 1
  }-${fechaConsulta.getUTCDate()}`;
  const urlBuses = `${config.endPoints.fetchBusesSoh}/${terminalId}/${fechaQuery}`;
  http
    .get(urlBuses)
    .then(({ data }) => {
      dispatch({
        type: FETCH_SOH_BUSES,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setEditingRow = () => async (dispatch, getState) => {
  dispatch({
    type: SET_EDITING_MODE,
    payload: !getState().buses.editingRowMode,
  });
};

export const fetchHistorySoh = (params, fecha) => async (dispatch) => {
  const fechaConsulta = new Date(fecha);
  const fechaQuery = `${fechaConsulta.getUTCFullYear()}-${
    fechaConsulta.getUTCMonth() + 1
  }-${fechaConsulta.getUTCDate()}`;

  const { ppu } = params.row;

  const urlBus = `${config.endPoints.fetchBusSoh}/${ppu}/${fechaQuery}`;
  http
    .get(urlBus)
    .then(({ data }) => {
      dispatch({
        type: FETCH_SOH_HISTORY,
        payload: { data, ppu },
      });
    })
    .catch((error) => {
      return toast.error("No se han encontrado datos");
    });
};

export const clearSohHistory = () => {
  return {
    type: CLEAR_SOH_HISTORY,
  };
};

export const updateSoH = (inputs) => async (dispatch) => {
  const { ppu, soh, usuarioId, fecha } = inputs;

  const fechaConsulta = new Date(fecha);
  const fechaQuery = `${fechaConsulta.getUTCFullYear()}-${
    fechaConsulta.getUTCMonth() + 1
  }-${fechaConsulta.getUTCDate()}`;

  const dataApi = {
    SoH: soh,
    fechaHora: fechaQuery,
    usuarioId,
  };

  const url = `${config.endPoints.updateBusesSoh}/${ppu}`;
  http
    .post(url, dataApi)
    .then(({ data }) => {
      toast.success(data.msg);
    })
    .catch((error) => {
      console.log(error);
      toast.error(
        `Ha ocurrido un error al intentar actualizar el SoH de ${ppu}, por favor intente nuevamente.`
      );
    });
};

export const clearSoH = () => {
  return {
    type: CLEAR_SOH,
  };
};

export const updateBusSetting = (bus) => async (dispatch, getState) => {
  const { id, ppu, en_estudio } = bus;
  const dataApi = { enEstudio: !en_estudio };

  const copyBuses = [...getState().buses.buses];

  const busIndex = _.findIndex(copyBuses, { id: id });
  //console.log("ANTES: ", copyBuses[busIndex]);
  //console.log("BUS INDEX: ", busIndex);

  copyBuses[busIndex].en_estudio = !copyBuses[busIndex].en_estudio;

  //console.log("COPIA BUSES: ", copyBuses);

  const url = `${config.endPoints.updateBusSetting}${ppu}`;
  const { data } = await http.put(url, dataApi);

  toast.success(data.msg);
  dispatch({
    type: UPDATE_BUS_SETTING,
    payload: copyBuses,
  });
};
