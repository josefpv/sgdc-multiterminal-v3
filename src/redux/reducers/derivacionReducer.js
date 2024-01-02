import {
  FETCH_DERIVACION_LIST,
  RESET_DERIVACION_LIST,
  SET_SELECTED_DERIVACION,
} from "../actions/types";

const INITIAL_STATE = {
  derivacionList: [],
  selectedDerivacion: 1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DERIVACION_LIST:
      return {
        ...state,
        derivacionList: action.payload,
      };
    case SET_SELECTED_DERIVACION:
      return {
        ...state,
        selectedDerivacion: action.payload,
      };
    case RESET_DERIVACION_LIST: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
