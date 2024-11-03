import weatherService from '../services/weather'
import { useEffect, useState } from 'react'

const Country = ({data}) => {
  //console.log('data',data)
  const [ weather , setWeather ] = useState(null)
  const langInfo = Object.entries(data.languages).map( ([key,value]) => <li key={key}>{value}</li>)
  
  useEffect(()=>{
    weatherService.getWeather(data.name.common).then( result => setWeather(result))
    return () =>{
      setWeather(null)
    }
  },[])

  //console.log('weather',weather)
  return (
    <>
    <h1>{data.name.common}</h1>
    <div>capital { data.capital.map(capital => capital) }</div>
    <p>area { data.area }</p>
    <p><strong>languages:</strong></p>
    <ul>
      {langInfo}
    </ul>
    <img src={data.flags.svg} alt={data.flags.alt} width={200}  style={{ aspectRatio: '1/1 auto'}}/>
    <h2>Weather in {data.name.common}</h2>
    <p>temperature: {weather?.main?.temp} Celcius</p>
    <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} alt={weather?.weather[0]?.description} />
    <p>wind speed: {weather?.wind?.speed} m/s</p>
    </>
  )
}

export default Country