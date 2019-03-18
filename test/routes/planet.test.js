const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Planet = require('../../src/models/planet');
const {add} = require('../../src/controllers/planet');

beforeAll(done => {
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, done);
});

afterAll(done => {
  mongoose.disconnect(done);
});

describe('Test the planets route', () => {

  //clean db and insert
  beforeEach( async () => {
    await Planet.deleteMany({});
    await add({
      name: 'planet1',
      terrain: 'terrain1',
      climate: 'climate1'
    });
  });

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

  test('/planets post create a resource', async () => {
    const obj = {
      name: 'nametest',
      climate: 'climatetest',
      terrain: 'terraintest'
    };
    const createResult = await request(app)
      .post('/planets')
      .send(obj)
    expect(createResult.statusCode).toBe(200);
    const planet = JSON.parse(createResult.text);
    expect(planet).toMatchObject(obj);
    expect(planet._id).toBeDefined();
  })

  test('/planets delete by id correctly', async () => {
    const response = await request(app).get('/planets');
    const planets = JSON.parse(response.text);
    const deletePlanetResponse = await request(app).delete(`/planets/${planets[0]._id}`);
    expect(deletePlanetResponse.statusCode).toBe(200);
    const planet = JSON.parse(deletePlanetResponse.text);
    const deletedId = planet._id;
    expect(planet).toMatchObject(planets[0]);
    const findPlanetByIdResponse = await request(app).get(`/planets/${deletedId}`);
    expect(findPlanetByIdResponse.statusCode).toBe(404);
  })

  test('/planets delete by id 404', async () => {
    const deletePlanetResponse = await request(app).delete('/planets/5c8f04e6134a8300922c46f3');
    expect(deletePlanetResponse.statusCode).toBe(404);
  })

})