require('dotenv').config();
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const prompt = require('prompt');
const { clearConsole } = require('./utils');
const axios = require('axios');

const greetByName = () => {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is your first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is your last name?',
      },
    ])
    .then((res) => console.log(`Hey, ${res.first_name} ${res.last_name}!`));
};

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
  console.log('WELCOME TO THE GOOGLE-BOOKS-CLI!');
  console.log('Please follow the appropriate prompts below ...');

  try {
    let userWantsToExit = false;
    while (!userWantsToExit) {
      const mainMenuAnswer = await inquirer.prompt(mainMenu);
      console.log('You chose to: ' + mainMenuAnswer.action);

      const { action, query } = mainMenuAnswer;

      switch (action) {
        case 'search':
          // console.log(query);
          searchBook(query);
          break;
        case 'list':
          console.log('You want the list');
          break;

        case 'exit':
          console.log('Thanks for checking in. See you again soon!');
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
  if (query) {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        startIndex: 0,
        maxResults: 5,
      },
    });

    const fiveBooksArr = res.data.items;
    console.log(
      fiveBooksArr.forEach((book) => console.log('\n' + book.volumeInfo.title))
    );
  }
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
