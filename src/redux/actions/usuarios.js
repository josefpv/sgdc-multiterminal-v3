import {
  FETCH_USUARIOS,
  FETCH_USER,
  UPDATE_USERS_MANUALLY,
  TOGGLE_USER_STATE,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_SEARCH_QUERY,
  SET_SORT_COLUMN,
  RESET_VIEW_USERS,
  FETCH_USERS_PROFILES,
  SET_SELECTED_PROFILE,
  UPDATE_USER,
  CREATE_NEW_USER,
  REQUEST_NEW_USER,
  FETCH_PENDDING_USER,
  ACCEPT_DECLINE_USER,
  FETCH_TERMINALES,
} from "./types";
import history from "./../../history";
import http from "./../../components/services/httpService";
import config from "./../../config.json";
import { toast } from "react-toastify";

export const resetViewUser = () => {
  return {
    type: RESET_VIEW_USERS,
  };
};

export const fetchUsuarios = () => async (dispatch, getState) => {
  const terminalId = getState().auth.userData.terminalId;
  const url = `${config.endPoints.consultaUsuarios}/${terminalId}`;

  http
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: FETCH_USUARIOS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_USUARIOS,
        payload: [],
      });
    });
};

export const fetchTerminales = () => async (dispatch) => {
  const url = `${config.endPoints.fetchTerminales}`;
  http
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: FETCH_TERMINALES,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_TERMINALES,
        payload: [],
      });
    });
};

export const toggleUserState = (usuario) => async (dispatch, getState) => {
  const nuevoStatus = !usuario.activo;
  const idUser = usuario.id;

  const usuarios = [...getState().usuarios.usuarios];
  const index = usuarios.indexOf(usuario);
  usuarios[index] = { ...usuarios[index] };
  usuarios[index].activo = !usuarios[index].activo;
  dispatch({
    type: UPDATE_USERS_MANUALLY,
    payload: usuarios,
  });

  const url = `${config.endPoints.cambiaEstadoUsuario}/${idUser}`;
  const dataUser = {
    estado: nuevoStatus,
  };

  http
    .put(url, dataUser)
    .then(({ data }) => {
      toast.success(data.msg);
      dispatch({
        type: TOGGLE_USER_STATE,
        payload: usuarios,
      });
    })
    .catch((error) => {
      console.log(error);
      const usuarios = [...getState().usuarios.usuarios];
      const index = usuarios.indexOf(usuario);
      usuarios[index] = { ...usuarios[index] };
      usuarios[index].activo = !usuarios[index].activo;
      toast.error(
        "Ha ocurrido un error al intentar cambiar el estado del usuario, por favor intente nuevamente."
      );
      dispatch({
        type: TOGGLE_USER_STATE,
        payload: usuarios,
      });
    });
};

export const updateUsersManually = (usuarios) => {
  return {
    type: UPDATE_USERS_MANUALLY,
    payload: usuarios,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setSearchQuery = (searchQuery) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: searchQuery,
  };
};

export const setSortColumn = (sortColumn) => {
  return {
    type: SET_SORT_COLUMN,
    payload: sortColumn,
  };
};

export const fetchProfiles = () => async (dispatch) => {
  const url = `${config.endPoints.perfilUsuarios}`;
  http
    .get(url)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_USERS_PROFILES,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_USERS_PROFILES,
        payload: [],
      });
    });
};

export const fetchUser = (userId) => async (dispatch, getState) => {
  const url = `${config.endPoints.consultaUsuarioInfo}/${userId}`;
  http
    .get(url)
    .then(({ data }) => {
      const usuario = {
        nombre: data.nombre,
        usuario: data.usuario,
        perfilSelected: data.perfil_id,
        terminalId: data.terminal_id,
      };

      dispatch({
        type: SET_SELECTED_PROFILE,
        payload: data.perfil_id,
      });

      dispatch({
        type: FETCH_USER,
        payload: usuario,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_USER,
        payload: {},
      });
    });
};

export const setSelectedProfile = (profileId) => {
  return {
    type: SET_SELECTED_PROFILE,
    payload: profileId,
  };
};

