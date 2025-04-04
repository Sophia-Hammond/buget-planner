const mongoose = require('mongoose');

const totalBudgetSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TotalBudget', totalBudgetSchema);