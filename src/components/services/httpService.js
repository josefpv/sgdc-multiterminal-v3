import axios from "axios";
import Raven from "raven-js";
import { toast } from "react-toastify";

//fisrt argument => positive requests
//second argument => negative requests
axios.interceptors.request.use(function (config) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  config.headers.authorization = `Bearer ${token}`;

  //para detectar cuando este mala la red
  if (
    config.url.split("/")[3] === "marquesinas" &&
    config.url.split("/")[4] === "estacion"
  ) {
    config.metadata = { startTime: new Date() };
  }

  config.url = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}${config.url}`;

  return config;
});

axios.interceptors.response.use(
  function (config) {
    //para detectar cuando este mala la red
    if (
      config.config.url.split("/")[5] === "marquesinas" &&
      config.config.url.split("/")[6] === "estacion"
    ) {
      config.config.metadata.endTime = new Date();
      config.duration =
        config.config.metadata.endTime - config.config.metadata.startTime;
    }
    return config;
  },
  (error) => {
    console.log("ERROR: ", error);
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    //console.log(expectedError);
    if (expectedError) {
      //console.log(error);
      //Raven.captureException(error);
      toast.error(error.response.data.error);
    }

    //401 Not authorized : redirecting to login page
    if (error.response.status === 401 || error.response.status === 403) {
      window.localStorage.clear();
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

/* function setJwt(token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
} */

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
