//WeatherDisplay.jsx (display weather data f/context)

import React from 'react';
//import WeatherContext from '../context/WeatherContext.jsx';
import useWeather from '../hooks/useWeather';
import WeatherWidgetStatic from './WeatherWidgetStatic';
import WeatherWidget from './WeatherWidget';
//import { useContext } from 'react';

//import "leaflet/dist/leaflet.css";                        //reqd for mapping insert & tiling, rendering map
//import WeatherMap from "./WeatherMap";                    //component WeatherMap.jsx

const WeatherDisplay = () => {                              //correctly extract state from context, then get variables from state    
    //const { state } = useContext(WeatherContext);
    //const { weatherData, forecastData, loading, error } = state;
    const { weatherData, forecastData, loading, error } = useWeather();

    //error codes
    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error: {error}</p>
    if (!weatherData || !forecastData) {
        return (
      <div className="text-center mb-6 text-gray-600">
        <p className="mt-20 mb-10">No input data submitted.</p>
        <p className="mb-10">Showing general weather conditions for your region:</p>
        <div className="mb-20 flex justify-center">
          <WeatherWidgetStatic />
        </div>
      </div>
    );
    }

//WEATHER DATA, CURRENT

//weather data, destructured
  const {
    name,
    weather = [],
    main = {},
    wind = {},
    sys = {},
  } = weatherData;

  const currentCondition = weather[0]?.main || "Unknown";  // e.g., "Rain"

//weather icons
// https://openweathermap.org/img/wn/{icon_code}@2x.png
// <img src="https://openweathermap.org/img/wn/10n@2x.png" />
const conditionIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌫️",
  Sand: "🌫️",
  Ash: "🌫️",
  Squall: "🌬️",
  Tornado: "🌪️"
};

const conditionEmoji = conditionIcons[currentCondition] || "🌈"; //default fallback emoji


//WEATHER FORECASTING (3-hour & 5-day)

//weather forecast, 3-hour
const nextForecasts = forecastData?.list?.slice(0, 5) || [];

//weather forecast, 5-day
const dailyForecasts = forecastData?.list?.filter(f => f.dt_txt.includes("12:00:00")) || [];

