import express from 'express';
import mongoose from 'mongoose';
import paymentRoutes from './routes/payments.js';
import cors from 'cors';
import dotenv from 'dotenv';
import engineRoutes from './routes/engine.js'; // <-- NEW

dotenv.config();

// ==========================================
// ENVIRONMENT VARIABLE VALIDATION
// ==========================================
const requiredEnvVars = ['MONGO_URI', 'GEMINI_API_KEY', 'OPENWEATHER_API_KEY'];
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
    console.error(`🚨 FATAL ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
    console.error("Exiting application to prevent cold-start crashes.");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoutes);
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: "success", 
        message: "GigPulse Backend is running perfectly! Ready for Sensor Fusion." 
    });
});

// Plug in the AI and Weather Routes
app.use('/api/engine', engineRoutes); // <-- NEW

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB Database successfully!');
        
        try {
            // "Hackathon Demo" Wipe: Clears existing claims on server restart
            // Guarantees the very first UI click always returns "Success", and the second always triggers Idempotency.
            await mongoose.connection.db.collection('claims').deleteMany({});
            console.log('🧹 DEMO PREP: Cleared previous claims. Your first click will succeed!');
        } catch (err) {
            console.log("⚠️ Could not clear past claims:", err.message);
        }

        app.listen(PORT, () => {
            console.log(`🚀 GigPulse Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error.message);
    });