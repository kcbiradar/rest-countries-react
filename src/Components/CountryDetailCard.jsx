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

  console.log(country[0]);

  return (
    <>
        <Navbar />
        <div className='back-btn'>
        <Link to="/"><button>Back</button></Link>
        </div>
        {country[0] ? <>
                {   
                    
                    <div className='detail'>
                        <div className='countryDetailsImage'>
                            <img src={country[0].flags.png} alt="country-image" className='country-detail-image'/>
                        </div>
                        <div className='displayCountryDetails'>
                          <div className='country-name'>
                              <h2>{country[0].name.common}</h2>
                          </div>
                            <div className='inner-div'>
                              <div className='left-section-detail'>
                                  <div>
                                    <p><b>Native Name: </b>{country[0].name.common}</p>
                                    <p><b>Population: </b>{country[0].population}</p>
                                    <p><b>Region: </b>{country[0].region}</p>
                                    <p><b>Sub Region: </b>{country[0].subregion}</p>
                                    <p><b>Capital: </b>{country[0].capital}</p>
                                  </div>
                              </div>
                              <div>
                                  <p><b>Top Level Domain: </b>{country[0].tld[0]}</p>
                                  <p><b>Currencies: </b>{Object.keys(country[0].currencies).join(', ')}</p>
                                  <p><b>Languages: </b>{Object.values(country[0].languages).join(', ')}</p>
                              </div>
                            </div>
                            <div className='borders'>
                              <div><b>Borders:</b></div>
                              {
                                country[0]?.borders.map((border,index) => {
                                  return <Link key={index} to={`/countryDetails/${border}`}><button >{border}</button></Link>
                                })
                              }
                            </div>
                        </div>
                    </div>
                }
        </> : <h1>Loading...</h1>}
    </>
  )
}
