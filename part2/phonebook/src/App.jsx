import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons' 
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message,setMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  
  
  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  const addPerson = (event) => {
  event.preventDefault()

  const personObject = {
    name: newName,
    number: newNumber
  }

  const existingPerson = persons.find(p => p.name === newName)

  if (existingPerson) {
    const confirm = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )

    if (!confirm) return

    const updatedPerson = { ...existingPerson, number: newNumber }

    personServices
      .update(existingPerson._id, updatedPerson)
      .then(response => {
        setPersons(persons.map(p =>
          p._id !== existingPerson._id ? p : response.data
        ))

        setNewName('')
        setNewNumber('')

        setMessage(`Updated ${existingPerson.name}'s number`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(`Information of ${existingPerson.name} has already been removed from the server`)
        setPersons(persons.filter(p => p._id !== existingPerson._id))

        setErrorMessage(`Information of ${existingPerson.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    return
  }

  personServices
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')

      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      alert(error.response.data.error)

      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}
  console.log(persons)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase())) 
  
const handleDelete = (id) => {
    const person = persons.find(p => p._id === id)

    if (!person) return

    const ok = window.confirm(`Delete ${person.name}?`)
    if (!ok) return

    personServices
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p._id !== id))

        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(`Information of ${person.name} has already been removed from the server`)
        setPersons(persons.filter(p => p._id !== id))
        setErrorMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
}


  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} errorMessage = {errorMessage} />
      <Filter newName={newName} setNewName={setNewName} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App