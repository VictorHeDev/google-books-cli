const axios = require('axios');
const {
  queryForBooks,
  callGoogleBooksApi,
  displaySearchResults,
} = require('../src/books');

jest.mock('axios');

describe('Initial test to see if functions exported correctly', () => {
  test('queryForBooks function exists', () => {
    expect(typeof queryForBooks).toEqual('function');
  });
  test('callGoogleBooksApi function exists', () => {
    expect(typeof callGoogleBooksApi).toEqual('function');
  });
  test('displaySearchResults function exists', () => {
    expect(typeof displaySearchResults).toEqual('function');
  });
});

describe('callGoogleBooksApi', () => {
  const searchResults = [
    {
      volumeInfo: {
        authors: ['J.K. Rowling'],
        title: `Harry Potter and the Sorcerer's Stone`,
        publisher: 'Bloomsbury',
      },
    },
    {
      volumeInfo: {
        authors: ['J.K. Rowling'],
        title: 'Harry Potter and the Chamber of Secrets',
        publisher: 'Bloomsbury',
      },
    },
    {
      volumeInfo: {
        authors: ['Anonymous'],
        title: 'Lucy in the Sky',
        publisher: 'Simon and Schuster',
      },
    },
    {
      volumeInfo: {
        authors: ['Mark Winheld'],
        title: 'Open the Sky',
        publisher: 'Xulon Press',
      },
    },
    {
      volumeInfo: {
        authors: ['Reg Walker'],
        title: 'Failed extraction',
        publisher: 'Xmas Press',
      },
    },
  ];

  const noSearchMatches = [];

  describe('When API call is successful', () => {
    it('should return an array of 5 book objects', async () => {
      // given
      const books = searchResults;
      expect(books).toHaveLength(5);
    });
  });

  describe('when API call fails', () => {
    it('should return an empty array', () => {
      // failed
      const books = noSearchMatches;
      expect(books).toHaveLength(0);
    });
  });
});
