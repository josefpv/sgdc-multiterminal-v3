import { combineReducers } from "redux";
//reducers
import globalReducer from "./globalReducer";
import authReducer from "./authReducer";
import busesReducer from "./busesReducer";
import cargasReducer from "./cargasReducer";
import usuariosReducer from "./usuariosReducer";
import cambiaEstadosReducer from "./cambiaEstadosReducer";
import historialReducer from "./historialReducer";
import asignadorReducer from "./asignadorReducer";
import chargerSettingsReducer from "./chargerSettingsReducer";
import derivacionReducer from "./derivacionReducer";
import preventivaReducer from "./preventivaReducer";

export default combineReducers({
  global: globalReducer,
  auth: authReducer,
  buses: busesReducer,
  cargas: cargasReducer,
  usuarios: usuariosReducer,
  cambiaEstados: cambiaEstadosReducer,
  historial: historialReducer,
  asignadorTurnos: asignadorReducer,
  chargerSettings: chargerSettingsReducer,
  derivacion: derivacionReducer,
  preventiva: preventivaReducer,
});
