import axios from 'axios'

const baseUrl = "https://restcountries.com/v3.1/name/"
const appId = process.env.REACT_APP_API_KEY

const search = name => axios.get(baseUrl + name)

const getWeather = (lat, lng) => {
    const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${appId}`
    return axios.get(weatherBaseUrl)
}

const service = {
    search, getWeather
}

export default service