import {
  SET_LOADING,
  IS_APP_LOCKED,
  WAS_USER_NOTIFIED,
  RESET_GLOBAL,
} from "./../actions/types";

const INITIAL_STATE = {
  isAppLocked: false,
  loading: true,
  wasNotified: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case IS_APP_LOCKED:
      return {
        ...state,
        isAppLocked: action.payload,
      };
    case WAS_USER_NOTIFIED:
      return {
        ...state,
        wasNotified: action.payload,
      };
    case RESET_GLOBAL:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
