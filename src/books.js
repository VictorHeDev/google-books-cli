const axios = require('axios');
const inquirer = require('inquirer');
const { clearConsole } = require('./utils');
require('dotenv').config();

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const searchBook = async (query) => {
  // clearConsole();
  // console.clear();
  if (query) {
    const fiveBooksArr = await callGoogleBooksApi(query);
    // console.log(fiveBooksArr.forEach((book) => console.log('\n' + book.title)));

    // maybe abstract this into a prettier format function later
    const fiveBooksArrFormatted = fiveBooksArr.map((book) => {
      return `Title: ${book.title} | Authors: ${book.authors} | Publisher: ${book.publisher}`;
    });

    const addToList = await inquirer.prompt(
      {
        type: 'checkbox',
        name: 'add',
        message: `Do you want to add any of these to your reading list?`,
        async choices() {
          return displayBookChoices(fiveBooksArr);
        },
        // choices: fiveBooksArrFormatted,
      }

      // async () => chosenBooks(fiveBooksArr)
    );

    console.log(addToList);
  }
};

const callGoogleBooksApi = async (query) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: query,
        startIndex: 0,
        maxResults: 5,
      },
    });

    const responseArr = res.data.items;
    if (responseArr) {
      // return the book obj with title, authors, publisher
      const fiveBooksArr = responseArr.map((book) => book.volumeInfo);
      console.log(fiveBooksArr);
      return fiveBooksArr;
    }
    console.log(
      `\nSorry, your search results did not have any matches. \nWould you like to try again?\n`
    );
    return [];
    // console.log(fiveBooksArr.forEach((book) => console.log('\n' + book.title)));
  } catch (err) {
    console.log('An error has occurred: ', err);
    return [];
  }
};

const displayBookChoices = (results) => {
  const booksObjArr = results.map((book) => {
    const { title, authors, publisher } = book;
    return {
      name: `${title} | ${authors} | ${publisher}`,
      value: title,
      short: title,
    };
  });
  return booksObjArr;
};

module.exports = {
  searchBook,
  callGoogleBooksApi,
  displayBookChoices,
};
