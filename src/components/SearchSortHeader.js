// src/components/SearchSortHeader.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faSort } from '@fortawesome/free-solid-svg-icons';

const SearchSortHeader = ({ searchQuery, setSearchQuery, handleSearch, handleClearSearch, handleSort }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <button onClick={handleClearSearch}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <button onClick={() => handleSort('name')}>
        <FontAwesomeIcon icon={faSort} />
      </button>
      {/* Add other sorting buttons */}
    </div>
  );
};

export default SearchSortHeader;
