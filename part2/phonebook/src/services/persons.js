import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPeople = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)


export default { create, getPeople }