import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  console.log(persons)

  

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
          id='name'
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          />
        </div><br />
        <div>
          number: <input 
          id='number'
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div><br />
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App