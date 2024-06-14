import { useState, useEffect } from "react";

import CountryCard from "./Components/CountryCard";

import Navbar from "./Components/Navbar";

import SearchBar from "./Components/SearchBar";

function App() {
  const API_URL = `https://restcountries.com/v3.1/all`;

  const [data, setData] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [selectContinent, setSelectContinent] = useState("");

  useEffect(() => {
    async function fetchApi(API_URL) {
      try {
        const promise = await fetch(API_URL);
        const json = await promise.json();
        setData(json);
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi(API_URL);
  }, []);

  const filterItems = data.filter((country) => {
    if (selectContinent === "" || country.region === selectContinent) {
      return country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase());
    }
    return false;
  });

  const continents = data.reduce((acc, current) => {
    if (!acc.includes(current.region)) {
      acc.push(current.region);
    }
    return acc;
  }, []);

  function searchHandle(searchInput) {
    setSearchCountry(searchInput);
  }

  function selectHandle(selectContinent) {
    setSelectContinent(selectContinent);
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <SearchBar
          searchHandle={searchHandle}
          selectHandle={selectHandle}
          continents={continents}
        />
      </div>
      <div className="displayCountries">
        {filterItems.map((each_country) => {
          return <CountryCard key={each_country.cca3} country={each_country} />;
        })}
      </div>
    </>
  );
}

export default App;
