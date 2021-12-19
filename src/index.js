require('dotenv').config();
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const prompt = require('prompt');
const { clearConsole } = require('./utils');
const axios = require('axios');

const mainMenu = [
  {
    type: 'list',
    name: 'action',
    message: 'Hello there, what would you like to do today?',
    choices: [
      { name: 'Search for a book by title', value: 'search' },
      { name: 'Check out my reading list', value: 'list' },
      { name: 'Exit this program', value: 'exit' },
    ],
  },
  {
    type: 'input',
    name: 'query',
    message: 'What title would you like to search for?',
    when(answer) {
      return answer.action === 'search';
    },
  },
];

const mainLoop = async () => {
  clearConsole();
  // console.clear();
  console.log('WELCOME TO THE GOOGLE-BOOKS-CLI!\n');
  // console.log('Please follow the appropriate prompts below ...');

  try {
    let userWantsToExit = false;
    while (!userWantsToExit) {
      const mainMenuAnswer = await inquirer.prompt(mainMenu);
      // console.log('You chose to: ' + mainMenuAnswer.action);

      const { action, query } = mainMenuAnswer;

      switch (action) {
        case 'search':
          await searchBook(query);
          break;
        case 'list':
          console.log('You want the list');
          break;
        case 'exit':
          console.log('Thanks for checking in. \nSee you again soon!');
          userWantsToExit = true;
          break;
        default:
          console.log('Please choose a valid choice!');
          break;
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

mainLoop();

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
  const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
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
    return fiveBooksArr;
  }
  // console.log(fiveBooksArr.forEach((book) => console.log('\n' + book.title)));
  console.log(
    `\nSorry, your search results did not have any matches. \nWould you like to try again?\n`
  );
  return [];
};

const displayBookChoices = (results) => {
  const booksObjArr = results.map((book) => {
    const { title, authors, publisher } = book;
    return {
      name: `${title} | ${authors} | ${publisher}`,
      
    };
  });
  return booksObjArr;
};

// prompt.start();

// prompt.get(['title'], async (err, result) => {
//   console.log('CLI input received: ');
//   console.log('title:' + result.title);

//   const response = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${result.title}&key=${process.env.API_KEY}`
//   );

//   const books = await response.json();
//   const items = books.items;

//   for (let i = 0; i < 5; i++) {
//     const book = {
//       title: items[i].volumeInfo.title,
//       author: items[i].volumeInfo.authors,
//       publishers: items[i].volumeInfo.publisher,
//     };
//     console.log(book);
//   }

//   // console.log(items);
// });

// const welcomeMessage = () => {
//   console.log('WHAT IS YOUR NAME?');
//   prompt.get(['name'], (err, result) => {
//     console.log('Greetings:' + result.name);
//   });
// };

// welcomeMessage();
// searchForTitles();
