const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    nextPaymentDate: { 
        type: Number,
        require: true }
});

module.exports = mongoose.model('Countdown', countdownSchema);
