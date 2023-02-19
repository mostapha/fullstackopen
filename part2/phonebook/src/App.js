import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const onSearchChange = event => {
    setNewSearch(event.target.value)
  }

  const onNameChange = event => {
    setNewName(event.target.value)
  }

  const onNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const isNameAlreadyAdded = name => {
    return persons.some(person => person.name === name)
  }

  const onFormSubmit = event => {
    event.preventDefault();

    if (isNameAlreadyAdded(newName)) {

      alert(`${newName} is already added to phonebook`)

    } else {

      const person = {
        name: newName,
        number: newNumber
      }

      // add new person
      setPersons(persons.concat(person))

      // clear input value
      setNewName('')
      setNewNumber('')
    }

  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with: <input onChange={onSearchChange} value={newSearch} /></div>
      <h2>Add new name</h2>
      <form onSubmit={onFormSubmit}>
        <div>name: <input onChange={onNameChange} value={newName} /></div>
        <div>number: <input onChange={onNumberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name + " " + person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
