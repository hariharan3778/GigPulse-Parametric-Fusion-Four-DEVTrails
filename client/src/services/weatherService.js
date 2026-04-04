import axios from 'axios';

const API_KEY = 'ed0cc581753afabf924b112ddf575dd7';
const CHENNAI_COORDS = { lat: 13.0827, lon: 80.2707 };

/**
 * Fetches real-time weather data for Chennai.
 * Used for parametric trigger validation.
 */
export const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CHENNAI_COORDS.lat}&lon=${CHENNAI_COORDS.lon}&appid=${API_KEY}&units=metric`
    );
    
    // In OpenWeatherMap, rainfall data (rain.1h or rain.3h) is the key metric for our trigger.
    return {
      temp: response.data.main.temp,
      rain: response.data.rain ? (response.data.rain['1h'] || 0) : 0,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      raw: response.data
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
