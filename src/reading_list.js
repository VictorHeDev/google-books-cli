const { existsSync, readFileSync, writeFileSync } = require('fs');
const { formatReadingList, clearConsole, colors } = require('./utils');
const boxen = require('boxen');
const figlet = require('figlet');

const fileSrc = `${process.cwd()}/reading_list.json`;
// console.log(fileSrc);

const retrieveReadingListJSON = (file) => {
  if (existsSync(file)) {
    const rawData = readFileSync(file);
    return rawData.length ? JSON.parse(rawData) : [];
  }
  return [];
};

const addBooksToReadingList = (searchResults, chosenBooksTitles) => {
  const ogList = retrieveReadingListJSON(fileSrc);

  // * filter the searchResults to only include the chosen items
  const itemsToAppend = searchResults.filter((book) =>
    chosenBooksTitles.includes(book.title)
  );

  const newList = ogList.concat(itemsToAppend);

  // * save this to the JSON reading list
  const encodedData = JSON.stringify(newList, null, 2);
  writeFileSync(fileSrc, encodedData);
};

// !: say empty message if there are no books in reading list
const retrieveReadingList = () => {
  clearConsole();
  console.log(
    boxen(
      colors.welcomeColor(
        figlet.textSync(`Reading List`, {
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

  const readingListJSON = retrieveReadingListJSON(fileSrc);
  if (readingListJSON.length) {
    readingListJSON.forEach((book, idx) => {
      const { title, authors, publisher } = book;
      console.log(formatReadingList(idx, title, authors, publisher));
    });
  } else {
    console.log(
      colors.warningColor(
        `\nIt seems like your reading list is empty.\nTry adding some new books!\n`
      )
    );
  }
};

const resetReadingList = () => {
  if (existsSync(fileSrc)) {
    writeFileSync(fileSrc, '');
    console.log(
      colors.successColor(
        '\n🤖 Beep boop 🤖, your reading list has been reset\n'
      )
    );
  } else {
    console.log(
      colors.errorColor(
        `\nWe can't seem to find this file.\nPlease create a file named 'reading_list.json' in the root directory\n`
      )
    );
  }
};

module.exports = {
  addBooksToReadingList,
  retrieveReadingList,
  resetReadingList,
};
