import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Claim from '../models/Claim.js';

const router = express.Router();

router.post('/initiate-claim', async (req, res) => {
    console.log("🚀 Payout Request Received!");
    try {
        // 1. Get a valid user (Bypassing Kavi's dummy ID)
        let worker = await User.findOne();
        
        if (!worker) {
            console.log("⚠️ No user found, creating mock for demo...");
            worker = await User.create({
                name: "Ravi Kumar",
                phone: "9876543210",
                walletBalance: 0,
                activeDeliveryDays: 26,
                policyActive: true
            });
        }

        const userIdStr = worker._id.toString();
        console.log(`🔍 Checking claims for User: ${userIdStr}`);

        // 2. Atomic Idempotency Check (Date-Check for today)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const existingClaim = await mongoose.connection.db.collection('claims').findOne({ 
            $or: [
                { userId: userIdStr },
                { userId: new mongoose.Types.ObjectId(userIdStr) }
            ],
            timestamp: { $gte: startOfDay }
        });

        if (existingClaim) {
            console.log("🛑 IDEMPOTENCY TRIGGERED: Blocking duplicate.");
            return res.status(429).json({ error: "Limit reached! Come back later." });
        }

        // 3. Save the Claim
        const newClaim = new Claim({
            userId: userIdStr,
            amount: 400,
            status: 'Paid',
            timestamp: new Date(),
            aiTrustScore: 92,
            isFraud: false,
            reason: 'Verified via Sensor Fusion (Demo Mode)'
        });

        await newClaim.save();
        console.log('DEBUG: Just saved ID ' + userIdStr);
        console.log("✅ Payout Successful! Claim Saved.");

        return res.status(200).json({ 
            success: true, 
            message: "₹400 Payout Disbursed Successfully!" 
        });

    } catch (error) {
        console.error("🔥 BACKEND CRASH ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;