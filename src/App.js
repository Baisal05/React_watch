import React, {useState} from 'react';

import './App.css';
const api = {
  key : "1128da535e1a9045dc5f1066e507164d",
  base : "https://api.openweathermap.org/data/2.5/"
}
const dateBuilder = (d) => {
  let months = ["Янв","Фев","Мар", "Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
  let days = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];


  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`
}

function App() {
  const [query, setQuery] = useState('');
  const[weather, setWeather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  return (
        
        
    <div className="app">
    <div className={ 
      (typeof weather.main != "undefined")
      ? ((weather.weather[0].main === '') 
      ? 'app Rain' : (weather.weather[0].main === 'Rain') 
      ? 'app Clouds' : (weather.weather[0].main === 'Clouds') 
      ? 'app Clear' : (weather.weather[0].main === 'Clear') 
      ? 'app Winter' : (weather.weather[0].main === 'Winter')
      ? 'app Haze'
       : 'app') 
       : 'app' }>


        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Укажите город..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search} />
          </div>

          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ('')}

        </main>

      </div>
      </div>);
}
    
export default App;
