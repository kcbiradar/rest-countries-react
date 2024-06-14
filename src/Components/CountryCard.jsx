function CountryCard(props) {
  return (
    <>
      <div className="countryCard">
        <img
          src={props.country.flags.png}
          alt="country-image"
          className="countryCardImage"
        />
        <div>
          <div>
            <b>{props.country.name.common}</b>
          </div>
          <div>
            <b>Population: </b> {props.country.population}
          </div>
          <div>
            <b>Region: </b> {props.country.region}
          </div>
          <div>
            <b>Capital: </b>
            {props.country?.capital}
          </div>
          <div>
            <b>Subregion : </b>
            {props.country.subregion}
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryCard;
