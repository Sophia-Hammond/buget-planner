const express = require('express');
const router = express.Router();
const envelopeController = require('../controllers/envelopeController');

// Route for creating an envelope
router.post('/', envelopeController.createEnvelope);

// Route for getting all envelopes
router.get('/', envelopeController.getAllEnvelopes);

module.exports = router;
