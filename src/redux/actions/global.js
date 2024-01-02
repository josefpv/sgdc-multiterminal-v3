import { toast } from "react-toastify";
import {
  SET_LOADING,
  IS_APP_LOCKED,
  WAS_USER_NOTIFIED,
  RESET_GLOBAL,
} from "./../actions/types";

export const setUnloading = () => {
  return {
    type: SET_LOADING,
    payload: false,
  };
};
export const setLoading = () => {
  return {
    type: SET_LOADING,
    payload: true,
  };
};

export const isAppLocked = () => (dispatch, getState) => {
  var today = new Date();
  var isLocked = false;
  var minutesLeft = 60;
  /* 
  const currentTime = [
    today.getHours(),
    today.getMinutes(),
    today.getSeconds(),
  ];

  console.log("HORA ACTUAL: ", currentTime);
  //if (today.getHours() === 17) {
  if (today.getHours() === 20) {
    minutesLeft = 30 - today.getMinutes();
  }
  //if (!getState().global.wasNotified && today.getHours() === 17) {
  if (!getState().global.wasNotified && today.getHours() === 20) {
    toast.info(
      `La acción de carga se deshabilitará dentro de ${minutesLeft} minutos, por favor considere ese tiempo para gestionar las cargas.`
    );
    dispatch(wasUserNotified(true));
  }
  //if (currentTime[0] >= 18 && currentTime[0] < 23) {
  // bloquea app entre las 20:30 y 21:30
  if (currentTime[0] >= 20 && currentTime[0] <= 21) {
    if (currentTime[0] == 20 && currentTime[1] < 30) {
      isLocked = false;
    } else if (currentTime[0] == 21 && currentTime[1] > 30) {
      isLocked = false;
    } else {
      isLocked = true;
    }
  } else {
    isLocked = false;
  }
 */
  dispatch({
    type: IS_APP_LOCKED,
    payload: isLocked,
  });
};

export const wasUserNotified = (wasNotified) => {
  return {
    type: WAS_USER_NOTIFIED,
    payload: wasNotified,
  };
};

export const resetGlobal = () => {
  return {
    type: RESET_GLOBAL,
  };
};
