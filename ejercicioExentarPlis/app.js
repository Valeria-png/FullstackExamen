const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
app.use(cors());
app.use(express.json());
app.use('/api', router);

 // This allows all origins

app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app;