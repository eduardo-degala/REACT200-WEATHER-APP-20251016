//SearchForm.jsx (TBD how to incorporate it)

//import React, { useState } from 'react';
import { useState } from 'react';
import useWeather from '../hooks/useWeather';
import useAudioClick from '../hooks/useAudioClick';

import usStates from './data/usStates';
import countries from './data/countries';

const SearchForm = () => {
  const [city, setCity] = useState('');           //city is mandatory
  const [state, setState] = useState('');         //defaults '' and has placeholder text to select as applicable
  const [country, setCountry] = useState('US');   //default to United States
  const { fetchWeather, resetWeather, resetLocation } = useWeather();
  const { audioRef, play } = useAudioClick('/SUCCESS.mp3');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    play();
    
    console.log('Form submitted', { city, state, country });

    const searchParams = {
      city,
      country,
    };

    if (state) {
      searchParams.state = state;
    }

  fetchWeather(searchParams).then(() => {
    console.log('fetchWeather completed');
  }).catch(console.error);

    //fetchWeather(searchParams);                 //this triggers the whole data-fetch flow
    //setCity('');                                
    //setState('');
    //setCountry('US');                           //reset to default
  };

  const handleReset = () => {
    /*
    // Clear form fields (if using state)
    setCity('');
    setState('');
    setCountry('US');

    // Clear weather data
    resetWeather();
    resetLocation();
    */
    window.location.reload(); //too many issues, do full page reload of entire app
  };





  return (

<form onSubmit={handleSubmit} className="w-full">
  <div className="flex flex-wrap items-end gap-4 mb-6">

    {/* CITY Input with custom tooltip */}
    <div className="relative group flex-1 min-w-[150px]">
      <input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="🔍  Enter City"
        className="pl-3 w-full h-10 rounded border border-white text-white placeholder-white
        hover:bg-yellow-600 hover:border-yellow-100 transition-colors duration-300"
      />
      <div className="absolute left-0 -top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 max-w-xs">
        Required: Enter a city name (e.g., New York, Tokyo)
      </div>
    </div>

    {/* STATE Dropdown with custom tooltip */}
    <div className="relative group w-32 min-w-[100px]">
      <select
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="pl-2 w-full h-10 rounded border border-white text-white
        hover:bg-yellow-600 hover:border-yellow-100 transition-colors duration-300"
      >
        <option value="">Select State</option>
        {usStates.map((s) => (
          <option key={s.code} value={s.code}>{s.name}</option>
        ))}
      </select>
      <div className="absolute left-0 -top-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 max-w-xs">
        Narrow your search choose USA state
      </div>
    </div>

    {/* COUNTRY Dropdown with custom tooltip */}
    <div className="relative group w-36 min-w-[100px]">
      <select
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="pl-2 w-full h-10 rounded border border-white text-white
        hover:bg-yellow-600 hover:border-yellow-100 transition-colors duration-300"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>
      <div className="absolute left-0 -top-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 max-w-xs">
        Default USA, choose international options
      </div>
    </div>

    {/* GO Button */}
    <div className="w-24">
      <button
        type="submit"
        disabled={!city.trim()}
        className="w-full h-10 bg-orange-600 text-white font-bold rounded 
         hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.8)]
               transition-shadow duration-300"
      >
        Go
      </button>
    </div>

    {/* RESET Button */}
    <div className="w-24">
      <button
        type="button"
        onClick={handleReset}
        className="w-full h-10 bg-yellow-300 font-bold rounded 
        hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.8)]
               transition-shadow duration-300"
      >
        Reset
      </button>
    </div>

  </div>

{/* AUDIO - GO button */}
<audio ref={audioRef} src="/SUCCESS.mp3" preload="auto" />
</form>


  );
};
export default SearchForm;

/*
API REFERENCE:
  https://openweathermap.org/api

MAP
  https://www.openstreetmap.org/
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  https://openweathermap.org/
    url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}


GEOCODING
  INPUT city/state, GET lat/lon (Geocoding API 1.0)
  https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=1&appid=${API_KEY}

  OTHER Geocoding API 1.0 variables
  https://openweathermap.org/api/geocoding-api
  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

WEATHER
  INPUT lat/lon, GET weather data
  Current Weather
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial
  Forecast (5 day / 3 hour)
    https://openweathermap.org/forecast5
    api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

*/