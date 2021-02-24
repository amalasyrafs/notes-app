import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='container mx-auto my-5'>
      <div>
        <form onSubmit={getSearch} className='search-form'>
          <input
            className='search-bar min-w-max w-5/6 bg-red-900 rounded text-center'
            type='text'
            value={search}
            onChange={updateSearch}
            placeholder='Find your notes here'
          />
          <button
            className='search-button bg-blue-900 rounded rounded-full w-1/6 text-white'
            type='submit'
          >
            Search Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
