import express from 'express';
import axios from 'axios';
import fraudEngineService from '../services/fraudEngine.service.js';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();
const router = express.Router();

// Gemini AI model is lazy-loaded inside the trust verification route to prevent boot crashes if the API key is missing.

// ==========================================
// 1. THE WEATHER TRIGGER ROUTE (Guidewire Slide 4)
// ==========================================
router.post('/check-weather', async (req, res) => {
    try {
        const { lat, lon } = req.body;
        const apiKey = process.env.OPENWEATHER_API_KEY;

        // Ping OpenWeatherMap for the specific ward
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await axios.get(weatherUrl);
        const data = response.data;

        // Extract rain data (1 hour volume)
        const rainVolume = data.rain ? data.rain['1h'] : 0; 
        const isSevereStorm = rainVolume > 10; 

        res.status(200).json({
            status: "success",
            location: data.name,
            weather: data.weather[0].description,
            rain_1h_mm: rainVolume,
            trigger_payout: isSevereStorm
        });

    } catch (error) {
        logger.error(`Weather API Error: ${error.message}`);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// ==========================================
// 2. THE GEMINI SENSOR FUSION ROUTE (Fraud Verification)
// ==========================================
router.post('/verify-trust', async (req, res) => {
    try {
        const { accelerometer, barometer_hPa } = req.body;
        
        if (!accelerometer || !barometer_hPa) {
            logger.warn("Bad Request: Missing required telemetry payload.");
            return res.status(400).json({ 
                error: "Bad Request: Both accelerometer and barometer_hPa data are required." 
            });
        }

        const aiDecision = await fraudEngineService.verifyTrust(accelerometer, barometer_hPa);

        if (aiDecision.decision === 'REJECTED_SPOOF') {
            logger.warn(`Spoofing Detected. Trace ID: ${aiDecision.traceId}`);
            return res.status(403).json({
                status: "fail",
                error: "Forbidden: Telemetry manipulation detected",
                traceId: aiDecision.traceId,
                sensor_analysis: aiDecision
            });
        }

        return res.status(200).json({
            status: "success",
            sensor_analysis: aiDecision
        });

    } catch (error) {
        logger.error(`Fraud Verification Error: ${error.message}`);
        return res.status(500).json({ error: "Failed to verify trust" });
    }
});

export default router;