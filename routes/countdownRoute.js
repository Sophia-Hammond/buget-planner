const express = require('express');
const { setNextPaymentDate, getNextPaymentDate } = require('../controllers/countdownController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/set', authMiddleware, setNextPaymentDate);

router.get('/', authMiddleware, getNextPaymentDate);

module.exports = router;