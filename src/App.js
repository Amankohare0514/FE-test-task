import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faUserCircle,
  faQuestion,
  faExclamationCircle,
  faSpinner,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
const TableRow = ({ person }) => {
  let icon;
  if (person.species && person.species.includes("droid")) {
    icon = faAddressBook;
  } else if (person.species && person.species.includes("human")) {
    icon = faUserCircle;
  } else {
    icon = faQuestion;
  }

  return (
    <tr className="border">
      <td className="p-3">
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      </td>
      <td>{person.name}</td>
      <td>{person.height}</td>
      <td>{person.mass}</td>
      <td>{person.hair_color}</td>
      <td>{person.skin_color}</td>
      <td>{person.eye_color}</td>
      <td>{person.birth_year}</td>
      <td>{person.gender}</td>
      <td>{person.homeworld}</td>
      <td>{person.films.join(", ")}</td>
      <td>{person.species.join(", ")}</td>
      <td>{person.url}</td>
    </tr>
  );
};
const Table = ({ data, loading, error }) => {
  return (
    <div className="table-container mt-8">
      {loading ? (
        <div className="loading text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-blue-500" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : error ? (
        <div className="error text-center">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-4xl text-red-500" />
          <p className="mt-2">Something went wrong. Please try again later.</p>
        </div>
      ) : data && data.results.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair Color</th>
              <th>Skin Color</th>
              <th>Eye Color</th>
              <th>Birth Year</th>
              <th>Gender</th>
              <th>Homeworld</th>
              <th>Films</th>
              <th>Species</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((person) => (
              <TableRow key={person.name} person={person} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty text-center">
          <FontAwesomeIcon icon={faWarning} className="text-4xl text-yellow-500" />
          <p className="mt-2">No results found.</p>
        </div>
      )}
    </div>
  );
};


const Pagination = ({ data, setPage }) => {
  return (
    <div className="pagination mt-4 flex justify-center">
      {data && data.previous && (
        <button
          onClick={() => setPage(data.previous)}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700 focus:outline-none"
        >
          Previous
        </button>
      )}
      {data && data.next && (
        <button
          onClick={() => setPage(data.next)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      )}
    </div>
  );
};


const Search = ({ query, setQuery, setPage }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(`https://swapi.dev/api/people/?search=${query}`);
  };

  return (
    <div className="search mt-4 text-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by name..."
          className="p-2 border border-gray-300 rounded focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};


const Cards = ({ data }) => {
  const [droidCount, setDroidCount] = useState(0);
  const [humanCount, setHumanCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    setDroidCount(0);
    setHumanCount(0);
    setOtherCount(0);

    if (data && data.results) {
      for (let person of data.results) {
        if (person.species && person.species.includes("droid")) {
          setDroidCount((prev) => prev + 1);
        } else if (person.species && person.species.includes("human")) {
          setHumanCount((prev) => prev + 1);
        } else {
          setOtherCount((prev) => prev + 1);
        }
      }
    }
  }, [data]);

  return (
    <div className="cards mt-8 flex justify-center">
      <div className="card p-4 border border-gray-300 rounded mr-2">
        <p className="text-gray-600">Total Results</p>
        <h3 className="text-2xl font-bold">{data && data.count}</h3>
      </div>
      <div className="card p-4 border border-gray-300 rounded mr-2">
        <p className="text-gray-600">Total Droids</p>
        <h3 className="text-2xl font-bold">{droidCount}</h3>
      </div>
      <div className="card p-4 border border-gray-300 rounded mr-2">
        <p className="text-gray-600">Total Humans</p>
        <h3 className="text-2xl font-bold">{humanCount}</h3>
      </div>
      <div className="card p-4 border border-gray-300 rounded">
        <p className="text-gray-600">Total Others</p>
        <h3 className="text-2xl font-bold">{otherCount}</h3>
      </div>
    </div>
  );
};


const App = () => {
  const [page, setPage] = useState("https://swapi.dev/api/people/");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setData(null);

    axios
      .get(page)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="app container mx-12 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Star Wars People</h1>
      <Search query={query} setQuery={setQuery} setPage={setPage} />
      <Cards data={data} />
      <Table data={data} loading={loading} error={error} />
      <Pagination data={data} setPage={setPage} />
    </div>
  );
};

export default App;