const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/planets', require('./routes/planet'));

module.exports = app;

