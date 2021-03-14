const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTE':
      return {
        ...state,
        notes: action.payload,
      };

    case 'SET_ACTIVE_INDEX':
      return {
        ...state,
        activeIndex: action.payload,
      };

    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };

    case 'EDIT_NOTE':
      const updatedNote = action.payload;

      const updatedNotes = state.notes.map((note) => {
        if (note._id === updatedNote._id) {
          return updatedNote;
        }
        return note;
      });

      return {
        ...state,
        notes: updatedNotes,
      };

    default:
      return state;
  }
};

export default AppReducer;
