import { SHOW_RESERVA } from "./../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_RESERVA:
      return {
        ...state,
      };
    default:
      return state;
  }
};
