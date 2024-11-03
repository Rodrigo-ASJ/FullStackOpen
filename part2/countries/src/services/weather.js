import axios from 'axios'
// https://home.openweathermap.org/
// export VITE_SOME_KEY=password && npm run dev

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/'

const getWeather = (country) =>{
    const request = axios.get(`${baseUrl}/weather?q=${country}&appid=${api_key}`);
    return request.then( response => response.data);
}

export default {
    getWeather
}