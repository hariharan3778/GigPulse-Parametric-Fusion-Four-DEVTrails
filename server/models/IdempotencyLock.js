import mongoose from 'mongoose';

const idempotencyLockSchema = new mongoose.Schema({
    idempotencyKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h' // Automatically clear locks after 24 hours
    }
});

export default mongoose.model('IdempotencyLock', idempotencyLockSchema);
