import {
  FETCH_HISTORIAL,
  FETCH_HISTORIAL_FILTER,
  SET_CURRENT_PAGE_HISTORIAL,
  SET_FILTER_MARQUESINA,
  SET_SEARCH_QUERY_HISTORIAL,
  SET_SORT_COLUMN_HISTORIAL,
  UPDATE_SOH,
} from "./../actions/types";

const INITIAL_STATE = {
  historial: [],
  marquesinas: [
    {
      _id: 1,
      label: "A",
      value: "a",
    },
    {
      _id: 2,
      label: "B",
      value: "b",
    },
    {
      _id: 3,
      label: "C",
      value: "c",
    },
    {
      _id: 4,
      label: "D",
      value: "d",
    },
  ],
  currentPage: 1,
  pageSize: 50000,
  searchQuery: "",
  filterMarquesina: "",
  filterDate: "",
  sortColumn: { parth: "ppu", order: "asc" },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HISTORIAL:
      return {
        ...state,
        historial: action.payload,
      };
    case FETCH_HISTORIAL_FILTER:
      return {
        ...state,
        historial: action.payload,
      };
    case SET_CURRENT_PAGE_HISTORIAL:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_FILTER_MARQUESINA:
      return {
        ...state,
        filterMarquesina: action.payload,
      };
    case SET_SORT_COLUMN_HISTORIAL:
      return {
        ...state,
        sortColumn: action.payload,
      };
    case SET_SEARCH_QUERY_HISTORIAL:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case UPDATE_SOH:
      return state;
    default:
      return state;
  }
};
