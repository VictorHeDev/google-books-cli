const READLINE = require('readline');

const clearConsole = () => {
  READLINE.cursorTo(process.stdout, 0, 0);
  READLINE.clearLine(process.stdout, 0);
  READLINE.clearScreenDown(process.stdout);
};

module.exports = {
  clearConsole,
};
