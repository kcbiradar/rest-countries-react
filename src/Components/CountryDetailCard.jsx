import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const API_URL = `https://restcountries.com/v3.1/all`;

export default function CountryDetailCard() {
  let location = useLocation().pathname.split('/')[2];
  
  const [data , setData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
        const promise = await fetch(API_URL);
        const json = await promise.json();
        setData(json);
    }
    fetchApi();
  } , []);

  const country = data.filter((each_country) => each_country.cca3 === location);

  return (
    <>
        <Navbar />
        <Link to="/"><button>Back</button></Link>
        {country[0] ? <>
                ({
                    <div className='detail'>
                        <div className='countryDetailsImage'>
                            <img src={country[0].flags.png} alt="country-image" />
                        </div>
                        <div className='displayCountryDetails'>
                            <div className='countryLeftDetails'>

                            </div>
                        </div>
                    </div>
                })
        </> : <h1>Loading...</h1>}
    </>
  )
}
