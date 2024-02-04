// src/components/SwapiTableRow.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid, faUserCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const SwapiTableRow = ({ person }) => {
  const getIcon = () => {
    if (person.species.includes('Droid')) {
      return <FontAwesomeIcon icon={faAndroid} />;
    } else if (person.species.includes('Human')) {
      return <FontAwesomeIcon icon={faUserCircle} />;
    } else {
      return <FontAwesomeIcon icon={faQuestionCircle} />;
    }
  };

  return (
    <tr>
      <td>{getIcon()} {person.name}</td>
      {/* Render other person data */}
    </tr>
  );
};

export default SwapiTableRow;
