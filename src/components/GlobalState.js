import React, { createContext, useReducer } from 'react';
// import Notes from '../database/notes';
import AppReducer from './AppReducer';

const initialState = {
  notes: [],
  activeIndex: 0,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      // console.log(data);
      setNote(data);
      setActiveIndex(data[0]._id);
    } catch (err) {
      console.error(err);
    }
  };

  function setNote(notes) {
    dispatch({
      type: 'SET_NOTE',
      payload: notes,
    });
  }

  function setActiveIndex(activeIndex) {
    dispatch({
      type: 'SET_ACTIVE_INDEX',
      payload: activeIndex,
    });
  }

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
        activeIndex: state.activeIndex,
        addNote,
        deleteNote,
        editNote,
        setNote,
        fetchNotes,
        setActiveIndex,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
