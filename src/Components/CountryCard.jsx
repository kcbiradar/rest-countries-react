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
          <div className="country-name">
            <b>{props.country.name.common}</b>
          </div>
          <div>
            <b>Population: </b> {(props.country.population).toLocaleString()}
          </div>
          <div>
            <b>Region: </b> {props.country.region}
          </div>
          <div>
            <b>Capital: </b>
            {props.country?.capital}
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryCard;
