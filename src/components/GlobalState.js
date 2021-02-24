import React, { createContext, useReducer } from 'react';
import Notes from '../database/notes';
import AppReducer from './AppReducer';

const initialState = {
  notes: Notes,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addNote(notes) {
    dispatch({
      type: 'ADD_NOTE',
      payload: notes,
    });
  }

  function deleteNote(noteId) {
    dispatch({
      type: 'DELETE_NOTE',
      payload: noteId,
    });
  }

  function editNote(notes) {
    dispatch({
      type: 'EDIT_NOTE',
      payload: notes,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        notes: state.notes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
