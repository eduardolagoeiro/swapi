const { validate, add } = require('../../src/models/Planet');
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

  test('add shoudl be defined', async () => {
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