import Claim from '../models/Claim.js';

/**
 * Idempotency Middleware: The "Steel Trap"
 * Prevents multiple claims per user per calendar day (UTC) using a deterministic key.
 */
export const checkIdempotency = async (req, res, next) => {
    // For this demo, we use a fallback userId if not provided (Ravi's ID)
    const userId = req.body.userId || "ravi_swig_102"; 
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Create a deterministic "Steel Trap" key: user_id_date
    const dailyKey = `claim_lock_${userId}_${today}`;
    const idempotencyKey = req.body.claimID || req.body.transactionID || req.headers['x-idempotency-key'] || dailyKey;

    try {
        // Atomic Check: Look for an existing claim with this deterministic key
        // Note: Claim.findOne safely returns null if no transaction history is found (Happy Path).
        const existingClaim = await Claim.findOne({ idempotencyKey });

        if (existingClaim) {
            console.warn(`🛑 [Steel Trap] Idempotency Lock Triggered: ${idempotencyKey}`);
            return res.status(429).json({
                status: "fail",
                error: "Transaction already in progress",
                message: "You cannot gain money again. Your daily limit is over. Please come back later!"
            });
        }

        // Attach key to request for the route handler to save in the Claim document
        req.idempotencyKey = idempotencyKey;
        next();
    } catch (error) {
        // If findOne actually throws, it means MongoDB is disconnected or timing out
        console.error("🔥 Idempotency Middleware Error (Database Unreachable):", error.message);
        res.status(500).json({ 
            error: "Internal server error during idempotency check.",
            details: error.message 
        });
    }
};
