import { useState, useEffect } from "react";

import CountryCard from "./CountryCard";

import Navbar from "./Navbar";

import SearchBar from "./SearchBar";

import ErrorPage from "./ErrorPage";

import { Link } from "react-router-dom";

const API_URL = `https://restcountries.com/v3.1/all`;

function HomePage() {
  const [data, setData] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [selectContinent, setSelectContinent] = useState("");

  const [selectPopulation, setPopulation] = useState("");

  const [selectSubregion, setSubregion] = useState("");

  const [selectArea, setArea] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApi(API_URL) {
      try {
        const promise = await fetch(API_URL);
        if (!promise.ok) {
          throw new Error("Unable to fetch API");
        }
        const json = await promise.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchApi(API_URL);
  }, []);

  let filterItems = [];

  if (data.length > 0) {
    filterItems = data.filter((country) => {
      if (selectContinent === "" || country.region === selectContinent) {
        if (selectSubregion === "" || country.subregion === selectSubregion) {
          return country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase());
        }
      }
      return false;
    });
  }

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

  let continents = [];

  if (data.length > 0) {
    continents = data.reduce((acc, current) => {
      if (!acc.includes(current.region)) {
        acc.push(current.region);
      }
      return acc;
    }, []);
  }

  let subregions = [];

  if (data.length > 0) {
    subregions = data.reduce((acc, current) => {
      if (selectContinent === current.region) {
        if (current.subregion && !acc.includes(current.subregion)) {
          acc.push(current.subregion);
        }
      }
      return acc;
    }, []);
  }

  function searchHandle(searchedInput) {
    setSearchCountry(searchedInput);
  }

  function selectHandle(selectedContinent) {
    setSelectContinent(selectedContinent);
    setSubregion("");
  }

  function handlePopulation(selectedPopulation) {
    setPopulation(selectedPopulation);
    setArea("");
  }

  function handleSubregion(selectedSubregion) {
    setSubregion(selectedSubregion);
  }

  function handleArea(selectedArea) {
    setArea(selectedArea);
    setPopulation("");
  }

  return (
    <>
      {error.length <= 0 ? (
        <div>
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
          <div className="homePage">
            {data.length > 0 ? (
              <div className="displayCountries">
                {filterItems.length <= 0 ? (
                  <h3 className="filterd-data-not-found">
                    No filtered data is available
                  </h3>
                ) : (
                  filterItems.map((each_country) => {
                    return (
                      <Link
                        to={`/countryDetails/${each_country.cca3}`}
                        key={each_country.cca3}
                      >
                        <CountryCard country={each_country} />
                      </Link>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="add-loader">
                <img src="../images/loader.gif" alt="loading-image" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default HomePage;
