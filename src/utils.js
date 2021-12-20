const READLINE = require('readline');
const chalk = require('chalk');

// can also use console.clear()
const clearConsole = () => {
  READLINE.cursorTo(process.stdout, 0, 0);
  READLINE.clearLine(process.stdout, 0);
  READLINE.clearScreenDown(process.stdout);
};

// VALIDATORS
const checkForValidTitle = (title) => {
  let code, i, len;

  for (i = 0, len = title.length; i < len; i++) {
    code = title.charCodeAt(i);
    // a lot of checks, but should still be faster than RegEx
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) && // lower alpha (a-z)
      !(code === 32) // code for spaceBar
    ) {
      return false;
    }
  }
  return true;
};

// FORMATTING
// ! not super DRY code, but I felt the need to separate these two formatting approaches
const formatSearchResults = (title, authors, publisher) => {
  let formattedBook = ``;
  let formattedTitle = titleColor(title);
  let formattedAuthors = authors.length
    ? authorsColor(authors)
    : authorsColor('N/A');
  let formattedPublisher = publisher
    ? publisherColor(publisher)
    : publisherColor('N/A');
  formattedBook = `${formattedTitle} by ${formattedAuthors} publisher ${formattedPublisher}`;
  return formattedBook;
};

const formatReadingList = (idx, title, authors, publisher) => {
  let formattedBook = ``;
  let formattedIdx = menuColor(idx);
  let formattedTitle = titleColor(title);
  let formattedAuthors = authors.length
    ? authorsColor(authors)
    : authorsColor('N/A');
  let formattedPublisher = publisher
    ? publisherColor(publisher)
    : publisherColor('N/A');
  formattedBook = `${formattedTitle} by ${formattedAuthors} publisher ${formattedPublisher}`;
  return `${formattedIdx}. ${formattedTitle} \n\tby ${formattedAuthors} \n\tpublished by ${formattedPublisher}`;
};

/* COLORS
  standard: black, red, green, yellow, blue, magenta, cyan, white, gray
  bright: blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
  background colors are preceded with bg
  other modifiers: bold, dim, italic, underline, strikethrough
*/
// TODO: should I break this up into a hash?
// TODO: should I make a different messages files?
const welcomeColor = chalk.bold.yellowBright;
const menuColor = chalk.bold.whiteBright;
const successColor = chalk.bold.keyword('lime');
const errorColor = chalk.bold.red;
const warningColor = chalk.redBright;
const readingListColor = chalk.whiteBright;
const titleColor = chalk.bold.magentaBright;
const authorsColor = chalk.cyanBright;
const publisherColor = chalk.blueBright;
const exitColor = chalk.gray;

module.exports = {
  clearConsole,
  checkForValidTitle,
  welcomeColor,
  menuColor,
  successColor,
  errorColor,
  warningColor,
  readingListColor,
  titleColor,
  authorsColor,
  publisherColor,
  exitColor,
  formatSearchResults,
  formatReadingList,
};
