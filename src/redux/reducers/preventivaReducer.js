import {
  CLEAR_PREVENTIVA,
  FETCH_PREVENTIVA,
  SAVE_PREVENTIVA,
} from "../actions/types";

const INITIAL_STATE = {
  preventivaList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PREVENTIVA:
      return state;
    case FETCH_PREVENTIVA:
      return {
        ...state,
        preventivaList: action.payload,
      };
    case CLEAR_PREVENTIVA:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
