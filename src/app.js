const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/planets', require('./routes/planet'));

module.exports = app;

