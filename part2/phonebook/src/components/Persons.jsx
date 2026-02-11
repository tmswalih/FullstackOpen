

const Persons = ({ filteredPersons,handleDelete }) => {
  

  return (
    <ul>
      {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() =>handleDelete(person.id)} >Delete</button></li>)}
    </ul>
  )
}

export default Persons