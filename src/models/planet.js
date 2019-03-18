const mongoose = require('mongoose');

const Planet = mongoose.model('Planet', {
  name: String,
  clime: String,
  terrain: String
});

module.exports = Planet;