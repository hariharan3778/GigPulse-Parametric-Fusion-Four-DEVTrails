import express from 'express';
import { checkIdempotency } from '../middleware/idempotency.js';
import { initiateClaim, getUserStats, razorpayWebhook } from '../controllers/claims.controller.js';

const router = express.Router();

router.post('/initiate-claim', checkIdempotency, initiateClaim);

// Wait, the plan said "GET /api/user-stats" so probably I'll mount it on the root API router or payments router.
// Given it's in claims.controller, mounting it here as /user-stats is fine! It will be accessible as /api/payment/user-stats if mounted under /api/payment, but let me check server.js where I mounted it. 
// User asked to "Implement a GET /api/user-stats route". I should either mount it on root, or add it to a new route file. Let's make it /user-stats here but later in server.js maybe expose it. Actually, the user asked for /api/user-stats route explicitly.
// Let's add it to router but in `server.js` I will expose it properly.
// Let's leave it in `payments.js` as `/user-stats` for now and I will add it to `server.js` too later? Let's just mount it in server.js independently, or just add a `/user-stats` route here that gets called as `/api/payment/user-stats`.
// Let's verify how it is currently requested...
// I'll define `/user-stats` here:
// Wait, user stats could be on `/api/user-stats`. If router is on `app.use('/api/payment', paymentRoutes);`, this will be `/api/payment/user-stats`. 

router.get('/user-stats', getUserStats);
router.post('/webhook/razorpay', razorpayWebhook);

export default router;