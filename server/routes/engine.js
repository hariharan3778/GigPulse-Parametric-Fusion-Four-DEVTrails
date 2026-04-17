import express from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

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
        console.error("Weather API Error:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// ==========================================
// 2. THE GEMINI SENSOR FUSION ROUTE (Fraud Verification)
// ==========================================
router.post('/verify-trust', async (req, res) => {
    try {
        // --- Resilience Layer 1: Environment Variable Check ---
        if (!process.env.GEMINI_API_KEY) {
            console.error("🔥 CRITICAL: GEMINI_API_KEY is missing from environment. Engaging fallback.");
            return res.status(503).json({ 
                error: "AI Service Temporarily Unavailable",
                sensor_analysis: { isSpoof: false, trustScore: 50, reason: "Fallback mode: AI Offline" }
            });
        }

        // Lazy-load the model
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // --- Resilience Layer 2: Payload Verification ---
        const { accelerometer, barometer_hPa } = req.body;
        
        if (!accelerometer || !barometer_hPa) {
            console.warn("⚠️ Bad Request: Missing required telemetry payload.");
            return res.status(400).json({ 
                error: "Bad Request: Both accelerometer and barometer_hPa data are required." 
            });
        }

        const prompt = `
        You are an InsurTech anti-fraud AI evaluating a gig worker's claim. 
        A severe storm is happening, but we need to verify the worker is actually outside on a motorcycle, NOT spoofing their GPS from a desk.
        
        Analyze this raw smartphone sensor data:
        - Accelerometer Variance (X, Y, Z): ${JSON.stringify(accelerometer)}
        - Barometer: ${barometer_hPa} hPa
        
        Rules for evaluation:
        1. If accelerometer variance is near [0, 0, 0], the phone is sitting flat on a table. This is a SPOOFING ATTACK.
        2. A motorcycle in a storm will have high, chaotic variance.
        3. A dropping barometer (below 1005 hPa) confirms bad weather locally.
        
        Respond ONLY with a valid JSON object in this exact format:
        { "isSpoof": boolean, "trustScore": number, "reason": "short explanation" }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
        const aiDecision = JSON.parse(cleanJson);

        console.log(`🤖 Gemini AI Trust Analysis Complete. Score: ${aiDecision.trustScore}%`);

        return res.status(200).json({
            status: "success",
            sensor_analysis: aiDecision
        });

    } catch (error) {
        // --- Resilience Layer 3: Catch-All but Keep Alive ---
        console.error("🔥 Fraud Engine Unhandled Exception:", error.message);
        return res.status(500).json({ 
            error: "Internal Server Error during AI Trust Score calculation.",
            details: error.message 
        });
    }
});

export default router;