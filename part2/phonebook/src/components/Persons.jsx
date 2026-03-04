const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person._id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person._id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons