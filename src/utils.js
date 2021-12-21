const READLINE = require('readline');
const chalk = require('chalk');

// can also use console.clear() but this can run differently on different machines!
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
  let formattedTitle = colors.titleColor(title);
  let formattedAuthors = authors.length
    ? colors.authorsColor(authors)
    : colors.authorsColor('N/A');
  let formattedPublisher = publisher
    ? colors.publisherColor(publisher)
    : colors.publisherColor('N/A');
  formattedBook = `${formattedTitle} by ${formattedAuthors} publisher ${formattedPublisher}`;
  return formattedBook;
};

const formatReadingList = (idx, title, authors, publisher) => {
  let formattedBook = ``;
  let formattedIdx = colors.menuColor(idx);
  let formattedTitle = colors.titleColor(title);
  let formattedAuthors = authors.length
    ? colors.authorsColor(authors)
    : colors.authorsColor('N/A');
  let formattedPublisher = publisher
    ? colors.publisherColor(publisher)
    : colors.publisherColor('N/A');
  formattedBook = `${formattedTitle} by ${formattedAuthors} publisher ${formattedPublisher}`;
  return `${formattedIdx}. ${formattedTitle} \n\tby ${formattedAuthors} \n\tpublished by ${formattedPublisher}`;
};

/* COLORS
  standard: black, red, green, yellow, blue, magenta, cyan, white, gray
  bright: blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
  background colors are preceded with bg
  other modifiers: bold, dim, italic, underline, strikethrough
*/
// TODO: should I make a different messages files?
export const colors = {
  welcomeColor: chalk.bold.yellowBright,
  menuColor: chalk.bold.whiteBright,
  successColor: chalk.bold.keyword('lime'),
  errorColor: chalk.bold.red,
  warningColor: chalk.redBright,
  readingListColor: chalk.whiteBright,
  titleColor: chalk.bold.magentaBright,
  authorsColor: chalk.cyanBright,
  publisherColor: chalk.blueBright,
  exitColor: chalk.gray,
};

module.exports = {
  clearConsole,
  checkForValidTitle,
  colors,
  formatSearchResults,
  formatReadingList,
};
