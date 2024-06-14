import { useState, useEffect } from "react";

import CountryCard from "./Components/CountryCard";

import Navbar from "./Components/Navbar";

import SearchBar from "./Components/SearchBar";

function App() {
  const API_URL = `https://restcountries.com/v3.1/all`;

  const [data, setData] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [selectContinent, setSelectContinent] = useState("");

  const [selectPopulation, setPopulation] = useState("");

  const [selectSubregion, setSubregion] = useState("");

  useEffect(() => {
    async function fetchApi(API_URL) {
      try {
        const promise = await fetch(API_URL);
        const json = await promise.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi(API_URL);
  }, []);

  const filterItems = data.filter((country) => {
    if (selectContinent === "" || country.region === selectContinent) {
      if (selectSubregion === "" || country.subregion === selectSubregion) {
        return country.name.common
          .toLowerCase()
          .includes(searchCountry.toLowerCase());
      }
    }
    return false;
  });

  if (selectPopulation === "increasingOrder") {
    filterItems.sort(
      (countryfirst, countrySecond) =>
        parseInt(countryfirst.population) - parseInt(countrySecond.population)
    );
  } else if (selectPopulation === "decreasingOrder") {
    filterItems.sort(
      (countryfirst, countrySecond) =>
        parseInt(countrySecond.population) - parseInt(countryfirst.population)
    );
  }

  const continents = data.reduce((acc, current) => {
    if (!acc.includes(current.region)) {
      acc.push(current.region);
    }
    return acc;
  }, []);

  function searchHandle(searchedInput) {
    setSearchCountry(searchedInput);
  }

  function selectHandle(selectedContinent) {
    setSelectContinent(selectedContinent);
    setSubregion("");
  }

  function handlePopulation(selectedPopulation) {
    setPopulation(selectedPopulation);
  }

  function handleSubregion(selectedSubregion) {
    setSubregion(selectedSubregion);
  }

  const subregions = data.reduce((acc, current) => {
    if (selectContinent === current.region) {
      if (current.subregion && !acc.includes(current.subregion)) {
        acc.push(current.subregion);
      }
    }
    return acc;
  }, []);

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
          subregions={subregions}
          handlePopulation={handlePopulation}
          handleSubregion={handleSubregion}
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
