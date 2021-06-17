import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY
const cities: string[] = ['Gdansk', 'London', 'Bogota', 'Santiago'];
const fetchWeather = (city: string) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then((res: any) => {
      console.log(res)
      return res
    }).catch((err: any) => {
      console.log(err)
      return err
    })
}
const weatherDataConvert = (data: any) => {
  data.main.temp = Math.round(data.main.temp - 273) + " °C";
  data.main.feels_like =  Math.round(data.main.feels_like - 273) + " °C";
  data.main.temp_min =  Math.round(data.main.temp_min - 273) + " °C";
  data.main.temp_max =  Math.round(data.main.temp_max - 273) + " °C";
  data.main.pressure += " hPa";
  data.main.humidity += " %"
  return { name: data.name, ...data.main, ...data.weather[0] }
}

function App() {
  const [weathers, setWeathers] = useState<any[]>([])

  useEffect(() => {

    let weatherPromises = cities.map((city: any) => fetchWeather(city))

    Promise.all([...weatherPromises]).then((values: any) => {

      let newValues = values.map((value: any) => weatherDataConvert(value.data))
      console.log(newValues)
      setWeathers([...newValues])
    });

  }, [])
useEffect(() => {  
      
}, [weathers])
  return (
    <div className="mainDiv">
      <table>
         <tr>
        {weathers.length && Object.keys(weathers[0]).map((val, idx) => (
            <th>{val}</th>
        ))}
        </tr> 
       
  
      {weathers.map((weather: any, Idx: any) => (
      <tr>
        {Object.keys(weathers[0]).map((val: any) => (
          <td>{weather[val]}</td>
        ))}
    </tr>
      ))}
      </table>
</div>
    
  );
}

export default App;
