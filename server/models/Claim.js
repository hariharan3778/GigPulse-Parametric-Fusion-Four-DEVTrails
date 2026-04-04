import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    triggerEvent: { type: String, default: "Severe Storm (>50mm)" },
    aiTrustScore: { type: Number, required: true }, 
    payoutAmount: { type: Number, default: 400 },
    // The Rollback Metric: Status must be precise so we don't lose money
    status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Claim', claimSchema);