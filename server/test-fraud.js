// test-fraud.js
import axios from 'axios';

async function runFraudSimulation() {
    console.log("🚨 Initiating Simulated Spoofing Attack...");

    const payload = {
        // Flat on a table variance (barely moving)
        accelerometer: { x: 0.01, y: -0.02, z: 0.05 }, 
        barometer_hPa: 1012 // Normal pressure, no storm
    };

    try {
        const response = await axios.post('http://localhost:5017/api/engine/verify-fraud', payload);
        console.log("\n🧠 Gemini AI Verdict:");
        console.log(JSON.stringify(response.data.sensor_analysis, null, 2));
    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    }
}

runFraudSimulation();