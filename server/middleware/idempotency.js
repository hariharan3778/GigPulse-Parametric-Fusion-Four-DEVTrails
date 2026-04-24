import IdempotencyLock from '../models/IdempotencyLock.js';
import logger from '../utils/logger.js';

/**
 * Idempotency Middleware: The "Steel Trap"
 * Prevents multiple claims per user per calendar day (UTC) using a deterministic key.
 */
export const checkIdempotency = async (req, res, next) => {
    // Strict enforcement: MUST securely provide userId in payload if evaluating idempotency keys per user
    const userId = req.body.userId;
    if (!userId && req.url === '/initiate-claim') {
        return res.status(400).json({ error: "Missing required 'userId' in payload" });
    }
    
    // Strict enforcement: MUST securely provide idempotency key via headers
    const idempotencyKey = req.headers['x-idempotency-key'];
    
    if (!idempotencyKey) {
        return res.status(400).json({
            status: "fail",
            error: "Missing Idempotency Key",
            message: "x-idempotency-key header is required to process claims securely."
        });
    }

    try {
        // Atomic Check: Look for an existing lock with this deterministic key
        // By using upsert: true and new: false, we atomically try to create the lock.
        // If 'existingLock' is not null, it means someone else already placed it!
        const existingLock = await IdempotencyLock.findOneAndUpdate(
            { idempotencyKey },
            { $setOnInsert: { idempotencyKey, createdAt: new Date() } },
            { upsert: true, new: false }
        );

        if (existingLock) {
            logger.warn(`[Steel Trap] Distributed Lock Triggered/Conflict on: ${idempotencyKey}`);
            return res.status(409).json({
                status: "fail",
                error: "Conflict: Transaction already in progress",
                message: "You cannot gain money again. Your daily limit is over. Please come back later!"
            });
        }

        // Attach key to request for the route handler to save in the Claim document
        req.idempotencyKey = idempotencyKey;
        next();
    } catch (error) {
        // If findOneAndUpdate actually throws, it means MongoDB is disconnected or timing out
        logger.error(`Idempotency Middleware Error (Database Unreachable): ${error.message}`);
        res.status(500).json({ 
            error: "Internal server error during idempotency check.",
            details: error.message 
        });
    }
};
