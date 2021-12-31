const {
  retrieveReadingListJSON,
  addBooksToReadingList,
  retrieveReadingList,
  resetReadingList,
} = require('../src/reading_list');

describe('Initial test to see if functions exported correctly', () => {
  test('retrieveReadingListJSON function exists', () => {
    expect(typeof retrieveReadingListJSON).toEqual('function');
  });

  test('addBooksToReadingList function exists', () => {
    expect(typeof addBooksToReadingList).toEqual('function');
  });
  test('retrieveReadingList function exists', () => {
    expect(typeof retrieveReadingList).toEqual('function');
  });
  test('resetReadingList function exists', () => {
    expect(typeof resetReadingList).toEqual('function');
  });
});
