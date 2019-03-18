const { validate } = require('../../src/models/Planet');
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
})