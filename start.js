const express = require('express');
const app = express();
const port = 3000;


const router = require('./routers');

app.use(express.json());
app.use('/api', router);

const server = app.listen(port, () => console.log(`Starting server on http://localhost:${port}`));

module.exports = server;