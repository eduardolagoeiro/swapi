const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

beforeAll(done => {
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, done);
});

afterAll(done => {
  mongoose.disconnect(done);
});

describe('Test the planets route', () => {

  test('/planets return 200 and array', async () => {
    const response = await request(app).get('/planets');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(response.text))).toBe(true);
  });

  test('/planets/:id return 200 and obj', async () => {
    const response = await request(app).get('/planets');
    const planets = JSON.parse(response.text);
    if(planets.length != 0){
      const planetByIdResponse = await request(app).get(`/planets/${planets[0]._id}`);
      expect(planetByIdResponse.statusCode).toBe(200);
      const planet = JSON.parse(planetByIdResponse.text);
      expect(planet).toMatchObject(planets[0]);
    }
  });

  test('/planets/:id return 404', async () => {
    const response = await request(app).get('/planets/notvalidid');
    expect(response.statusCode).toBe(404);
  });

})