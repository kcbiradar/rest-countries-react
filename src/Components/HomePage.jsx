import { useState, useEffect } from "react";

import CountryCard from "./CountryCard";

import Navbar from "./Navbar";

import SearchBar from "./SearchBar";

const API_URL = `https://restcountries.com/v3.1/all`;

function HomePage() {
  const [data, setData] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [selectContinent, setSelectContinent] = useState("");

  const [selectPopulation, setPopulation] = useState("");

  const [selectSubregion, setSubregion] = useState("");

  const [selectArea, setArea] = useState("");

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

  if (selectArea === "increasingOrder") {
    filterItems.sort(
      (countryfirst, countrySecond) =>
        parseInt(countryfirst.area) - parseInt(countrySecond.area)
    );
  } else if (selectArea === "decreasingOrder") {
    filterItems.sort(
      (countryfirst, countrySecond) =>
        parseInt(countrySecond.area) - parseInt(countryfirst.area)
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

  function handleArea(selectedArea) {
    setArea(selectedArea);
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
          selectArea={selectArea}
          selectPopulation={selectPopulation}
          handleArea={handleArea}
        />
      </div>
      <div className="displayCountries">
        {filterItems.length <= 0 ? (
          <h3>Data is Loading</h3>
        ) : (
          filterItems.map((each_country) => {
            return (
              <CountryCard key={each_country.cca3} country={each_country} />
            );
          })
        )}
      </div>
    </>
  );
}

export default HomePage;
