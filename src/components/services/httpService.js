import axios from "axios";
import Raven from "raven-js";
import { toast } from "react-toastify";

//fisrt argument => positive requests
//second argument => negative requests
axios.interceptors.request.use(function (config) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  function (config) {
    //console.log(config.status);
    return config;
  },
  (error) => {
    console.log("ERROR: ", error.response);
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
