import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        email: { type: String, required: true, index: true },
        company: { type: String, required: true, index: true },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'Qualified', 'Lost'],
            default: 'New',
            index: true
        },
        owner: { type: String, required: true, index: true },
        createdAt: { type: Date, default: Date.now, index: true }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

// Text index for global search on name, email, company
leadSchema.index({ name: 'text', email: 'text', company: 'text' });

// Compound index to accelerate common filters + sorting
leadSchema.index({ status: 1, owner: 1, createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);