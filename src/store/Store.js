import { configureStore } from "@reduxjs/toolkit";

// Minimal initial state
const initialState = {
  showJournalModal: false,
  analyseData: null,
  journalData: [],
  isAuthenticated: false
};

// Minimal reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_JOURNAL_MODAL":
      return { ...state, showJournalModal: !state.showJournalModal };
    case "SET_JOURNAL_MODAL":
      return { ...state, showJournalModal: action.payload };
    case "SET_ANALYSE_DATA":
      return {...state, analyseData: action.payload};
    case "SET_JOURNAL_DATA":
      return {...state, journalData: action.payload};
    case "SET_IS_AUTHENTICATED":
      return {...state, isAuthenticated: action.payload};
    default:
      return state;
  }
};

const store = configureStore({
  reducer: Reducer,
});

export default store;