//helper, time, converts unix timestamp to readable time
const formatTime = (unixTime) => {
    if (!unixTime) return '';
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

//helper, date, formatting date&time
const formatDate = (unixTime) => {
  if (!unixTime) return '';
  const date = new Date(unixTime * 1000);
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

//helper, format hour
const formatHour = (dt_txt) => {
  const date = new Date(dt_txt);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

//helper, icons (OpenWeather Icons)
const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
const iconUrl = weather[0]?.icon ? getIconUrl(weather[0].icon) : '';

console.log('WeatherDisplay render', { weatherData, forecastData, loading, error });





//RENDER WEATHER DISPLAY
    return (
    <>

    <div className="max-w-4xl mx-auto px-0 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" style={{ gridAutoRows: 'minmax(250px, auto)' }}>
      
        {/* Top Left: Weather Summary */}
        <div className="bg-gray-300  opacity-90 p-6 rounded flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4 text-center">Weather in {name} {conditionEmoji}</h2>
            {weather[0] && (
          <>
            <img src={iconUrl} alt={weather[0].description} className="mb-4 w-24 h-24" />
            <p className="text-xl text-center">
            <strong>{main.temp}°F &nbsp;&nbsp;{weather[0].main}</strong> — {weather[0].description}
            </p>
          </>
        )}
        </div>

        {/* Top Right: Weather Data */}
        <div className="bg-gray-300 opacity-90 p-6 rounded grid grid-cols-2 grid-rows-2 gap-x-6 text-sm md:text-base h-64">
            {/* Top-left */}
            <div className="flex flex-col items-start justify-center">
                <p><strong>Current Temp:</strong> {main.temp}°F</p>
                <p><strong>Feels Like:</strong> {main.feels_like}°F</p>
            </div>

            {/* Top-right */}
            <div className="flex flex-col items-end justify-center text-right">
                <p><strong>High:</strong> {main.temp_max}°F</p>
                <p><strong>Low:</strong> {main.temp_min}°F</p>
            </div>

            {/* Bottom-left */}
            <div className="flex flex-col items-start justify-center">
                <p><strong>Humidity:</strong> {main.humidity}%</p>
                <p><strong>Wind:</strong> {wind.speed} mph</p>
            </div>

            {/* Bottom-right */}
            <div className="flex flex-col items-end justify-center text-right">
                <p><strong>Sunrise:</strong> {formatTime(sys.sunrise)}</p>
                <p><strong>Sunset:</strong> {formatTime(sys.sunset)}</p>
            </div>
        </div>

        {/* Bottom Left: 3-Hour Forecast */}
        <div className="bg-gray-300 opacity-90 p-6 rounded h-full overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Next 15 Hours Forecast</h3>
            <div className="flex justify-between flex-wrap gap-2">
                {nextForecasts.map((forecast) => (
                <div key={forecast.dt} className="text-center flex flex-col items-center w-1/5 md:w-1/6">
                    <p className="!text-[10px] md:text-xs mb-1">{formatHour(forecast.dt_txt)}</p>
                    <img
                        src={getIconUrl(forecast.weather?.[0]?.icon)}
                        alt={forecast.weather?.[0]?.description}
                        className="w-8 h-8 md:w-10 md:h-10 mb-1"
                    />
                    <p className="text-xs md:text-sm font-semibold">{Math.round(forecast.main.temp)}°F</p>
                    <p className="text-[10px] md:text-xs">{forecast.weather?.[0]?.main}</p>
                </div>
                ))}
            </div>
        </div>

        {/* Bottom Right: 5-Day Forecast */}
        <div className="bg-gray-300 opacity-90 p-6 rounded h-full overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">5-Day Forecast</h3>
            <div className="flex justify-between flex-wrap gap-2">
                {dailyForecasts.map((forecast) => (
                    <div key={forecast.dt} className="text-center flex flex-col items-center w-1/5 md:w-1/6">
                        <p className="!text-[10px] md:text-xs mb-1">{formatDate(forecast.dt)}</p>
                        <img
                            src={getIconUrl(forecast.weather?.[0]?.icon)}
                            alt={forecast.weather?.[0]?.description}
                            className="w-8 h-8 md:w-10 md:h-10 mb-1"
                        />
                        <p className="text-xs md:text-sm font-semibold">High: {Math.round(forecast.main.temp_max)}°F</p>
                        <p className="text-xs md:text-sm font-semibold">Low: {Math.round(forecast.main.temp_min)}°F</p>
                        <p className="text-[10px] md:text-xs">{forecast.weather?.[0]?.main}</p>
                    </div>
                ))}
            </div>
        </div>

    </div>






    </>
    );
  };

//return <p>Please search for a city to display weather data.</p>;



export default WeatherDisplay;

/*


need to list these:
Current temp, conditions → from weatherData

5-day forecast → from forecastData.list[] (each item is a 3-hour forecast block)
// Example: Get 5 days of 12:00 PM forecasts
const dailyForecasts = forecastData.list.filter(f => f.dt_txt.includes("12:00:00"));

//Or to get the next 5 intervals (e.g., next 15 hours):
const nextForecasts = forecastData.list.slice(0, 5);

{
  "coord": { "lon": -122.08, "lat": 37.39 },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": { "all": 1 },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
}

| JSON Path                | Description               | How to access in JS                  |
| ------------------------ | ------------------------- | ------------------------------------ |
| `name`                   | City name                 | `weatherData.name`                   |
| `weather[0].main`        | Weather condition (brief) | `weatherData.weather[0].main`        |
| `weather[0].description` | Detailed description      | `weatherData.weather[0].description` |
| `weather[0].icon`        | Icon code for weather     | `weatherData.weather[0].icon`        |
| `main.temp`              | Current temperature       | `weatherData.main.temp`              |
| `main.feels_like`        | Feels like temp           | `weatherData.main.feels_like`        |
| `main.temp_min`          | Min temperature           | `weatherData.main.temp_min`          |
| `main.temp_max`          | Max temperature           | `weatherData.main.temp_max`          |
| `main.humidity`          | Humidity %                | `weatherData.main.humidity`          |
| `wind.speed`             | Wind speed (m/s or mph)   | `weatherData.wind.speed`             |
| `sys.sunrise`            | Sunrise (unix timestamp)  | `weatherData.sys.sunrise`            |
| `sys.sunset`             | Sunset (unix timestamp)   | `weatherData.sys.sunset`             |

*/
