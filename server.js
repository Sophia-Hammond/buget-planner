
const express = require('express');
const morganLogger = require('./middleware/morganLogger');
const rateLimiter = require('./middleware/rateLimit');
const helmetMiddleware = require('./middleware/helmet');

const app = express();

app.use(helmetMiddleware);

app.get('/', (req, res) => {
    res.send('Hello!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});