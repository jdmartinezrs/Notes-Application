import React, { useState } from 'react';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative bg-zinc-700/50 rounded-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by the keyword..."
          className="w-full bg-transparent text-gray-200 placeholder-gray-400 px-6 py-3 pr-12 focus:outline-none text-lg rounded-full"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <img src="/img/close.png" alt="Ícono" className='w-5 h-5' />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;