import mongoose from 'mongoose';
import Claim from '../models/Claim.js';
import User from '../models/User.js';
import fraudEngineService from '../services/fraudEngine.service.js';
import logger from '../utils/logger.js';
export const initiateClaim = async (req, res) => {
    logger.info("Payout Request Received");
    try {
        const { userId, rain_1h_mm, aiTrustScore, isFraud, reason } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: "Missing required 'userId' in payload" });
        }
        
        // 1. Get a valid user (Strict DB Lookup)
        let worker;
        try {
            worker = await User.findById(userId);
        } catch (err) {
            // Fallback for hackathon demo dummy Strings like "ravi_swig_102"
            worker = await User.findOne();
        }
        
        if (!worker) {
            logger.warn(`User not found for ID: ${userId}`);
            return res.status(404).json({ error: "User not found. Cannot process claim." });
        }

        const userIdStr = worker._id.toString();
        logger.info(`Processing claims for User: ${userIdStr}`);

        // Calculate dynamic payout
        const payoutAmt = fraudEngineService.calculatePayout(rain_1h_mm || 0);

        // Even with idempotency check, we should prevent payout if we calculate 0 payout
        if (payoutAmt === 0 && !isFraud) {
             return res.status(400).json({
                 success: false,
                 message: "Rainfall condition not met for payout"
             });
        }

        // 3. Save the Claim as Pending
        const newClaim = new Claim({
            userId: userIdStr,
            payoutAmount: payoutAmt,
            status: 'Pending', // Awaiting Razorpay Webhook
            timestamp: new Date(),
            aiTrustScore: aiTrustScore || 0,
            isFraud: isFraud || false,
            reason: reason || 'Verified via Sensor Fusion (Demo Mode)',
            idempotencyKey: req.idempotencyKey,
            triggerEvent: rain_1h_mm ? `Severe Storm (${rain_1h_mm}mm)` : "Unknown Weather Event"
        });

        await newClaim.save();
        logger.info(`Claim Created as Pending (ID: ${newClaim._id})`);

        return res.status(200).json({ 
            success: true, 
            message: `Claim initiated successfully for ₹${payoutAmt}. Awaiting webhook.`,
            claimId: newClaim._id,
            payoutAmount: payoutAmt
        });

    } catch (error) {
        logger.error(`BACKEND CRASH ERROR: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
};

export const getUserStats = async (req, res) => {
    try {
        let worker = await User.findOne();
        if (!worker) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const claims = await Claim.find({ userId: worker._id }).sort({ timestamp: -1 });

        return res.status(200).json({
            success: true,
            user: worker,
            claims: claims
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const razorpayWebhook = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { status, claimId } = req.body;
        
        if (status !== 'success') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: "Invalid webhook status" });
        }

        const claim = await Claim.findById(claimId).session(session);
        if (!claim) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: "Claim not found" });
        }

        if (claim.status === 'Paid') {
            await session.abortTransaction();
            session.endSession();
            return res.status(200).json({ message: "Claim already paid" });
        }

        // Update Claim Status
        claim.status = 'Paid';
        await claim.save({ session });

        // Update User wallet
        const user = await User.findById(claim.userId).session(session);
        if (user) {
            user.walletBalance += claim.payoutAmount;
            await user.save({ session });
            logger.info(`User ${user._id} wallet credited with ₹${claim.payoutAmount}`);
        }

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ success: true, message: "Webhook processed, payout completed atomically." });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        logger.error(`Webhook Error: ${error.message}`);
        return res.status(500).json({ error: "Webhook processing failed" });
    }
};
