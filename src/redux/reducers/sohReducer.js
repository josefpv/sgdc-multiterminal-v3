import { FETCH_BUSES_SOH } from "./../actions/types";

const INITIAL_STATE = {
  busesList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BUSES_SOH:
      return {
        ...state,
        busesList: action.payload,
      };
    default:
      return state;
  }
};
