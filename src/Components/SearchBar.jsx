function SearchBar(props) {
  function triggerInput(event) {
    props.searchHandle(event.target.value);
  }

  function triggerSelect(event) {
    props.selectHandle(event.target.value);
    if (event.target.value !== "") {
      document.getElementById("subregion").style.display = "unset";
    } else {
      document.getElementById("subregion").style.display = "none";
    }
  }

  function handlePopulationOrder(event) {
    props.handlePopulation(event.target.value);
  }

  function triggerSubregion(event) {
    props.handleSubregion(event.target.value);
  }

  function triggerhandleArea(event) {
    props.handleArea(event.target.value);
  }

  return (
    <div className="selectSection">
      <div>
        <input
          type="text"
          onInput={triggerInput}
          placeholder="Search for a country..."
          id="countrySearch"
        />
      </div>
      <select
        name="population"
        id="population"
        onChange={handlePopulationOrder}
        value={props.selectPopulation}
      >
        <option>
          Filter By Population
        </option>
        <option value="decreasingOrder">Increasing</option>
        <option value="increasingOrder">Decreasing</option>
      </select>

      <select name="area" id="area" onChange={triggerhandleArea} value={props.selectArea}>
        <option>
          Filter By Area
        </option>
        <option value="decreasingOrder">Increasing</option>
        <option value="increasingOrder">Decreasing</option>
      </select>

      <select name="continents" id="continents" onChange={triggerSelect}>
        <option value="">Filter By Region</option>
        {props.continents.map((continent) => {
          return (
            <option key={continent} value={continent}>
              {continent}
            </option>
          );
        })}
      </select>
      <select
        name="subregion"
        id="subregion"
        style={{ display: "none" }}
        onChange={triggerSubregion}
      >
        <option value=""> Select By Sub-Region </option>
        {props.subregions.map((subregion) => {
          return (
            <option key={subregion} value={subregion}>
              {subregion}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SearchBar;
