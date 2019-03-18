const axios = require('axios');

module.exports = {
  findByName: async name => axios.get(`${process.env.SWAPI_URL}planets?search=${name}`)
}