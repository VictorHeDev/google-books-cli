const inquirer = require('inquirer');
const {
  clearConsole,
  welcomeColor,
  warningColor,
  errorColor,
  exitColor,
  colors,
} = require('./utils');
const { queryForBooks } = require('./books');
const { retrieveReadingList, resetReadingList } = require('./reading_list');
const figlet = require('figlet');
const chalk = require('chalk');
const boxen = require('boxen');

// import inquirer from 'inquirer';
// import { clearConsole, welcomeColor } from './utils';
// import { queryForBooks } from './books';
// import { retrieveReadingList, resetReadingList } from './reading_list';
// import figlet from 'figlet';
// import chalk from 'chalk';
// import boxen from 'boxen';

// main menu options highlight gets overridden by chalk. Left defaults.
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
    message: welcomeColor('What title would you like to search for?'),
    when(answer) {
      return answer.action === 'search';
    },
  },
  {
    type: 'confirm',
    name: 'confirmClear',
    message: warningColor('Are you sure you want to clear your reading list?'),
    when(answer) {
      return answer.action === 'clear';
    },
  },
];

const mainLoop = async () => {
  clearConsole();
  // console.clear();

  console.log(
    boxen(
      welcomeColor(
        figlet.textSync(`Welcome to Wood's Library`, {
          font: 'small slant',
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
            exitColor('\nThanks for checking in. \nSee you again soon!')
          );
          userWantsToExit = true;
          break;
        default:
          console.log(warningColor('Please choose a valid choice!'));
          break;
      }
    }
  } catch (err) {
    console.log(errorColor(`The error is: ${err}`));
  }
};

module.exports = { mainLoop };
