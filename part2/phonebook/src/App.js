import { useState, useEffect } from 'react'
import service from './services/persons'

import NamesFilter from './components/NamesFilter'
import AddNameForm from './components/AddNameForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    service.getPeople().then(response => {
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

      const newPerson = {
        name: newName,
        number: newNumber
      }

      // add data to the server
      service.create(newPerson).then(response => {

        console.log('add data to the server response', response)

        // add new person
        setPersons(persons.concat(response.data))

        // clear input value
        setNewName('')
        setNewNumber('')
      })



    }

  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  // delete name function
  const deletePerson = person => {
    if (window.confirm(`Are you sure you want to delete ${person.name} ?`)) {
      service.deletePerson(person).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NamesFilter onSearchChange={onSearchChange} newSearch={newSearch} />
      <h2>Add new name</h2>
      <AddNameForm
        onFormSubmit={onFormSubmit}
        onNameChange={onNameChange}
        newName={newName}
        onNumberChange={onNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons people={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App