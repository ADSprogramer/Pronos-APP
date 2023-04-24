import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getRandomCity } from './utils';

const API_KEY = 'c406de3a4e9772882ee0de5cc0724b69';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const cities = [];
      for (let i = 0; i < 5; i++) {
        const city = getRandomCity();
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        cities.push({ ...response.data });
      }
      setWeatherData(cities);
      setLoading(false);
    };
    fetchData();
    

    const intervalId = setInterval(() => {
      setCityIndex((cityIndex + 1) % weatherData.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [cityIndex, weatherData.length]);

  if (loading) {
    return <p style={{ fontSize: 24, marginBottom: 8, color: '#FFFCF2' }}>Cargando...</p>;
  }

  if (!weatherData) {
    return <p style={{ fontSize: 24, marginBottom: 8, color: '#FFFCF2' }}>No se pudo cargar el clima</p>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#403D39', borderRadius: 16, padding: 24 }}>
  <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16, color: '#FFFFFF' }}>Clima en 5 ciudades aleatorias</h1>
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
  {[weatherData[cityIndex]].map((data, index) => {
      const temperature = Math.round(data.main.temp - 273.15);
      const isThird = index === 2;
      return (
        <div key={index} className={isThird ? "third-item" : "non-third-item"} style={{ textAlign: 'center', width: 300, backgroundColor: '#252422', borderRadius: 16, padding: 16 }}>
          <img src="https://i0.wp.com/climaya.com/wp-content/uploads/2019/06/cy-logo-512-512.png?fit=512%2C512&ssl=1" alt="Imagen" style={{ width: '100%', marginBottom: 16, borderRadius: 16 }} />
          <h2 style={{ fontSize: 24, marginBottom: 8, color: '#FFFCF2' }}>{data.name}</h2>
          <p style={{ fontSize: 16, marginBottom: 8, color: '#D9D9D9' }}>{data.weather[0].description}</p>
          <p style={{ fontSize: 24, color: '#EB5E28' }}>{temperature}°C</p>
        </div>
      );
    })}
  </div>
</div>
);
    
};

export default Weather;
