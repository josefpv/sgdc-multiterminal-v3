import {
  FETCH_USUARIOS,
  FETCH_USER,
  UPDATE_USERS_MANUALLY,
  TOGGLE_USER_STATE,
  SET_CURRENT_PAGE,
  SET_PAGE_SIZE,
  SET_SEARCH_QUERY,
  SET_SORT_COLUMN,
  RESET_VIEW_USERS,
  FETCH_USERS_PROFILES,
  SET_SELECTED_PROFILE,
  UPDATE_USER,
  CREATE_NEW_USER,
  REQUEST_NEW_USER,
  FETCH_PENDDING_USER,
  ACCEPT_DECLINE_USER,
  MAKE_USER_INVISIBLE,
  FETCH_TERMINALES,
} from "./../actions/types";

const INITIAL_STATE = {
  usuarios: [],
  usuario: { nombre: "", usuario: "" },
  currentPage: 1,
  pageSize: 10,
  searchQuery: "",
  sortColumn: { path: "nombre", order: "asc" },
  perfilSelected: 3,
  perfiles: [],
  penddingUsers: [],
  terminales: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_VIEW_USERS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case FETCH_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        usuario: action.payload,
      };
    case TOGGLE_USER_STATE: {
      return {
        ...state,
        usuarios: action.payload,
      };
    }
    case UPDATE_USER:
      return {
        ...state,
      };
    case UPDATE_USERS_MANUALLY:
      return {
        ...state,
        usuarios: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case SET_SORT_COLUMN:
      return {
        ...state,
        sortColumn: action.payload,
      };
    case SET_SELECTED_PROFILE:
      return {
        ...state,
        perfilSelected: action.payload,
      };
    case FETCH_USERS_PROFILES:
      return {
        ...state,
        perfiles: action.payload,
      };
    case FETCH_PENDDING_USER:
      return {
        ...state,
        penddingUsers: action.payload,
      };
    case ACCEPT_DECLINE_USER:
      return {
        ...state,
        penddingUsers: action.payload,
      };
    case MAKE_USER_INVISIBLE:
      return {
        ...state,
      };
    case CREATE_NEW_USER:
      return {
        ...state,
      };
    case REQUEST_NEW_USER:
      return {
        ...state,
      };
    case FETCH_TERMINALES:
      return {
        ...state,
        terminales: action.payload,
      };
    default:
      return state;
  }
};
