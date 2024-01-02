import {
  TOGGLE_LOGIN_BTN_LOADING,
  SIGN_IN,
  LOG_OUT,
  FETCH_CURRENT_USER,
  GET_ACCESS_PAGES,
  SET_APP_CONFIG_PARAMS,
} from "./types";
import { redirectLoggedIn_ } from "./../../components/services/authService";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import history from "./../../history";
import { toast } from "react-toastify";
import _ from "lodash";
import * as jwt_decode from "jwt-decode";

export const toggleLoginBtnLoading = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_LOGIN_BTN_LOADING,
    payload: !getState().auth.isLoadingBtn,
  });
};

export const signIn = (username, password) => async (dispatch) => {
  console.log("LOGINNN!!");
  dispatch(toggleLoginBtnLoading());
  const urlLogin = `${config.endPoints.login}`;

  http
    .post(urlLogin, { username, password })
    .then(({ data }) => {
      dispatch(toggleLoginBtnLoading());
      const { token } = data;
      const userData = jwt_decode(token);
      const cantCols = getCantColumnasTerminal(userData.terminalId);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("cantColumnas", cantCols);
      localStorage.setItem("terminalId", userData.terminalId);
      dispatch({
        type: SET_APP_CONFIG_PARAMS,
        payload: {
          terminalId: userData.terminalId,
          cantColumnas: cantCols,
        },
      });
      dispatch({
        type: SIGN_IN,
        payload: { isSignedIn: true, userData: { ...userData, token } },
      });

      const redirectTo = redirectLoggedIn_(userData.perfilId);
      history.push(redirectTo);
      toast.success(
        `Bienvenido ${userData.nombre}, tu terminal es ${userData.terminal}`,
        { autoClose: false }
      );
    })
    .catch((error) => {
      dispatch({
        type: TOGGLE_LOGIN_BTN_LOADING,
        payload: false,
      });
    });

  /* 
  !data.completado && toast.error(data.mensaje);
  if (data.completado && data.perfil) {
    dispatch(toggleLoginBtnLoading());
    localStorage.setItem("userData", JSON.stringify(data));
    console.log("USER: ", data);
    //configuracion del sistema
    //cambiar 1 por el ID recibido al iniciar sesion
    const cantCols = getCantColumnasTerminal(data.terminal.id);
    localStorage.setItem("cantColumnas", cantCols);
    localStorage.setItem("terminalId", data.terminal.id);
    dispatch({
      type: SET_APP_CONFIG_PARAMS,
      payload: { terminalId: data.terminal.id, cantColumnas: cantCols },
    });
    dispatch({
      type: SIGN_IN,
      payload: data,
    });
    //const redirectTo = redirectLoggedIn_(data.token, data.perfil.id);
    const redirectTo = redirectLoggedIn_(data.perfil.id);
    history.push(redirectTo);
    toast.success(
      `Bienvenido ${data.nombre}, tu terminal es ${data.terminal.nombre}`,
      { autoClose: false }
    );
  } else {
    dispatch(toggleLoginBtnLoading());
  } */
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: LOG_OUT,
  };
};

export const fetchCurrentUser = () => (dispatch, getState) => {
  let userData = null;
  userData =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));
  const cantColumnas = parseInt(localStorage.getItem("cantColumnas"));
  const terminalId = parseInt(localStorage.getItem("terminalId"));

  console.log("userData: ", userData);

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: { isSignedIn: userData ? true : false, userData },
  });

  dispatch({
    type: SET_APP_CONFIG_PARAMS,
    payload: { terminalId, cantColumnas },
  });
};

export const getAccessPage = () => (dispatch, getState) => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const token = localStorage.getItem("token");

  if (!userData) {
    return;
  }

  const currentUserProfile = userData.perfilId;
  const currentLocation = history.location.pathname
    .replace("/", "")
    .split("/")[0];
  const accesos = [
    {
      perfil_id: 1,
      paginas: [
        "seleccion",
        "marquesinas",
        "cambiaestados",
        "cambiaestadosdetalle",
        "cargabombero",
        "movilizador",
        "usuarios",
        "usuario",
        "asignador",
        "historial",
        "profile",
        "ajustes",
        "preventiva",
      ],
    },
    {
      perfil_id: 2,
      paginas: [
        "seleccion",
        "marquesinas",
        "cambiaestados",
        "cambiaestadosdetalle",
        "cargabombero",
        "movilizador",
        "usuarios",
        "usuario",
        "asignador",
        "historial",
        "profile",
        "ajustes",
        "preventiva",
      ],
    },
    {
      perfil_id: 3,
      paginas: [
        "cargabombero",
        "historial",
        "profile",
        "cambiaestados",
        "cambiaestadosdetalle",
        "preventiva",
      ],
    },
    {
      perfil_id: 4,
      paginas: [
        "seleccion",
        "marquesinas",
        "cambiaestados",
        "cambiaestadosdetalle",
        "asignador",
        "historial",
        "profile",
        "ajustes",
        "preventiva",
      ],
    },
    {
      perfil_id: 5,
      paginas: ["movilizador", "historial", "profile"],
    },
    {
      perfil_id: 7,
      paginas: ["movilizador", "profile"],
    },
  ];

  const accesosPaginas = accesos.filter(
    (perfil) => perfil.perfil_id === currentUserProfile
  );

  dispatch({
    type: GET_ACCESS_PAGES,
  });

  if (!_.includes(accesosPaginas[0].paginas, currentLocation)) {
    //const redirectTo = redirectLoggedIn_(token, currentUserProfile);
    const redirectTo = redirectLoggedIn_(currentUserProfile);
    history.push(redirectTo);
  }
};

const getCantColumnasTerminal = (terminalId) => {
  switch (terminalId) {
    case 1:
      //Maipu
      return 14;
    case 2:
      //Las Torres
      return 1;
    case 3:
      //Sta Clara
      return 1;
    default:
      //Otros
      return 14;
  }
};
