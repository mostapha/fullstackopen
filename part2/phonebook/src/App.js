import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onInputChange = event => {
    setNewName(event.target.value)
  }

  const isNameAlreadyAdded = name => {
    return persons.some(person => person.name === name)
  }

  const onFormSubmit = event => {
    event.preventDefault();

    if(isNameAlreadyAdded(newName)){

      alert(`${newName} is already added to phonebook`)

    } else {

      const person = {
        name: newName
      }
  
      // add new person
      setPersons(persons.concat(person))
  
      // clear input value
      setNewName('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input onChange={onInputChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
