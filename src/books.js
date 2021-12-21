const axios = require('axios');
const inquirer = require('inquirer');
const {
  clearConsole,
  checkForValidTitle,
  menuColor,
  warningColor,
  errorColor,
  titleColor,
  authorsColor,
  publisherColor,
  formatSearchResults,
} = require('./utils');
require('dotenv').config();
const { addBooksToReadingList } = require('./reading_list');

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const queryForBooks = async (query) => {
  // clearConsole();
  // console.clear();
  if (query && checkForValidTitle(query)) {
    const searchResultsArr = await callGoogleBooksApi(query);

    const addToList = await inquirer.prompt({
      type: 'checkbox',
      name: 'add',
      message: menuColor(
        `Do you want to add any of these to your reading list?`
      ),
      async choices() {
        return displaySearchResults(searchResultsArr);
      },
    });

    if (addToList.add) {
      addBooksToReadingList(searchResultsArr, addToList.add);
    } else {
      console.log(menuColor(`\nYou chose to not add any books this time.\n`));
    }
  } else {
    console.log(
      errorColor(
        warningColor`\nPlease search with AlphaNumeric and spaces.\nIt looks like your search did not yield any results!\n`
      )
    );
  }
};

const callGoogleBooksApi = async (query) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: query,
        startIndex: 0,
        maxResults: 5,
        printType: 'books',
        orderBy: 'relevance',
      },
    });

    const responseArr = res.data.items;
    if (responseArr) {
      // return the book obj with title, authors, publisher
      const searchResultsArr = responseArr.map((book) => book.volumeInfo);
      return searchResultsArr;
    }
    console.log(
      warningColor(
        `\nSorry, your search results did not have any matches. \nWould you like to try again?\n`
      )
    );
    return [];
  } catch (err) {
    console.log(errorColor('An error has occurred: '), err);
    return [];
  }
};

// change name to displaySearchResults
const displaySearchResults = (results) => {
  const booksObjArr = results.map((book) => {
    const { title, authors, publisher } = book;
    return {
      name: formatSearchResults(title, authors, publisher),
      value: title,
      short: title,
    };
  });
  return booksObjArr;
};

module.exports = {
  queryForBooks,
  callGoogleBooksApi,
  displaySearchResults,
};
