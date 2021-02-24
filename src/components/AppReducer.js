export default (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.noteId !== action.payload),
      };

    case 'EDIT_NOTE':
      const updatedNote = action.payload;

      const updatedNotes = state.notes.map((note) => {
        if (note.noteId === updatedNote.noteId) {
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
