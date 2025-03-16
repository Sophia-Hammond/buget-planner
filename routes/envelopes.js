const express = require('express');
const router = express.Router();

const envelopeController = require('../controllers/envelopeController');
const totalBudgetController = require('../controllers/TotalBudgetController');

router.post('/', envelopeController.createEnvelope);
router.get('/', envelopeController.getAllEnvelopes);
router.get('/total budget', envelopeController.getTotalBudget);

router.post('/total-budget', totalBudgetController.submitTotalBudget);

module.exports = router;