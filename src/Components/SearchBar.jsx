function SearchBar({ searchHandle, continents, selectHandle }) {
  function triggerInput(event) {
    searchHandle(event.target.value);
  }

  function triggerSelect(event) {
    selectHandle(event.target.value);
  }

  return (
    <div className="navbar">
      <div>
        <input type="text" onInput={triggerInput} />
      </div>
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
    </div>
  );
}

export default SearchBar;
