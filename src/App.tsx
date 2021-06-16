import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY
const cities: string[] = ['Gdansk', 'London', 'Bogota', 'Santiago'];
const fetchWeather = (city: string) => {
 return  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
  .then((res: any) => {
    console.log(res)
    return res
  }).catch((err: any) => {
    console.log(err)
    return err
  })}

function App() {
  const [weathers, setWeathers] = useState<any[]>([])

  useEffect(() => {
    let weatherPromises = cities.map((city: any) => fetchWeather(city))

    Promise.all([...weatherPromises]).then((values) => {
     setWeathers([...values])
    });

  }, [])

  return (
   <div>

   </div>
  );
}

export default App;
