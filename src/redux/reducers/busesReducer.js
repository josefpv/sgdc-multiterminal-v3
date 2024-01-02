import {
  CLEAR_SOH,
  CLEAR_SOH_HISTORY,
  FETCH_BUSES,
  FETCH_BUSES_APROXIMADOS,
  FETCH_SOH_BUSES,
  FETCH_SOH_COLS,
  FETCH_SOH_HISTORY,
  SET_EDITING_MODE,
  SET_FILTERED_BUSES,
  UPDATE_BUS_SETTING,
} from "./../actions/types";

const INITIAL_STATE = {
  buses: [],
  sohBuses: [],
  aproximados: [],
  sohCols: [],
  editingRowMode: false,
  historyGraph: [],
  selectedPpuSoh: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BUSES:
      return {
        ...state,
        buses: action.payload,
      };
    case FETCH_BUSES_APROXIMADOS:
      return {
        ...state,
        aproximados: action.payload,
      };
    case SET_FILTERED_BUSES:
      return {
        ...state,
        buses: action.payload,
      };
    case FETCH_SOH_BUSES:
      return {
        ...state,
        sohBuses: action.payload,
      };
    case FETCH_SOH_COLS:
      return {
        ...state,
        sohCols: action.payload,
      };
    case SET_EDITING_MODE:
      return {
        ...state,
        editingRowMode: action.payload,
      };
    case FETCH_SOH_HISTORY:
      return {
        ...state,
        historyGraph: action.payload.data,
        selectedPpuSoh: action.payload.ppu,
      };
    case CLEAR_SOH_HISTORY:
      return {
        ...state,
        historyGraph: [],
      };

    case UPDATE_BUS_SETTING:
      return {
        ...state,
        buses: action.payload,
      };
    case CLEAR_SOH:
      return {
        buses: [],
        sohBuses: [],
        aproximados: [],
        sohCols: [],
        editingRowMode: false,
        historyGraph: [],
        selectedPpuSoh: "",
      };
    default:
      return state;
  }
};
