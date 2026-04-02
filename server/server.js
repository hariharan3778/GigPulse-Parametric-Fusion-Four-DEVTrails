import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import engineRoutes from './routes/engine.js'; // <-- NEW

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
    .then(() => {
        console.log('✅ Connected to MongoDB Database successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 GigPulse Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error.message);
    });