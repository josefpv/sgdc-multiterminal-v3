import {
  CLOSE_MODAL_DATA_SETTINGS,
  COMMIT_CHARGER_SETTING,
  SET_CHARGER_SETTINGS_MODAL,
  SET_MODAL_SETTING_LOADING,
  UPDATE_CHARGER_SETTING,
} from "./../actions/types";

const INITIAL_STATE = {
  intervalId: 0,
  isLoadingModal: false,
  modalData: {
    data: {},
    showModal: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHARGER_SETTINGS_MODAL:
      return {
        ...state,
        modalData: action.payload,
      };
    case UPDATE_CHARGER_SETTING:
      return {
        ...state,
        modalData: action.payload,
      };
    case CLOSE_MODAL_DATA_SETTINGS:
      return {
        ...state,
        modalData: INITIAL_STATE,
      };
    case COMMIT_CHARGER_SETTING:
      return state;
    case SET_MODAL_SETTING_LOADING:
      return {
        ...state,
        isLoadingModal: action.payload,
      };
    default:
      return state;
  }
};
