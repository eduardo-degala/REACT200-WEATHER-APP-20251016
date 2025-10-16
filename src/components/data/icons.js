//icons.js (for weather conditions)

//BOOTSTRAP ICONS
const weatherIcons = {                                                      //maps weather conditions to matching image URLs
  Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",           //sun
  Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",          //cloud
  Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",          //rain cloud
  Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",            //snowflake
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",  //storm
  Drizzle: "https://cdn-icons-png.flaticon.com/512/414/414974.png",         //light rain
  Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",          //mist
  Fog: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",           //fog
  Haze: "https://cdn-icons-png.flaticon.com/512/728/728093.png",            //haze
};

//OPENWEATHERMAP.ORG ICONS
const iconMap = {
  // Clear
  '01d': 'clear-day.svg',
  '01n': 'clear-night.svg',

  // Few clouds
  '02d': 'partly-cloudy-day.svg',
  '02n': 'partly-cloudy-night.svg',

  // Scattered clouds
  '03d': 'cloudy.svg',
  '03n': 'cloudy.svg',

  // Broken clouds
  '04d': 'overcast.svg',
  '04n': 'overcast.svg',

  // Shower rain
  '09d': 'shower-rain.svg',
  '09n': 'shower-rain.svg',

  // Rain
  '10d': 'rain-day.svg',
  '10n': 'rain-night.svg',

  // Thunderstorm
  '11d': 'thunderstorm.svg',
  '11n': 'thunderstorm.svg',

  // Snow
  '13d': 'snow.svg',
  '13n': 'snow.svg',

  // Mist / Fog / Haze etc.
  '50d': 'mist.svg',
  '50n': 'mist.svg',
};
// https://openweathermap.org/img/wn/{icon_code}@2x.png
// <img src="https://openweathermap.org/img/wn/10n@2x.png" />

const getCustomIcon = (iconCode) => {
  return iconMap[iconCode] || 'default.svg';
};

/*
ICON CODES:

OpenWeatherMap provides an icon field in the API response, which directly corresponds to a specific weather condition visual.

"weather": [
  {
    "id": 500,
    "main": "Rain",
    "description": "light rain",
    "icon": "10d"
  }
]

https://openweathermap.org/img/wn/10d@2x.png
    icon=10d







ICON MAPPING (BASED UPON id field):

function getWeatherIcon(conditionId, isDaytime) {
  if (conditionId >= 200 && conditionId < 300) {
    return 'icons/thunderstorm.svg';
  } else if (conditionId >= 300 && conditionId < 400) {
    return 'icons/drizzle.svg';
  } else if (conditionId >= 500 && conditionId < 600) {
    return 'icons/rain.svg';
  } else if (conditionId >= 600 && conditionId < 700) {
    return 'icons/snow.svg';
  } else if (conditionId >= 700 && conditionId < 800) {
    return 'icons/atmosphere.svg';
  } else if (conditionId === 800) {
    return isDaytime ? 'icons/clear-day.svg' : 'icons/clear-night.svg';
  } else if (conditionId > 800 && conditionId < 900) {
    return 'icons/clouds.svg';
  } else {
    return 'icons/default.svg';
  }
}

OpenWeatherMap's API provides a comprehensive set of weather condition codes that map to specific icons. These codes are categorized into several main groups:
1. Thunderstorm:
2xx codes represent various types of thunderstorms, such as light thunderstorm, thunderstorm with rain, heavy thunderstorm, ragged thunderstorm, etc.
Associated icons often depict a cloud with a lightning bolt and rain.
2. Drizzle:
3xx codes represent different types of drizzle, including light drizzle, drizzle, heavy drizzle, and shower drizzle.
Icons typically show a cloud with light rain falling.
3. Rain:
5xx codes cover various rain conditions, such as light rain, moderate rain, heavy intensity rain, very heavy rain, extreme rain, and different types of shower rain.
Icons usually show a cloud with raindrops.
4. Snow:
6xx codes are for snow conditions, including light snow, snow, heavy snow, sleet, light shower sleet, shower sleet, light rain and snow, rain and snow, light shower snow, shower snow, and heavy shower snow.
Icons depict a cloud with snowflakes.
5. Atmosphere:
7xx codes represent atmospheric conditions like mist, smoke, haze, sand/dust whirls, fog, sand, dust, volcanic ash, squalls, and tornado.
Icons vary based on the specific condition, e.g., fog might be represented by a cloud covering the ground, while a tornado would have a distinct funnel cloud icon.
6. Clear:
800 represents clear sky.
Icons are typically a sun for daytime and a moon for nighttime.
7. Clouds:
80x codes (801-804) represent different levels of cloudiness, from few clouds to overcast clouds.
Icons generally show clouds, with varying amounts of cloud cover.
8. Exceptional:
90x codes are for exceptional weather conditions like tornado, tropical storm, hurricane, cold, hot, windy, and hail.
Icons are specific to each severe condition.
To match these conditions to icons:
Retrieve the weather array from the OpenWeatherMap API response. This array contains objects with information about the current weather, including a main description (e.g., "Rain"), a description (e.g., "light rain"), an id (the condition code), and an icon code.
Use the icon code directly. OpenWeatherMap provides specific icon codes (e.g., 01d for clear sky day, 09n for shower rain night). You can then map these codes to your desired visual icons.
Alternatively, use the id (condition code) or main description to create custom icon mapping. This allows for more flexibility in your icon design.
By utilizing these condition codes and icon codes provided by the OpenWeatherMap API, you can accurately display the current weather conditions with corresponding visual representations.


ICONS DAYTIME/NIGHTIME PER LAT/LON TIMEZONE

Get Sunrise and Sunset Times from OpenWeatherMap
The One Call API (or Current Weather API) provides sunrise and sunset timestamps (in UTC) for the requested location.

"sys": {
  "sunrise": 1696857600,
  "sunset": 1696900800
},
"timezone": 3600  // in seconds (UTC+1)

const sunriseLocal = new Date((sunriseUTC + timezoneOffset) * 1000);
const sunsetLocal = new Date((sunsetUTC + timezoneOffset) * 1000);
const nowLocal = new Date((Date.now() + timezoneOffset * 1000));

const isDaytime = nowUTC >= sunriseUTC && nowUTC < sunsetUTC;

function getWeatherIcon(conditionId, isDaytime) {
  if (conditionId === 800) {
    return isDaytime ? 'clear-day.svg' : 'clear-night.svg';
  } else if (conditionId >= 801 && conditionId <= 804) {
    return isDaytime ? 'cloudy-day.svg' : 'cloudy-night.svg';
  }
  // Add other mappings...
}

ICONS DAYTIME/NIGHTIME PER LAT/LON TIMEZONE
    SUNCALC
    npm install suncalc
    import SunCalc from 'suncalc';

const times = SunCalc.getTimes(new Date(), lat, lon);
const now = new Date();

const isDaytime = now > times.sunrise && now < times.sunset;

WEATHER WIDGET (static location)
https://weatherwidget.io
<a class="weatherwidget-io" href="https://forecast7.com/en/40d71n74d01/new-york/" data-label_1="NEW YORK" data-label_2="WEATHER" data-theme="original" >NEW YORK WEATHER</a>
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
</script>

*/