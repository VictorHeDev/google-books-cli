const { runMainLoop, kickoffMainLoop } = require('../src/index');

describe('Initial test to see if functions exported correctly', () => {
  test('runMainLoop function exists', () => {
    expect(typeof runMainLoop).toEqual('function');
  });

  test('kickoffMainLoop function exists', () => {
    expect(typeof kickoffMainLoop).toEqual('function');
  });
});
