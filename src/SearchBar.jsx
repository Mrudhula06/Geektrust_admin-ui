import React from 'react';

const SearchBar = ({ handleSearch, searchQuery }) => {
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
