import { useState } from "react";
import service from "./service/api"



const TableRow = ({ keyName, value }) => {
  return <tr><th>{keyName}</th><td>{value}</td></tr>
}
const SearchResults = ({ countries }) => {

  if (countries === null) {
    return ("")
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 0) {
    return <div>Nothing found</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <table>
          <tbody>
            <TableRow keyName="alternative spelling" value={country.altSpellings.join(', ')} />
            <TableRow keyName="Capital" value={country.capital[0]} />
            <TableRow keyName="Population" value={country.population} />
            <TableRow keyName="Continents" value={country.continents.join(', ')} />
            <TableRow keyName="Languages" value={(
              <ul>
                {
                  Object.values(country.languages).map(language => {
                    return <li key={language}>{language}</li>
                  })
                }
              </ul>
            )} />
            <TableRow keyName="Flag" value={
              (
                <img src={country.flags.svg} />
              )
            } />
          </tbody>
        </table>
      </div>
    )

  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.ccn3}>{country.name.common}</li>)}
      </ul>
    )
  }



}
const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState(null);

  const handleData = countries => {
    setCountries(countries)
  }

  const handleFormSubmit = event => {
    event.preventDefault();

    if (countryName.trim() !== "") {
      service.search(countryName).then(response => {
        handleData(response.data)
      }).catch(err => {
        if (err.response.status === 404) {
          alert('no search results for ' + countryName)
        } else {
          console.error(err);
        }
      })

    }

  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='query'>find countries</label>
        <input id='query' onChange={event => setCountryName(event.target.value)} value={countryName} />
      </form>
      <SearchResults countries={countries} />
    </div>
  );
}

export default App;
