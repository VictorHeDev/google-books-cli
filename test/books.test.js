// import axios from 'axios';
// import { searchBook, callGoogleBooksApi, displayBookChoices } from './books';

const axios = require('axios');
const {
  searchBook,
  callGoogleBooksApi,
  displayBookChoices,
} = require('../src/books');

jest.mock('axios');

describe('Initial test to see if functions exported correctly', () => {
  test('searchBook function exists', () => {
    expect(typeof searchBook).toEqual('function');
  });
  test('callGoogleBooksApi function exists', () => {
    expect(typeof callGoogleBooksApi).toEqual('function');
  });
  test('displayBookChoices function exists', () => {
    expect(typeof displayBookChoices).toEqual('function');
  });
});

describe('callGoogleBooksApi', () => {
  describe('When API call is successful', () => {
    it('should return an array of 5 book objects', async () => {
      // given
      const books = [];
    });
  });

  describe('when API call fails', () => {
    it('should return an empty array', () => {});
  });
});
