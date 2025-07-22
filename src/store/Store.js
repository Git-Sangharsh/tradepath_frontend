import { configureStore } from "@reduxjs/toolkit";

// Minimal initial state
const initialState = {
  showJournalModal: false,
};

// Minimal reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_JOURNAL_MODAL":
      return { ...state, showJournalModal: !state.showJournalModal };
    case "SET_JOURNAL_MODAL":
      return { ...state, showJournalModal: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: Reducer,
});

export default store;
