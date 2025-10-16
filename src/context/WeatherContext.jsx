//WeatherContext.jsx (managing global state of weather data), context&provider/holds global state, capitalized/treated as component

//setup context and reducer
import { createContext, useReducer } from 'react';

const WeatherContext = createContext();

//define shape of application state (track 'loading' 'error' 'data'), define initial global state
const initialState = {
    loading: false,
    error: null,
    weatherData: null,
    forecastData: null,
    location: null,
};

//function weatherReducer (takes in a state and an action), reducer function to manage state transitions
const weatherReducer = (state, action) => { 
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        weatherData: action.payload.current,
        forecastData: action.payload.forecast,
        location: action.payload.location,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//export, create the Provider wrapper for app
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

//export
export default WeatherContext;