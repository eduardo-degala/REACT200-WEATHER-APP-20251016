//backend/server.js

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('❌ API_KEY is undefined. Check your .env file and dotenv config.');
}

const app = express();

// Unified route to handle geocoding, current weather, and forecast
app.get('/api/weather', async (req, res) => {
  const { city, state, country } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Build query string for geocoding
    let query = city;
    if (state) query += `,${state}`;
    if (country) query += `,${country}`;

    // Step 1: Geocoding API
    const geoRes = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: query,
        limit: 1,
        appid: API_KEY,
      },
    });

    const geoData = geoRes.data;
    if (!geoData.length) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const { lat, lon } = geoData[0];

    // Step 2: Current Weather API
    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'imperial',
      },
    });

    // Step 3: Forecast API
    const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'imperial',
      },
    });

    // Send back a structured response
    res.json({
      current: weatherRes.data,
      forecast: forecastRes.data,
      location: { lat, lon },
    });

  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default app;

/*
npm run dev
http://localhost:5173
*/