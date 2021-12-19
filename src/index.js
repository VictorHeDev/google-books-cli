require('dotenv').config();
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const prompt = require('prompt');
const { clearConsole } = require('./utils');

console.log('WELCOME TO THE GOOGLE-BOOKS-CLI!');
console.log('Please follow the appropriate prompts below ...');

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
    const mainMenuAnswer = await inquirer.prompt(mainMenu);
    console.log('You chose: ' + mainMenuAnswer.action);

    const { action, query } = mainMenuAnswer;

    switch (action) {
      case 'search':
        console.log(query);

        break;

      default:
        break;
    }
  } catch (err) {
    throw new Error(err);
  }
};

mainLoop();

const searchBook = () => {
  inquirer
    .prompt([
      {
        name: 'search_book',
        type: 'input',
        message: 'What title would you like to search for?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is your last name?',
      },
    ])
    .then((res) =>
      console.log(`You would like to search for: ${res.search_book}!`)
    );
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
