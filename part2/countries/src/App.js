import { useState, useEffect } from "react";
import service from "./service/api"


const WeatherInfo = ({ latlng }) => {
  const [weather, setWeather] = useState(null);

  const [lat, lng] = latlng;

  useEffect(() => {
    service.getWeather(lat, lng).then(response => {
      setWeather(response.data)
    })

  }, [lat, lng])

  return weather
    ? (
      <>
        <div>Temperature {weather.main.temp} Celcius</div>
        <div><img src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt={weather.weather[0].icon}/></div>
        <div>wind {weather.wind.speed} m/s</div>
      </>
    )
    : (<div>Fetching data...</div>)



}

const TableRow = ({ keyName, value }) => {
  return <tr><th>{keyName}</th><td>{value}</td></tr>
}

const SearchResults = ({ countries, showCountry }) => {

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
            <TableRow keyName="Capital" value={country.capital.join(', ')} />
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
                <img src={country.flags.svg} alt={country.flag} />
              )
            } />
          </tbody>
        </table>
        <h2>Weather in {country.capital[0]}</h2>
        <WeatherInfo latlng={country.capitalInfo.latlng} />
      </div>
    )

  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.ccn3}>{country.name.common}<button onClick={() => showCountry(country)}>show</button></li>)}
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

  const triggerSearch = (query) => {
    if (query.trim() !== "") {
      service.search(query).then(response => {
        handleData(response.data)
      }).catch(err => {
        if (err.response.status === 404) {
          alert('no search results for ' + query)
        } else {
          console.error(err);
        }
      })
    }
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    triggerSearch(countryName);
  }

  const showCountry = (countryInfo) => {
    setCountryName(countryInfo.name.common)
    triggerSearch(countryInfo.name.common);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='query'>find countries</label>
        <input id='query' onChange={event => setCountryName(event.target.value)} value={countryName} />
      </form>
      <SearchResults countries={countries} showCountry={showCountry} />
    </div>
  );
}

export default App;
