import { useState, useEffect } from 'react'
import axios from 'axios'


// components
const SearchFilter = ({ onSearchChange, newSearch }) => {
  return <div>filter shown with: <input onChange={onSearchChange} value={newSearch} /></div>
}

const NamesForm = ({ onFormSubmit, onNameChange, newName, onNumberChange, newNumber }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>name: <input onChange={onNameChange} value={newName} /></div>
      <div>number: <input onChange={onNumberChange} value={newNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ people }) => {
  return (
    <ul>
      {people.map(person => <li key={person.name}>{person.name + " " + person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response);
        setPersons(response.data)
      })
  }, [])
  
  // helpers
  const isNameAlreadyAdded = name => persons.some(person => person.name === name)

  // events
  const onSearchChange = event => setNewSearch(event.target.value)
  const onNameChange = event => setNewName(event.target.value)
  const onNumberChange = event => setNewNumber(event.target.value)
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
      <SearchFilter onSearchChange={onSearchChange} newSearch={newSearch} />
      <h2>Add new name</h2>
      <NamesForm
        onFormSubmit={onFormSubmit}
        onNameChange={onNameChange}
        newName={newName}
        onNumberChange={onNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons people={personsToShow} />
    </div>
  )
}

export default App