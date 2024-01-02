import {
  SET_PUESTO,
  SET_MARQUESINA,
  SET_CARGADOR_ORIGEN,
  SET_SELECTED_CHARGER_STATUS,
  SET_SELECTED_PPU,
  CHANGE_CHARGER_STATUS,
  RESET_VALUES_CHANGE_CHARGER_STATUS,
} from "./../actions/types";

const INITIAL_STATE = {
  marquesina: {},
  cargadorOrigen: {},
  puesto: {},
  selectedChargerStatus: null,
  ppuSelected: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MARQUESINA:
      return {
        ...state,
        marquesina: action.payload,
      };
    case SET_CARGADOR_ORIGEN:
      return {
        ...state,
        cargadorOrigen: action.payload,
      };
    case SET_PUESTO:
      return {
        ...state,
        puesto: action.payload,
      };
    case SET_SELECTED_CHARGER_STATUS:
      return {
        ...state,
        selectedChargerStatus: action.payload,
      };
    case SET_SELECTED_PPU:
      return {
        ...state,
        ppuSelected: action.payload,
      };
    case CHANGE_CHARGER_STATUS:
      return {
        ...state,
      };

    case RESET_VALUES_CHANGE_CHARGER_STATUS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
