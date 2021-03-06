const inquirer = require('inquirer');
const { clearConsole, colors } = require('./utils');
const { queryForBooks } = require('./books');
const { retrieveReadingList, resetReadingList } = require('./reading_list');
const figlet = require('figlet');
const boxen = require('boxen');

const mainMenu = [
  {
    type: 'list',
    name: 'action',
    message: colors.welcomeColor(
      `Hello there, what would you like to do today?\n`
    ),
    choices: [
      { name: 'Search for a book by title', value: 'search' },
      { name: 'Check out my reading list', value: 'list' },
      { name: 'Clear reading list', value: 'clear' },
      { name: 'Exit this program', value: 'exit' },
    ],
  },
  {
    type: 'input',
    name: 'query',
    message: colors.welcomeColor('What title would you like to search for?'),
    when(answer) {
      return answer.action === 'search';
    },
  },
  {
    type: 'confirm',
    name: 'confirmClear',
    message: colors.warningColor(
      'Are you sure you want to clear your reading list?'
    ),
    when(answer) {
      return answer.action === 'clear';
    },
  },
];

const runMainLoop = async () => {
  let userWantsToExit = false;
  while (!userWantsToExit) {
    const mainMenuAnswer = await inquirer.prompt(mainMenu);
    const { action, query, confirmClear } = mainMenuAnswer;

    switch (action) {
      case 'search':
        await queryForBooks(query);
        break;
      case 'list':
        retrieveReadingList();
        break;
      case 'clear':
        if (confirmClear) {
          resetReadingList();
        }
        break;
      case 'exit':
        console.log(
          colors.exitColor('\nThanks for checking in. \nSee you again soon!')
        );
        userWantsToExit = true;
        break;
      default:
        console.log(colors.warningColor('Please choose a valid choice!'));
        break;
    }
  }
};

const kickoffMainLoop = () => {
  clearConsole();

  console.log(
    boxen(
      colors.welcomeColor(
        figlet.textSync(`Welcome to Wood's Library`, {
          font: 'Small Slant',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true,
        })
      ),
      { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'white' }
    )
  );

  try {
    runMainLoop();
  } catch (err) {
    console.log(colors.errorColor(`The error is: ${err}`));
  }
};

module.exports = { kickoffMainLoop, runMainLoop };
