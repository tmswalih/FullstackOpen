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
export default PersonForm