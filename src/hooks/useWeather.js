//useWeather.js (create custom hook, handle async logic f/fetching weather data f/server), custom hook f/fetching data/stores in context & dispatches actions, UI reads f/useWeather()

import { useContext } from 'react';
import WeatherContext from '../context/WeatherContext.jsx';

//const API_KEY = import.meta.env.VITE_API_KEY;

//const weather_api_url = "/api/search" //TBD FOR DELETION, PLACEHOLDER FOR NOW

const useWeather = () => {
    const { state, dispatch } = useContext(WeatherContext); //state (loading, error, weatherData) defined in reducer, dispatch (updates global state sending action types and payloads)
  
    //FETCHWEATHER FUNCTION
    const fetchWeather = async ({ city, state: st, country }) => {
        if (!city) return;
        dispatch({ type: 'FETCH_START' });
        console.log('FETCH_START dispatched');

        try {
            // Build query string
            const params = new URLSearchParams({ city });
            if (st) params.append('state', st);
            if (country) params.append('country', country);

            // Fetch from your backend
            const response = await fetch(`/api/weather?${params.toString()}`);
            const data = await response.json();

            // Handle backend errors
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch weather data');
            }

            // Destructure response
            const { current, forecast, location } = data;

            dispatch({
                type: 'FETCH_SUCCESS',
                payload: {
                    current,
                    forecast,
                    location
                }
            });

            console.log('FETCH_SUCCESS dispatched with data:', data);
        } catch (error) {
            console.error('FetchWeather error:', error.message);
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
    };

    //RESET FUNCTION
    const resetWeather = () => {
        dispatch({ type: 'RESET' });
        console.log('Dispatching RESET action, useWeather.js');
    };

    return { ...state, fetchWeather, resetWeather };
};

export default useWeather;


/*



    //---old---FETCHWEATHER per city/state/country
    const fetchWeather = async ({ city, state: st, country }) => { //main function, reqs city opts f/state&country
        if (!city) return;
        dispatch({ type: 'FETCH_START' });
        console.log('FETCH_START dispatched');
  
        //BUILDS QUERY F/GEOCODING API (query string, city+=stateCode+=countryCode)
        try {                                              
            let query = city;
            if (st) query += `,${st}`;
            if (country) query += `,${country}`;
            console.log('Query for geocoding API:', query);

            //GEOCODING API
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`); //fysa, limit=1, same names possible error on international but have lat/lon and map to x-ck
            const geoData = await geoRes.json();
            console.log('Geocoding API response:', geoData);

            //ERROR (f/LOCATION)
            if (!geoData.length) {
                console.error('Location not found for query:', query);
                throw new Error('Location not found'); //invalid location error
            }

            //LAT/LON ESTABLISHED
            const { lat, lon } = geoData[0];
            console.log('Coordinates:', lat, lon);

            //WEATHER API (f/LAT/LON)
            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
            const weatherData = await weatherRes.json(); //https://openweathermap.org/current , weather api pulls add data, data extraction is performed on WeatherDisplay.jsx
            console.log('Current weather data:', weatherData);
            
            //FORECAST API (f/LAT/LON)
            const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            const forecastData = await forecastRes.json(); //https://openweathermap.org/forecast5#geo5 , JSON format API response fields
            console.log('Forecast data:', forecastData);

            dispatch({ 
                type: 'FETCH_SUCCESS', 
                payload: {
                    current: weatherData,
                    forecast: forecastData,
                    location: { lat, lon }
                }
            });
            console.log('FETCH_SUCCESS dispatched with payload:', {
                current: weatherData,
                forecast: forecastData,
                location: { lat, lon }
            });

        } catch (error) {
            console.error('FetchWeather error:', error.message);
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
  };
*/