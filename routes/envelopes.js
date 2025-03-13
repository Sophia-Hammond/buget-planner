const express = require('express');
const router = express.Router();
const envelopeController = require('../controllers/envelopeController');

router.post('/', envelopeController.createEnvelope);

router.get('/', envelopeController.getAllEnvelopes);

router.get('/total budget', envelopeController.getTotalBudget);

module.exports = router;