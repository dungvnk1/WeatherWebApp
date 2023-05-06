import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=7184a31db8324d00b3a82346230605&q=${city}&aqi=no`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => {
        if (e.key === "Enter") {
          getWeather();
        }
      }}></input>
      <button onClick={getWeather}>Search</button>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2>{weather.location.name}</h2>
          <img src={weather.current.condition.icon} alt="Weather"></img>
          <p>Temperature: {weather.current.temp_c} &#8451;</p>
          <p>Feels like: {weather.current.condition.text}</p>
        </>
      )}
    </div>
  );
}

export default App;
