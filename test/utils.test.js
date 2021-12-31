const {
  clearConsole,
  checkForValidTitle,
  formatSearchResults,
  formatReadingList,
} = require('../src/utils');

describe('Initial test to see if functions exported correctly', () => {
  test('clearConsole function exists', () => {
    expect(typeof clearConsole).toEqual('function');
  });

  test('checkForValidTitle function exists', () => {
    expect(typeof checkForValidTitle).toEqual('function');
  });
  test('formatSearchResults function exists', () => {
    expect(typeof formatSearchResults).toEqual('function');
  });
  test('formatReadingList function exists', () => {
    expect(typeof formatReadingList).toEqual('function');
  });
});
