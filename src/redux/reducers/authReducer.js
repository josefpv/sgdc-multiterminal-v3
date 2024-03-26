import {
  TOGGLE_LOGIN_BTN_LOADING,
  SIGN_IN,
  LOG_OUT,
  FETCH_CURRENT_USER,
  GET_CURRENT_LOCATION,
  GET_ACCESS_PAGES,
  SET_APP_CONFIG_PARAMS,
  SET_RED_LENTA_NOTIFICACION,
  SET_RED_LENTA_NOTIFICACION_DESCARTADO,
} from "./../actions/types";

const INITIAL_STATE = {
  isLoadingBtn: false,
  isSignedIn: null,
  userData: null,
  currentLocation: "/",
  configuracionApp: {
    terminalId: null,
    cantColumnas: 0,
  },
  redLenta: false,
  redLentaNotificacionDescartada: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_BTN_LOADING:
      return {
        ...state,
        isLoadingBtn: action.payload,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        userData: action.payload.userData,
      };
    case SET_APP_CONFIG_PARAMS:
      return {
        ...state,
        configuracionApp: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isSignedIn: false,
        userData: null,
        currentLocation: "/",
      };
    case FETCH_CURRENT_USER:
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        userData: action.payload.userData,
      };
    case GET_ACCESS_PAGES:
      return {
        ...state,
      };
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case SET_RED_LENTA_NOTIFICACION:
      return {
        ...state,
        redLenta: action.payload,
      };
    case SET_RED_LENTA_NOTIFICACION_DESCARTADO:
      return { ...state, redLentaNotificacionDescartada: action.payload };
    default:
      return state;
  }
};
