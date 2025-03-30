const mongoose = require('mongoose');

const envelopeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Envelope = mongoose.model('Envelope', envelopeSchema);

module.exports = Envelope;


