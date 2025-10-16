//App.jsx

//import { WeatherProvider } from './context/WeatherContext.jsx';
import React from 'react';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherMap from "./components/WeatherMap"; 
import AudioLoad from './components/AudioLoad';                 
import useWeather from './hooks/useWeather';



function App() {
  const { location, weatherData } = useWeather();  // get lat/lon from context state
  const lat = location?.lat;
  const lon = location?.lon;
  console.log('Map props:', { lat, lon });










  return (

    <div className="relative min-h-screen overflow-hidden">

      {/* VIDEO background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/public/WEATHER BLUE 20251014.mp4"
      />

      {/* AUDIO autoplay */}
      <AudioLoad />

      {/* TITLE top */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="xbg-gray-300 p-4 rounded mb-6">
        <h1 className="text-center text-6xl font-extrabold text-white">Origin Weather Application</h1>
        <p className="text-center text-2xl text-gray-400 mt-2">Conditions:  Know Before You Go</p>
        </div>
      <div>

      {/* SEARCHFORM */}
      <div>
      <SearchForm />  
      </div>

      {/* WEATHERDISPLAY */}
      <div>
      <WeatherDisplay />
      </div>

      {/* WEATHERMAP */}
      <div id="map" className="h-96 w-full">
      <WeatherMap lat={lat} lon={lon} />
      </div>

    </div>

  </div>
  </div>

  )
}

export default App
