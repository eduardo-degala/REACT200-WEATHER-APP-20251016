//WeatherMap.jsx (props f/useWeather.js)

import WeatherWidget from './WeatherWidget'; 
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";                                  //leaflet is core functionality for interactive maps & npm install react-leaflet leaflet, prob 5.0.0 reqs React19 but React18.3.1, run older npm install react-leaflet@^4.0.0 leaflet
                                                                    //map tiles, prerendered image files for small sections of map per zoom level, instead of rendering entire global set, tile server, requires z, x, y values

//RECENTER F/RESET
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom(), {
        animate: true,
      });
    }
  }, [lat, lon, map]);

  return null;
};

//WEATHERMAP
const WeatherMap = ({ lat, lon, zoomLevel = 8 }) => {              //latitude/longitude f/GeoCode API, map zoom is {z}, the lower zoom out, higher zoom in
    const [isClient, setIsClient] = useState(false);                //creates a state variable, isClient initialized to false
                                                                    //isClient=am i running on a client browser?, initial assumption false aka not
    useEffect(() => {               //this runs only on client, not on server-side rendering aka SSR
        setIsClient(true);          //true=i'm now sure i'm running on the client browser
    }, []);                         //Leaflet runs on API, prevents map f/running on server, avoid crash/errors

    if (!isClient) return null;     //SSR-safe: skip rendering on server, null=render nothing

    const API_KEY = import.meta.env.VITE_API_KEY;                     //.ENV api key for OpenWeatherMap

    const precipitationLayer = "precipitation_new";                   //added addl layers to supplement precip w/rain & clouds

//extra error protections
if (!lat || !lon) 
    return (
    <div className="text-center mb-6 text-gray-600">
      <p className="mb-10">Location not provided.</p>
      <p className="mb-10">Showing general weather conditions for your region:</p>
      <div className="flex justify-center">
        <WeatherWidget />
      </div>
    </div>
  );

if (!API_KEY) {
  console.error("OpenWeatherMap API key is missing");
  return <p>API key not configured</p>;
}




  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "0.375rem", overflow: "hidden" }}>
      <MapContainer center={[lat, lon]} zoom={zoomLevel} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>

        {/* RECENTER f/location update */}
        <RecenterMap lat={lat} lon={lon} />

        {/* BASE MAP - OpenStreetMap */}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* PRECIPITATION - OpenWeatherMap */}
        <TileLayer
            attribution='Weather data © <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/${precipitationLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={.9}
        />

        {/* RAIN - OpenWeatherMap */}
        <TileLayer
            url={`https://tile.openweathermap.org/map/rain/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.9}
        />

        {/* CLOUDS - OpenWeatherMap */}
        <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.3}
        />

        <Marker position={[lat, lon]}>
          <Popup>
            Current Location<br />({lat.toFixed(2)}, {lon.toFixed(2)})
          </Popup>
        </Marker>
      </MapContainer>
    </div>

    
  );
};

export default WeatherMap;

//send to import on App.jsx or WeatherDisplay.jsx, CHOSE WEATHERDISPLAY

/*
NOTE:
MARKER does not work on VERCEL due to prerender server-side rendering SSR

Locally (with Vite dev server), your app runs only in the browser — Leaflet 
    has access to window, document, and all DOM APIs, so Marker works fine.
On Vercel, if you deployed a site that does server-side rendering (SSR) or 
    static pre-rendering, Leaflet’s Marker tries to run on the server, which 
    lacks those browser APIs, so it silently fails or is stripped out.
*/