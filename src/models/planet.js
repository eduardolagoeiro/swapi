const mongoose = require('mongoose');

const Planet = mongoose.model('Planet', {
  name: String,
  climate: String,
  terrain: String
});

module.exports = Planet;