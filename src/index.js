require('dotenv').config();
const fetch = require('node-fetch');
const prompt = require('prompt');

prompt.start();

prompt.get(['title'], async (err, result) => {
  console.log('CLI input received: ');
  console.log('title:' + result.title);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${result.title}&key=${process.env.API_KEY}`
  );

  const books = await response.json();
  const items = books.items;

  for (let i = 0; i < 5; i++) {
    const book = {
      title: items[i].volumeInfo.title,
      author: items[i].volumeInfo.authors,
      publishers: items[i].volumeInfo.publisher,
    };
    console.log(book);
  }

  // console.log(items);
});
