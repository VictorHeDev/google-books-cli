const READLINE = require('readline');

// can also use console.clear()
const clearConsole = () => {
  READLINE.cursorTo(process.stdout, 0, 0);
  READLINE.clearLine(process.stdout, 0);
  READLINE.clearScreenDown(process.stdout);
};

// formatting string outputs

module.exports = {
  clearConsole,
};
