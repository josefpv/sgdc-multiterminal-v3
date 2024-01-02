import http from "./httpService";
import config from "./../../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = "token";
const nombreKey = "username";

//importing history to redirect
import history from "./../../history";

//http.setJwt(getUsuario());

/*
=== Para iniciar sesión ===
Se envía usuario y password, y obtendría un token
*/
/*
NO USADO 
export async function login(usuario, password) {
  const datosUsuario = {
    usuario: usuario,
    password: password,
  };

  let completado = false;
  let isAdmin = false;
  let mensaje = "";
  const urlLogin = `${config.global}${config.endPoints.login}`;
  const response = await http.post(urlLogin, datosUsuario);

  const { data } = response;

  if (data.completado) {
    completado = data.completado;
    const username = data.nombre;
    const token = data.token;
    localStorage.setItem(nombreKey, username);
    localStorage.setItem(tokenKey, token);

    if (data.completado && data.perfil.id === 1) isAdmin = true;
  } else {
    mensaje = data.mensaje;
  }
  //rechazar sesion si es usuario automatico
  if (data.completado && data.perfil.id === 6)
    return {
      completado: false,
      mensaje: "Ingreso no permitido para usuarios automaticos.",
      isAdmin: false,
    };
  return {
    completado: completado,
    mensaje: mensaje,
    isAdmin: isAdmin,
  };
}


export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(nombreKey);
  localStorage.removeItem("marquesina");
  localStorage.removeItem("fila");
  localStorage.removeItem("puesto");
  localStorage.removeItem("ppu");
  localStorage.removeItem("soc");
  return {
    completado: true,
    mensaje: "Se ha cerrado sesión",
  };
  
}
*/
/*
export function getUsuario() {
  const username = localStorage.getItem(nombreKey);
  const token = localStorage.getItem(tokenKey);
  const userInfo = token ? jwtDecode(token) : null;

  return {
    name: username,
    token: token,
    userInfo: userInfo,
  };
}

export function getUsuarioID() {
  const token = localStorage.getItem(tokenKey);
  const userInfo = token ? jwtDecode(token) : null;
  return userInfo.id;
}

//ya no se usa
export function redirectLoggedIn() {
  const { token, userInfo } = getUsuario();
  let sitioRedireccion = "";
  //redireccionar segun tipo de usuario
  if (token) {
    const { perfilId: idUsuario } = userInfo;

    switch (idUsuario) {
      case 1:
        //administrador
        sitioRedireccion = "/seleccion";
        break;
      case 2:
        //supervior
        sitioRedireccion = "/seleccion";
        break;
      case 3:
        //bombero
        sitioRedireccion = "/cargabombero";
        break;
      case 4:
        //semaforo
        sitioRedireccion = "/seleccion";
        break;
      case 5:
        //movilizador
        sitioRedireccion = "/movilizador";
        break;
      case 6:
        sitioRedireccion = "/";
        break;
      default:
        sitioRedireccion = "/seleccion";
        break;
    }
  }

  window.location = config.rootfolderName + sitioRedireccion;
}
*/

export function redirectLoggedIn_(idUsuario) {
  let goTo = "";
  switch (idUsuario) {
    case 1:
      //administrador
      goTo = "/seleccion";
      break;

    case 2:
      //supervior
      goTo = "/seleccion";
      break;

    case 3:
      //bombero
      goTo = "/cargabombero";
      break;

    case 4:
      //semaforo
      goTo = "/seleccion";
      break;

    case 5:
      //movilizador
      goTo = "/movilizador";
      break;

    case 6:
      goTo = "/";
      break;

    case 7:
      goTo = "/movilizador";
      break;

    default:
      goTo = "/seleccion";
      break;
  }
  return goTo;
  history.push(goTo);
}
/*
export function getAccess(page) {
  const { userInfo } = getUsuario();
  if (!userInfo) {
    return false;
  }
  const { perfilId: idUsuario } = userInfo;
  //administrador
  if (idUsuario === 1 || idUsuario === 2) return true;
  //supervisor
  if (
    idUsuario === 2 &&
    (page === "seleccion" ||
      page === "reservas" ||
      page === "cambiaestados" ||
      page === "movilizador" ||
      page === "profile")
  )
    return true;
  //bombero
  if (idUsuario === 3 && page === "cargabombero") return true;
  if (idUsuario === 3 && page === "seleccion") return true;
  if (idUsuario === 3 && page === "profile") return true;
  if (idUsuario === 3 && page === "historial") return true;
  //semaforo
  if (
    (idUsuario === 4 || idUsuario === 3) &&
    (page === "seleccion" ||
      page === "cambiaestados" ||
      page === "reservas" ||
      page === "profile" ||
      page === "historial")
  )
    return true;

  if (idUsuario === 5 && page === "movilizador") return true;
  if (idUsuario === 5 && page === "profile") return true;

  return false;
}
*/
export default {
  redirectLoggedIn_,
};