export const updateUserInfo =
  (
    userId,
    nombre,
    usuario,
    password,
    perfilSelected,
    terminalId,
    cambiaTerminal = false
  ) =>
  async (dispatch, getState) => {
    const url = `${config.endPoints.actualizaUsuario}/${userId}`;
    const dataUser = {
      nombre: nombre,
      usuario: usuario,
      password: password,
      perfilId: perfilSelected,
      terminalId: terminalId,
    };

    http.put(url, dataUser).then(({ data }) => {
      if (parseInt(userId) == parseInt(getState().auth.userData.id)) {
        if (!cambiaTerminal) {
          toast.success(
            "Se ha actualizado tu perfil, por favor inicia sesión nuevamente."
          );
        } else {
          toast.success(
            "Te has cambiado de terminal, por favor inicia sesión nuevamente."
          );
        }
        dispatch({
          type: UPDATE_USER,
        });
        history.push("/logout");
      } else {
        toast.success("Se ha actualizado los datos del usuario.");
        dispatch({
          type: UPDATE_USER,
        });
        history.push("/usuarios");
      }
    });
  };

export const createUser =
  (nombre, usuario, password, perfilId, terminalId) => async (dispatch) => {
    const url = `${config.endPoints.registraUsuario}`;
    const dataUser = {
      nombre,
      usuario,
      password,
      perfilId,
      terminalId,
    };
    //console.log(dataUser);
    http
      .post(url, dataUser)
      .then(({ data }) => {
        toast.success("Se ha creado el nuevo usuario.");
        dispatch({
          type: CREATE_NEW_USER,
        });
        history.push("/usuarios");
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: CREATE_NEW_USER,
        });
      });
  };

//para solicitudes externas
export const requestUser =
  (nombre, usuario, password, perfilId, terminalId) => async (dispatch) => {
    const url = `${config.endPoints.registraUsuario}`;
    const dataUser = {
      nombre,
      usuario,
      password,
      perfilId,
      terminalId,
    };
    //console.log(dataUser);
    http
      .post(url, dataUser)
      .then(({ data }) => {
        toast.success(data.msg);
        dispatch({
          type: CREATE_NEW_USER,
        });
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: CREATE_NEW_USER,
        });
      });
  };

export const fetchPenddingUsers = () => async (dispatch, getState) => {
  const terminalId = getState().auth.userData.terminalId;
  const url = `${config.endPoints.fetchPenddingUsers}/${terminalId}`;
  http
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: FETCH_PENDDING_USER,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: FETCH_PENDDING_USER,
        payload: [],
      });
    });
};

export const acceptDeclineUser =
  (usuarioId, accion) => async (dispatch, getState) => {
    const actionMsg = accion ? "aceptar" : "rechazar";
    const actionMsg2 = accion ? "aceptado" : "rechazado";

    if (accion) {
      //acepta solicitud

      const url = `${config.endPoints.acceptUser}/${usuarioId}`;
      const { usuarios } = getState();
      const penddingUsersCopy = { ...usuarios.penddingUsers };

      http
        .post(url)
        .then(({ data }) => {
          _.remove(penddingUsersCopy, { id: usuarioId });

          dispatch({
            type: ACCEPT_DECLINE_USER,
            payload: penddingUsersCopy,
          });
          dispatch(fetchUsuarios());
          toast.success(`Se ha ${actionMsg2} la solicitud del usuario.`);
        })
        .catch((error) => {
          toast.error(
            `No se pudo ${actionMsg} la solicitud del usuario, por favor intente nuevamente.`
          );
        });
    } else {
      //rechaza solicitud
      const url = `${config.endPoints.declineUser}/${usuarioId}`;
      const { usuarios } = getState();
      const penddingUsersCopy = { ...usuarios.penddingUsers };

      http
        .post(url)
        .then(({ data }) => {
          _.remove(penddingUsersCopy, { id: usuarioId });

          dispatch({
            type: ACCEPT_DECLINE_USER,
            payload: penddingUsersCopy,
          });
          dispatch(fetchUsuarios());
          toast.success(`Se ha ${actionMsg2} la solicitud del usuario.`);
        })
        .catch((error) => {
          toast.error(
            `No se pudo ${actionMsg} la solicitud del usuario, por favor intente nuevamente.`
          );
        });
    }
  };

export const makeUserInvisible = (usuarioId, logOut) => async (dispatch) => {
  const url = `${config.endPoints.makeUserInvisible}/${usuarioId}/0`;
  http
    .post(url)
    .then(({ data }) => {
      if (logOut) {
        //cierra sesion
        toast.success(
          "Se ha dado de baja su cuenta de usuario y se ha cerrado su sesión."
        );
        history.push("/logout");
      } else {
        //solo dar de baja y regresar a usuario
        toast.success("Se ha dado de baja la cuenta de usuario exitosamente.");
        history.push("/usuarios");
      }
    })
    .catch((error) => {
      toast.error(
        "Ha ocurrido un error al intentar dar de baja al usuario, por favor intenten nuevamente."
      );
    });
};
