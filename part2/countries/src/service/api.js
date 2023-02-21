import axios from 'axios'

const baseUrl = "https://restcountries.com/v3.1/name/"

const search = name => axios.get(baseUrl + name)

export default { search }