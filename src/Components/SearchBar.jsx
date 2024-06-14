function SearchBar({ searchHandle, continents, selectHandle,handlePopulation , subregions,handleSubregion}) {
  function triggerInput(event) {
    searchHandle(event.target.value);
  }

  function triggerSelect(event) {
    selectHandle(event.target.value);
    if(event.target.value !== '') {
      document.getElementById('subregion').style.display = 'unset';
    } else {
      document.getElementById('subregion').style.display = 'none';
    }
  }

  function handlePopulationOrder(event) {
    handlePopulation(event.target.value);
  }

  function triggerSubregion(event) {
    handleSubregion(event.target.value);
  }

  return (
    <div className="navbar">
      <div>
        <input type="text" onInput={triggerInput} />
      </div>
      <select name="population" id="population" onChange={handlePopulationOrder}>
        <option value="">Filter By Population</option>
        <option value="decreasingOrder">Increasing</option>
        <option value="increasingOrder">Decreasing</option>
      </select>
      <select name="continents" id="continents" onChange={triggerSelect}>
        <option value="">Filter By Region</option>
        {continents.map((continent) => {
          return (
            <option key={continent} value={continent}>
              {continent}
            </option>
          );
        })}
      </select>
      <select name="subregion" id="subregion" style={{display:"none"}} onChange={triggerSubregion}>
        <option value=""> Select By Sub-Region </option>
        {subregions.map((subregion) => {
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
