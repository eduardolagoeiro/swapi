const mongoose = require('mongoose');

const Planet = mongoose.model('Planet', {
  name: String,
  climate: String,
  terrain: String,
  movieApparitions: Number
});

module.exports = Planet;