const express = require('express');
const router = express.Router();
const totalBudgetController = require('../controllers/TotalBudgetController');


router.post('/total-budget', totalBudgetController.submitTotalBudget);

module.exports = router;