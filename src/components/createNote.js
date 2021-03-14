import React, { useState, useContext } from 'react';
import { GlobalContext } from './GlobalState';
import { PlusCircle } from 'heroicons-react';

const CreateNote = () => {
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [noteLabel, setNoteLabel] = useState('');
  const { addNote } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    setNoteTitle('');
    setNoteAuthor('');
    setNoteBody('');
    setNoteLabel('');
    const newNote = {
      title: noteTitle,
      author: noteAuthor,
      body: noteBody,
      label: noteLabel,
    };
    // console.log(newNote);
    addNote(newNote);
    // addNewNote(newNote); // for use when connected to the database
  };

  const addNewNote = async (newNote) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      const data = await res.json();
      addNote(data);
      // fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className='createNoteButton flex -mt-10 mr-10 p-3 w-32 bg-blue-900 text-white justify-center rounded rounded-full float-right'
        type='button'
        style={{ transition: 'all .15s ease' }}
        onClick={() => setShowModal(true)}
      >
        <PlusCircle /> Note
      </button>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col bg-gray-100 outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-2xl font-bold text-indigo-900 uppercase'>
                    Add a New Note
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-indigo-900 float-right text-2xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <form onSubmit={onSubmit}>
                    <div className='shadow overflow-hidden sm:rounded-md'>
                      <div className='px-4 py-5 sm:p-6'>
                        <div className='grid grid-cols-12'>
                          <div className='col-span-12'>
                            <label
                              htmlFor='note-title'
                              className='block text-sm font-medium text-gray-700 w-max'
                            >
                              Note Title
                            </label>
                            <input
                              type='text'
                              name='note-title'
                              value={noteTitle}
                              onChange={(e) => setNoteTitle(e.target.value)}
                              className='mt-3 mb-5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md w-auto'
                              placeholder='Enter Title here'
                            />
                          </div>
                          <div className='col-span-12'>
                            <label
                              htmlFor='note-author'
                              className='block text-sm font-medium text-gray-700 w-max'
                            >
                              Author
                            </label>
                            <input
                              type='text'
                              name='note-author'
                              value={noteAuthor}
                              onChange={(e) => setNoteAuthor(e.target.value)}
                              className='mt-3 mb-5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md w-auto'
                              placeholder='Enter Your Name'
                            />
                          </div>
                          <div className='col-span-12'>
                            <label
                              htmlFor='note-body'
                              className='block text-sm font-medium text-gray-700 w-max'
                            >
                              Enter your note:
                            </label>
                            <textarea
                              rows='8'
                              cols='80'
                              name='note-body'
                              value={noteBody}
                              onChange={(e) => setNoteBody(e.target.value)}
                              className='mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md w-auto'
                              placeholder='Write your note here'
                            />
                          </div>
                          <div className='col-span-12'>
                            <p className='mt-5 mb-2'>Label Tag: </p>
                            <div className='mx-auto max-w-sm flex flex-wrap justify-center'>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Important'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) => setNoteLabel(e.target.value)}
                                />
                                <label
                                  htmlFor='important-label'
                                  className='flex items-center cursor-pointer'
                                >
                                  <span className='w-4 h-4'></span>
                                  Important
                                </label>
                              </div>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Work'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) => setNoteLabel(e.target.value)}
                                />
                                <label
                                  htmlFor='work-label'
                                  className='flex items-center cursor-pointer'
                                >
                                  <span className='w-4 h-4'></span>
                                  Work
                                </label>
                              </div>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Personal'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) => setNoteLabel(e.target.value)}
                                />
                                <label
                                  htmlFor='personal-label'
                                  className='flex items-center cursor-pointer'
                                >
                                  <span className='w-4 h-4'></span>
                                  Personal
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
                      <button
                        className='bg-indigo-900 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                        type='submit'
                        style={{ transition: 'all .15s ease' }}
                      >
                        Add Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
};

export default CreateNote;
