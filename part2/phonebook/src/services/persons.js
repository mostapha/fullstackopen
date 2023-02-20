import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPeople = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)

const deletePerson = person => axios.delete(`${baseUrl}/${person.id}`)

export default { create, getPeople, deletePerson }