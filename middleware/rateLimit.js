const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMS: 15 * 60 * 100,
    max: 100,
    message: 'Too any attempts, please try again later.'
});

module.exports = limiter;