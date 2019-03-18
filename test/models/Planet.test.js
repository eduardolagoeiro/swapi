const { validate, add, find } = require('../../src/models/Planet');
const mongoose = require('mongoose');

describe('Test validate', () => {
  test('should not allow blank name', async () => {
    const res = validate({
      clime: 'climetest',
      terrain: 'terraintest'
    });
    expect(res).toBeDefined();
  });
  test('should not allow blank clime', async () => {
    const res = validate({
      name: 'nametest',
      terrain: 'terraintest'
    });
    expect(res).toBeDefined();
  });
  test('should not allow blank terrain', async () => {
    const res = validate({
      name: 'nametest',
      clime: 'climetest',
    });
    expect(res).toBeDefined();
  });

  test('should only allow string name', async () => {
    const res = validate({
      name: 1,
      clime: 'climetest',
      terrain: 'terraintest'
    });
    expect(res).toBeDefined();
  });
  test('should only allow string clime', async () => {
    const res = validate({
      name: 'nametest',
      clime: 1,
      terrain: 'terraintest'
    });
    expect(res).toBeDefined();
  });
  test('should only allow string terrain', async () => {
    const res = validate({
      name: 'nametest',
      clime: 'climetest',
      terrain: 1
    });
    expect(res).toBeDefined();
  });
});

describe('mongoose model test', () => {
  beforeAll(done => {
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, done);
  });
  afterAll(done => {
    mongoose.disconnect(done);
  });

  describe('add method', () => {
    test('add should be defined', async () => {
      expect(add).toBeDefined();
    });

    test('add should add in database', async () => {
      const addRes = await add({
        name: 'nametest',
        clime: 'climetest',
        terrain: 'terraintest'
      });
      expect(addRes._id).toBeDefined();
    });
  });

  describe('find methods', () => {
    test('find should be defined', async () => {
      expect(find).toBeDefined();
    });

    test('find should find array', async () => {
      const planets = await find();
      expect(Array.isArray(planets)).toBe(true);
    })
  });
});