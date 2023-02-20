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
  const [notification, setNotification] = useState(undefined)

  useEffect(() => {
    service.getPeople().then(response => {
      setPersons(response.data)
    })
  }, [])

  // events
  const onSearchChange = event => setNewSearch(event.target.value)
  const onNameChange = event => setNewName(event.target.value)
  const onNumberChange = event => setNewNumber(event.target.value)
  const onFormSubmit = event => {
    event.preventDefault();

    const nameDuplicate = persons.find(person => person.name === newName);

    // check if name is duplicated
    if (nameDuplicate) {

      const isSameNumber = nameDuplicate.number === newNumber

      // check if the duplicated name has the same number
      if (isSameNumber) {
        alert(`${newName} is already added to phonebook`)

      } else {


        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

          const updatedName = {
            ...nameDuplicate,
            number: newNumber
          }

          service.update(nameDuplicate.id, updatedName).then(response => {

            setNotification({
              type: 'modified',
              text: `Number of ${nameDuplicate.name} has been updated`
            })

            setTimeout(() => setNotification(undefined), 3000)

            // update UI
            setPersons(
              persons.map(p => {
                return p.id === nameDuplicate.id ? response.data : p
              })
            )

            setNewName('');
            setNewNumber('')
          })

        }
      }

    } else {

      const newPerson = {
        name: newName,
        number: newNumber
      }

      // add data to the server
      service.create(newPerson).then(response => {

        // add new person
        setPersons(persons.concat(response.data))

        setNotification({
          type: 'added',
          text: `${response.data.name} has been added`
        })

        setTimeout(() => setNotification(undefined), 3000)

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

        setNotification({
          type: 'deleted',
          text: `${person.name} has been deleted`
        })

        setTimeout(() => setNotification(undefined), 3000)
    
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NamesFilter onSearchChange={onSearchChange} newSearch={newSearch} notification={notification} />
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