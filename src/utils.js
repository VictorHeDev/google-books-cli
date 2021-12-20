const READLINE = require('readline');
const chalk = require('chalk');

// can also use console.clear()
const clearConsole = () => {
  READLINE.cursorTo(process.stdout, 0, 0);
  READLINE.clearLine(process.stdout, 0);
  READLINE.clearScreenDown(process.stdout);
};

// formatting string outputs

/* COLORS
  standard: black, red, green, yellow, blue, magenta, cyan, white, gray
  bright: blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright
  background colors are preceded with bg
  other modifiers: bold, dim, italic, underline, strikethrough
*/
// should I break this up into a hash?
const welcomeColor = chalk.bold.yellowBright;
const menuColor = chalk.bold.whiteBright;
const successColor = chalk.bold.keyword('lime');
const errorColor = chalk.bold.red;
const warningColor = chalk.redBright;
const readingListColor = chalk.whiteBright;
const titleColor = chalk.bold.cyanBright;
const authorsColor = chalk.magentaBright;
const publisherColor = chalk.blueBright;
const exitColor = chalk.gray;

// VALIDATORS
const checkValidQuery = query => {
  
}

module.exports = {
  clearConsole,
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
};
