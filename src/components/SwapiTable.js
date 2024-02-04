// src/components/SwapiTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSpinner, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SwapiTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://swapi.dev/api/people/');
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field) => {
    // Implement sorting logic here
    // Update sortedField state
  };

  const handleSearch = async () => {
    // Implement search logic here
    try {
      setLoading(true);
      const response = await axios.get(`https://swapi.dev/api/people/?search=${searchQuery}`);
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error searching data:', error);
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    // Reset sorting and fetch data again
  };

  return (
    <div>
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
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            {/* Add other table headers with sorting */}
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.name}>
              <td>{/* Render person data here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </div>
  );
};

export default SwapiTable;
