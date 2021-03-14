import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalState';
import { Pencil } from 'heroicons-react';

const EditNote = () => {
  const [showModal, setShowModal] = useState(false);
  const { notes, editNote, activeIndex } = useContext(GlobalContext);
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    const selectNote = notes.find((note) => note._id === activeIndex);
    // console.log(selectNote);
    setSelectedNote(selectNote);
    // console.log(selectNote);
  }, [activeIndex, notes]);

  const editExistNote = async (selectedNote) => {
    try {
      const id = selectedNote._id;
      const res = await fetch(`api/notes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedNote),
      });
      const data = await res.json();
      editNote(data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    editNote(selectedNote);
    // editExistNote(selectedNote); // for use when connected to the database
  };

  const handleOnChange = (userKey, value) =>
    setSelectedNote({ ...selectedNote, [userKey]: value });

  return (
    <>
      <button onClick={() => setShowModal(true)} className='notetools-button'>
        <Pencil />
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
                    Edit a Note
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
                              value={selectedNote.title}
                              onChange={(e) =>
                                handleOnChange('title', e.target.value)
                              }
                              className='mt-3 mb-5 text-black block w-full shadow-sm sm:text-sm rounded-md '
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
                              value={selectedNote.author}
                              onChange={(e) =>
                                handleOnChange('author', e.target.value)
                              }
                              className='mt-3 mb-5 text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
                              value={selectedNote.body}
                              onChange={(e) =>
                                handleOnChange('body', e.target.value)
                              }
                              className='mt-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black'
                              placeholder='Write your note here'
                            />
                          </div>
                          <div className='col-span-12'>
                            <p className='mt-5 mb-2 text-gray-700'>
                              Label Tag:{' '}
                            </p>
                            <div className='mx-auto max-w-sm flex flex-wrap justify-center'>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Important'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) =>
                                    handleOnChange('label', e.target.value)
                                  }
                                />
                                <label
                                  htmlFor='important-label'
                                  className='flex items-center cursor-pointer text-gray-700 ml-2'
                                >
                                  Important
                                </label>
                              </div>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Work'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) =>
                                    handleOnChange('label', e.target.value)
                                  }
                                />
                                <label
                                  htmlFor='work-label'
                                  className='flex items-center cursor-pointer text-gray-700 ml-2'
                                >
                                  Work
                                </label>
                              </div>
                              <div className='flex items-center mr-4 mb-4'>
                                <input
                                  value='Personal'
                                  type='radio'
                                  name='note-label'
                                  onChange={(e) =>
                                    handleOnChange('label', e.target.value)
                                  }
                                />
                                <label
                                  htmlFor='personal-label'
                                  className='flex items-center cursor-pointer text-gray-700 ml-2'
                                >
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
                        Save Changes
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

export default EditNote;
