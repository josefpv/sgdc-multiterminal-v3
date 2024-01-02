import http from "./httpService";
import config from "./../../config.json";

export function getErrores() {
  const url = config.endPoints.erroresDetencion;
  return http.get(url);
}

export default {
  getErrores,
};
