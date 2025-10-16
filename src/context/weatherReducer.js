//weatherReducer.js (reducer logic), decides how to update state

export const initialState = {
  loading: false,
  error: null,
  weatherData: null,
  forecastData: null,
  weatherMap: null,
};

export default function weatherReducer(state, action) {
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
        weatherMap: action.payload.location,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'RESET': {
    console.log('Resetting state to initial state, weatherReducer.js case RESET');
      
        //...initialState,
        //loading: false,
        //error: null,
        //weatherData: null,
        //forecastData: null,
        //weatherMap: null,
        
        return initialState;
    }
    default:
        return state;
  }
}