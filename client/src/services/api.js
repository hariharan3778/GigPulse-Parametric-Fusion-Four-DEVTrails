import axios from 'axios';

// 1. Pointed the base instance to your live Render API
const api = axios.create({
  baseURL: 'https://gigpulse-parametric-fusion-four-devtrails.onrender.com/api',
});

/**
 * 1. Weather Engine Trigger
 * Payload: { "lat": 28.7041, "lon": 77.1025 }
 */
export const checkWeatherEngine = async (coords) => {
  try {
    const response = await api.post('/engine/check-weather', coords);
    return response.data;
  } catch (error) {
    console.error('Weather Engine Error:', error);
    throw error;
  }
};

/**
 * 2. AI Fraud Check Engine
 * Payload: { "accelerometer": { "x": 12.5, "y": -8.2, "z": 15.1 }, "barometer_hPa": 998 }
 */
export const verifyFraudEngine = async (sensorData) => {
  try {
    const response = await api.post('/engine/verify-trust', sensorData);
    return response.data;
  } catch (error) {
    console.error('Fraud Engine Error:', error);
    throw error;
  }
};

/**
 * 3. Final Payout Processor
 */
export const processPayout = async (claimData) => {
  try {
    // 2. Fixed the sneaky hardcoded localhost URL here! 
    // Now it uses the dynamic baseURL properly.
    const response = await api.post('/payment/initiate-claim', claimData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error during payout processing:', error);
    throw error;
  }
};

export default api;