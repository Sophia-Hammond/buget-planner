const express = require('express');
const router = express.Router();
const totalBudgetController = require('../controllers/TotalBudgetController');

router.get('/', totalBudgetController.calculateAndSaveTotalBudget);

module.exports = router;