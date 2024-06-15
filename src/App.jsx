import HomePage from "./Components/HomePage";

import CountryDetailCard from "./Components/CountryDetailCard";

import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/countryDetails/:id" element={<CountryDetailCard/>}></Route>
      </Routes>
    </>
  );
}

export default App;
