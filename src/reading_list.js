const { existsSync, readFileSync, writeFileSync } = require('fs');

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

  // filter the searchResults to only include the chosen items
  const itemsToAppend = searchResults.filter((book) =>
    chosenBooksTitles.includes(book.title)
  );

  const newList = ogList.concat(itemsToAppend);

  // save this to the JSON reading list
  const encodedData = JSON.stringify(newList, null, 2);
  writeFileSync(fileSrc, encodedData);
};

// !: say empty message if there are no books in reading list
const retrieveReadingList = () => {
  const readingListJSON = retrieveReadingListJSON(fileSrc);
  if (readingListJSON.length) {
    readingListJSON.forEach((book, idx) => {
      console.log(
        `${idx + 1}. ${book.title} | ${book.authors} | ${book.publisher}`
      );
    });
  } else {
    console.log(
      `\nIt seems like your reading list is empty.\nTry adding some new books!\n`
    );
  }
};

const resetReadingList = () => {
  if (existsSync(fileSrc)) {
    writeFileSync(fileSrc, '');
    console.log('\nBeep boop, your reading list has been reset\n');
  } else {
    console.log(
      `\nWe can't seem to find this file.\nPlease create a file named 'reading_list.json' in the root directory\n`
    );
  }
};

module.exports = {
  addBooksToReadingList,
  retrieveReadingList,
  resetReadingList,
};

// resetReadingList();
