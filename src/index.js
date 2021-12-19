const inquirer = require('inquirer');
const { clearConsole } = require('./utils');
const { searchBook } = require('./books');
const { retrieveReadingList } = require('./reading_list');

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
          // console.log('You want the list');
          retrieveReadingList();
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

module.exports = { mainLoop };
