import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const countryToShow =
    selectedCountry
      ? selectedCountry
      : filteredCountries.length === 1
        ? filteredCountries[0]
        : null

  return (
    <div>
      <h2>Find countries</h2>
      <input value={search} onChange={handleChange} />

      <Countries
        countries={filteredCountries}
        setSelectedCountry={setSelectedCountry}
        countryToShow={countryToShow}
      />
    </div>
  )
}

const Countries = ({ countries, setSelectedCountry, countryToShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countryToShow) {
    return <CountryDetail country={countryToShow} />
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return null
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Area:</strong> {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      <Weather capital={country.capital[0]} />
    </div>
  )
}

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }, [capital, apiKey])

  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default App
