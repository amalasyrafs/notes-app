import React, { useContext, useEffect } from 'react';
import CreateNote from './createNote';
import SearchBar from './search-bar';
import { GlobalContext } from './GlobalState';
import { Trash } from 'heroicons-react';
import EditNote from './editNote';

const NoteList = () => {
  const {
    notes,
    fetchNotes,
    activeIndex,
    setActiveIndex,
    deleteNote,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteSingleNote = async (id) => {
    try {
      await fetch(`api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(id);
      deleteNote(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClick = (index) => {
    setActiveIndex(index);
    // console.log(activeIndex);
  };

  return (
    <>
      <CreateNote />
      {/* <SearchBar /> */}

      <div className='container'>
        <div className='grid grid-cols-12 mt-6'>
          <div className='bg-green-900 min-h-screen col-span-4 rounded'>
            <ul>
              {notes.map((note) => {
                const className =
                  'note-list text-white inline-flex block flex-row items-center mt-4 '; // to add active class or not
                const noteLabelClass = 'rounded-full px-4 mx-4 p-1 rounded '; // add bg-color and text-color to this
                return (
                  <li
                    key={note._id}
                    onClick={() => handleOnClick(note._id)}
                    className={
                      activeIndex === note._id
                        ? className + 'active'
                        : className
                    }
                  >
                    <h6 className='ml-12'>{note.title}</h6>
                    <span
                      className={
                        note.label === 'Important'
                          ? noteLabelClass + 'bg-blue-900 text-white'
                          : note.label === 'Work'
                          ? noteLabelClass + 'bg-red-900 text-white'
                          : note.label === 'Personal'
                          ? noteLabelClass + 'bg-yellow-400 text-white'
                          : ''
                      }
                    >
                      {note.label}
                    </span>
                    <EditNote activeIndex={activeIndex} />
                    <button
                      onClick={() => deleteNote(note._id)}
                      // onClick={() => deleteSingleNote(note._id)} // for use when connected to the database
                      className='notetools-button'
                    >
                      <Trash />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='bg-red-900 min-h-screen text-center col-span-8 rounded'>
            {notes
              .filter((note) => note._id === activeIndex)
              .map((note) => {
                return (
                  <div key={note._id}>
                    <h1>{note.title}</h1>
                    <p>{note.body}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteList;
