import {
  SET_INTERVAL_FETCH_MARQUESINAS,
  UNSET_INTERVAL_FETCH_MARQUESINAS,
  FETCH_MARQUESINAS,
  UPDATE_MARQUESINAS_MANUALLY,
  FETCH_INNER_STATE_CHARGERS,
  UPDATE_INNER_STATE_CHARGERS,
  SET_MODAL_DATA,
  UNSET_MODAL_DATA,
  UPDATE_MODAL_DATA,
  TOGGLE_BTN_MODAL,
  GET_STATUS_CONNECTOR,
  GET_STATUS_CONNECTOR_ALL,
  HANDLE_TECLE,
  HANDLE_TECLE_TIME,
  HANDLE_ALL_TECLES,
  STOP_CARGE_INTERNALLY,
  STOP_CHARGER_ON_FAILURE,
  STOP_PENDING_CHARGINGS,
  SET_CHARGER_FREE,
  HANDLE_SYNC,
  HANDLE_INSPECT_CHARGER,
  MAKE_RESERVA,
  FETCH_BUSES_RESUME,
  REINICIO_FORZADO,
} from "./../actions/types";

const INITIAL_STATE = {
  intervalId: 0,
  marquesinas: [],
  modalData: {
    data: {},
    statusCheck: null,
    intentos: null,
    showModal: false,
    isLoadingBtn: false,
  },
  cargadoresEstadoInterno: [],
  statusConnector: null,
  statusConnectorAll: null,
  busesResume: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MARQUESINAS:
      return {
        ...state,
        marquesinas: action.payload,
      };
    case UPDATE_MARQUESINAS_MANUALLY:
      return {
        ...state,
        marquesinas: action.payload,
      };
    case SET_INTERVAL_FETCH_MARQUESINAS:
      return {
        ...state,
        intervalId: action.payload,
      };
    case UNSET_INTERVAL_FETCH_MARQUESINAS:
      return {
        ...state,
        intervalId: action.payload,
      };
    case SET_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload,
      };
    case UNSET_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload,
      };
    case UPDATE_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload,
      };
    case TOGGLE_BTN_MODAL:
      return {
        ...state,
        modalData: action.payload,
      };
    case HANDLE_TECLE:
      return {
        ...state,
      };
    case HANDLE_TECLE_TIME:
      return {
        ...state,
      };
    case HANDLE_ALL_TECLES:
      return {
        ...state,
      };
    case GET_STATUS_CONNECTOR:
      return {
        ...state,
        statusConnector: action.payload,
      };
    case GET_STATUS_CONNECTOR_ALL:
      return {
        ...state,
        statusConnectorAll: action.payload,
      };
    case STOP_CARGE_INTERNALLY:
      return {
        ...state,
      };
    case STOP_CHARGER_ON_FAILURE:
      return {
        ...state,
      };
    case STOP_PENDING_CHARGINGS:
      return {
        ...state,
      };
    case FETCH_INNER_STATE_CHARGERS:
      return {
        ...state,
        cargadoresEstadoInterno: action.payload,
      };
    case UPDATE_INNER_STATE_CHARGERS:
      return {
        ...state,
        cargadoresEstadoInterno: action.payload,
      };
    case FETCH_BUSES_RESUME:
      return {
        ...state,
        busesResume: action.payload,
      };
    case SET_CHARGER_FREE:
      return {
        ...state,
      };
    case HANDLE_SYNC:
      return {
        ...state,
      };
    case HANDLE_INSPECT_CHARGER:
      return {
        ...state,
      };
    case MAKE_RESERVA:
      return {
        ...state,
      };
    case REINICIO_FORZADO:
      return state;
    default:
      return state;
  }
};
