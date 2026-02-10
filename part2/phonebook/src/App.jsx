import { useState } from 'react'

const Filter =({ newName, setNewName }) => {
  return (
    <div>
      filter shown with <input 
      id='filter'
      value={newName}
      onChange={(event) => setNewName(event.target.value)}
      />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
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
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase())) 

  
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter newName={newName} setNewName={setNewName} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App