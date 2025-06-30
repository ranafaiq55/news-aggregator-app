import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (q: string) => void }> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search articles..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border rounded"
      />
      <button onClick={() => onSearch(input)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
