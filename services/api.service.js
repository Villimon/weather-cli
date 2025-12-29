import axios from "axios"
import { getKeyValue, TOKEN_DICT } from "./storage.service.js"

export const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICT.token)

    if(!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    })

    return data
} 