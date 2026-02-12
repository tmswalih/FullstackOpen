import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      find countries <input value={search} onChange={handleChange} />
      <CountryList countries={filteredCountries} />
    </div>
  )
}

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.cca3}>{country.name.common}</li>
        )}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return null
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    </div>
  )
}

export default App
