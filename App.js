import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null); // Initialize weather state to null
  const [city, setCity] = useState('');

  const getWeather = () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=503f8d4e05da9d5c445ffba7890c207c`)
      .then((res) => setWeather(res.data))
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setWeather(null); // Handle error by setting weather to null or another appropriate value
      });
  };
  const clear = () => {
   setCity('');
    setWeather(null);
  }

  const handleInputChange = (event) => {
    setCity(event.target.value); // Update city state with input value
  };

  return (
    <div className="App">
      <h1>Enter the name of the city to get the Weather</h1>
      <input
        type="text"
        placeholder="Enter city name"
        id="city"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={getWeather}>Get Weather</button>
      <button onClick={clear}>Clear</button>
      
      {weather && (
        <div className='data'>
          <h2>Weather</h2>
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          {/* Add more weather data fields as needed */}
        </div>
      )}
      {weather === null && <p>No data available for the entered city.</p>}
    </div>
    
  );
}

export default App;
