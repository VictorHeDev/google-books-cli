const { mainLoop } = require('../src/index');

describe('Initial test to see if functions exported correctly', () => {
  test('searchBook function exists', () => {
    expect(typeof mainLoop).toEqual('function');
  });
});
