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

export default Filter