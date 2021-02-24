import React, { useContext, useState } from 'react';
import { GlobalContext } from './GlobalState';
import { Trash } from 'heroicons-react';
import EditNote from './editNote';

const NoteList = () => {
  const { notes, deleteNote } = useContext(GlobalContext);
  const [activeIndex, setActiveIndex] = useState(1);

  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  // console.log(notes);

  return (
    <div className='container'>
      <div className='grid grid-cols-12'>
        <div className='bg-green-900 min-h-screen col-span-4 rounded'>
          <ul>
            {notes.map((note) => {
              const className =
                'note-list text-white inline-flex flex-row items-center mt-4 '; // to add active class or not
              const noteLabelClass = 'rounded-full px-4 mx-4 p-1 rounded '; // add bg-color and text-color to this
              return (
                <li
                  key={note.noteId}
                  onClick={() => handleOnClick(note.noteId)}
                  className={
                    activeIndex === note.noteId
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
                    onClick={() => deleteNote(note.noteId)}
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
            .filter((note) => note.noteId === activeIndex)
            .map((note) => {
              return (
                <div key={note.noteId}>
                  <h1>{note.title}</h1>
                  <p>{note.body}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
