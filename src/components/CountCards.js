// src/components/CountCards.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

const CountCards = ({ data }) => {
  const totalResults = data.length;
  const totalDroids = data.filter((person) => person.species.includes('Droid')).length;
  const totalHumans = data.filter((person) => person.species.includes('Human')).length;

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faWarning} />
        <p>Total Results: {totalResults}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faWarning} />
        <p>Total Droids: {totalDroids}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faWarning} />
        <p>Total Humans: {totalHumans}</p>
      </div>
    </div>
  );
};

export default CountCards;
